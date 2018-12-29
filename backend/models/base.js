module.exports = class BaseModel {
    constructor(table, connection) {
        this.db = connection
        this.table = table
    }

    async execute(query) {
        return await this.db.execute(query)
    }
}

