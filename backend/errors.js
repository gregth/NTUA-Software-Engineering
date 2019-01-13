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

class NotAllowed extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotAllowed'
    }
}

class Unauthorized extends Error {
    constructor(message) {
        super(message)
        this.name = 'Unauthorized'
    }
}

module.exports = {
    MalformedInput,
    NotImplemented,
    NotFound,
    NotAllowed,
    Unauthorized
}
