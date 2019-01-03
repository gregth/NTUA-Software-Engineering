class MalformedInput extends Error {
    constructor(message) {
        super(message)
        this.name = 'MalformedInput'
    }
}

class NotImplemented extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotImplemented'
    }
}

module.exports = {
    MalformedInput,
    NotImplemented
}
