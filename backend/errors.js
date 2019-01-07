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

class NotFound extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFound'
    }
}

module.exports = {
    MalformedInput,
    NotImplemented
}
