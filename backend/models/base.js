function objectToQueryFields(fields) {
    let keys = Object.keys(fields);
    let placeholders = keys.map((key) => {
        return key + ' = ? ';
    });
    let fieldValues = keys.map((key) => fields[key]);

    return [placeholders, fieldValues]
}

module.exports = class BaseModel {
    constructor(table, dbConnection) {
        this.db = dbConnection
        this.table = table
    }

    async execute(query) {
        return await this.db.execute(query)
    }

    async insert(values) {
        let [placeholders, fieldValues] = objectToQueryFields(values);
        let query = `INSERT INTO ${this.table} SET ` + placeholders.join(', ');
        let result = await this.db.execute(query, fieldValues);

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

        console.log(query);
        let [result] = await this.db.execute(query, substitutions);
        return result
    }

    async select(fields, conditions, orderBy, joins) {
        let result;
        let substitutions = [];
        let query = `SELECT `;
        if (fields && Object.keys(fields).length != 0) {
            query += fields.join(", ");
        }
        else {
            query += ` *`;
        }
        query += ` FROM ${this.table}`;
        if (joins) {
            joins.forEach(join => {
                query += ` ${join.type} ${join.table} ON ${join.on} `;
            });
        }
        if (conditions && Object.keys(conditions).length != 0){
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

        console.log(query);
        if (substitutions.length == 0) {
            result = await this.db.execute(query);
        }
        else {
            result = await this.db.execute(query, substitutions);
        }

        return result;
    }

    async delete(conditions) {
        let query = `DELETE FROM  ${this.table}`;
        let substitutions = [];
        if (conditions && Object.keys(conditions).length != 0){
            let [conditionPlaceholders, conditionValues] = objectToQueryFields(conditions);
            query += ` WHERE ` + conditionPlaceholders.join(" AND ") + ` LIMIT 1`;
            substitutions.push(...conditionValues);
        }

        console.log(query);
        let [result] = await this.db.execute(query, substitutions);
        return result;
    }
}
