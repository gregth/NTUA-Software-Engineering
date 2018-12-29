module.exports = class BaseModel {
    constructor(table, dbConnection) {
        this.db = dbConnection
        this.table = table
    }

    async execute(query) {
        return await this.db.execute(query)
    }
}

