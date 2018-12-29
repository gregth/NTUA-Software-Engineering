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

    async insert (values) {
        let [placeholders, fieldValues] = objectToQueryFields(values);
        let query = `INSERT INTO ${this.table} SET ` + placeholders.join(', ');
        let result = await this.db.execute(query, fieldValues);

        return result;
    }
}

