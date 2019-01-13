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

module.exports = {
    MalformedInput,
    NotImplemented,
    NotFound,
    NotAllowed
}
