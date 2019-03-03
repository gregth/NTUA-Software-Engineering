const debug = require('debug')('backend:base-model')

function objectToQueryFields(fields) {
    let keys = Object.keys(fields);
    let placeholders = keys.map((key) => {
        if (fields[key] instanceof Array) {
            // WHERE .. IN (...) clause
            return key + ' IN (' + fields[key].map(_ => '?').join(',') + ')'
        } else if (fields[key] instanceof Object) {
            if (fields[key].type === 'LIKE') {
                return key + ' LIKE ?'
            }
            // This is ugly, shit!
            if (fields[key].type === 'TAGS') {
                return '(product_tags.tag ' + ' IN (' + fields[key].tags.map(_ => '?').join(',') + ')' +
                    ' OR shop_tags.tag ' + ' IN (' + fields[key].tags.map(_ => '?').join(',') + ')) '
            }
            if (fields[key].type === 'BETWEEN_DATE') {
                str = key + ' BETWEEN CAST(\'' + fields[key].lower + '\' AS DATE)' +
                    ' AND CAST(\'' + fields[key].upper + '\' AS DATE) '
                return str
            }
            if (fields[key].operator) {
                return `${key} ${fields[key].operator} ?`
            }

            throw new Error(`Invalid condition: ${JSON.stringify(fields[key])}`)
        }
        return key + ' = ? ';
    });

    let fieldValues = []
    for (const key in fields) {
        if (fields[key] instanceof Array) {
            fieldValues.push(...fields[key])
        } else if (fields[key] instanceof Object) {
            if (fields[key].type === 'LIKE') {
                fieldValues.push(`%${fields[key].value}%`)
            } else if (fields[key].operator) {
                fieldValues.push(fields[key].value)
            } else if (fields[key].type === 'TAGS') {
                fieldValues.push(...fields[key].tags)
                fieldValues.push(...fields[key].tags)
            }
        } else {
            fieldValues.push(fields[key])
        }
    }

    debug(fieldValues)
    return [placeholders, fieldValues]
}

module.exports = class BaseModel {
    constructor(table, dbConnection) {
        this.db = dbConnection
        this.table = table
    }

    async insert(values) {
        let [placeholders, fieldValues] = objectToQueryFields(values);
        let query = `INSERT INTO ${this.table} SET ` + placeholders.join(', ');
        let [result] = await this.db.execute(query, fieldValues);

        return result;
    }

    async update(values, conditions) {
        let [placeholders, fieldValues] = objectToQueryFields(values);
        let substitutions = fieldValues;
        let query = `UPDATE ${this.table} SET ` + placeholders.join(', ');
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
            substitutions.push(...conditionValues);    
        }

        debug(query);
        let [result] = await this.db.execute(query, substitutions);
        return result
    }

    async list(conditions, orderBy, having, limit) {
        let substitutions = [];


        let query = 'SELECT ' 
        if (conditions.distinct) {
            query += ' DISTINCT '
            delete conditions.distinct
            // Ungly shit
        }
        if (having && having.type == 'DISTANCE') {
            query += `111.111 * DEGREES(ACOS(LEAST(COS(RADIANS(lat))` 
            + `* COS(RADIANS(?)) * COS(RADIANS(lng - ?))`
            +` + SIN(RADIANS(lat)) * SIN(RADIANS(?)), 1.0))) AS distance, `
            substitutions.push(...[`${having.lat}`, `${having.lng}`, `${having.lat}`])
        }
        query += `${this.rules.select.selectable_fields.join(', ')} FROM ${this.table}`;

        let joins = this.rules.select.joins;
        if (joins) {
            joins.forEach(join => {
                query += ` ${join.type} ${join.table} ON ${join.on} `;
            });
        }
        if (conditions && Object.keys(conditions).length != 0){
            let mappings = this.rules.select.ambiguous_fields_mappings
            for (const condition in conditions) {
                if (!this.rules.select.allowed_query_keys.includes(condition)) {
                    throw new Error(`Not allowed to query ${condition}`)
                }
                if (mappings && mappings[condition]) {
                    conditions[mappings[condition]] = conditions[condition]
                    delete conditions[condition]
                }
            }

            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
            substitutions.push(...conditionValues);
        }

        if (having && having.type == 'DISTANCE') {
            query += ' HAVING distance < ? '
            console.log(having.radius)
            substitutions.push(`${having.radius}`);
        }

        if (orderBy && orderBy.length != 0){
            let order_properties = [];
            let mappings = this.rules.select.ambiguous_fields_mappings
            orderBy.forEach( order_field => {
                if (mappings && mappings[order_field.field_name]) {
                    order_properties.push(`${mappings[order_field.field_name]}  ${order_field.order}`);
                } else {
                    order_properties.push(`${order_field.field_name}  ${order_field.order}`);
                }
            });
            query += ` ORDER BY ` + order_properties.join(", ");
        }

        if (limit) {
            query += ` LIMIT ${parseInt(limit, 10)}`
        }

        console.log(query)
        debug(query);
        let rows;
        if (substitutions.length == 0) {
            [rows] = await this.db.execute(query);
        }
        else {
            [rows] = await this.db.execute(query, substitutions);
        }

        return rows;
    }

    async delete(conditions, limitone = true) {
        let query = `DELETE FROM  ${this.table}`;
        let substitutions = [];
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
            if (limitone) {
                query += ' LIMIT 1'
            }
            substitutions.push(...conditionValues);
        }

        debug(query);
        let [result] = await this.db.execute(query, substitutions);
        return result;
    }
}
