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
            }
        } else {
            fieldValues.push(fields[key])
        }
    }

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

    async list(conditions, orderBy, limit, joins) {
        let substitutions = [];
        let query = `SELECT ${this.rules.select.selectable_fields.join(', ')} FROM ${this.table}`;

        if (joins) {
            joins.forEach(join => {
                query += ` ${join.type} ${join.table} ON ${join.on} `;
            });
        }
        if (conditions && Object.keys(conditions).length != 0){
            for (const condition in conditions) {
                if (!this.rules.select.allowed_query_keys.includes(condition)) {
                    throw new Error(`Not allowed to query ${condition}`)
                }
            }

            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ");
            substitutions.push(...conditionValues);
        }

        if (orderBy && orderBy.length != 0){
            let order_properties = [];
            orderBy.forEach( order_field => {
                order_properties.push(`${order_field.field_name}  ${order_field.order}`);
            });
            query += ` ORDER BY ` + order_properties.join(", ");
        }

        if (limit) {
            query += ` LIMIT ${parseInt(limit, 10)}`
        }

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

    async delete(conditions) {
        let query = `DELETE FROM  ${this.table}`;
        let substitutions = [];
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ") + ` LIMIT 1`;
            substitutions.push(...conditionValues);
        }

        debug(query);
        let [result] = await this.db.execute(query, substitutions);
        return result;
    }
}
