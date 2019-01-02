const { MalformedInput } = require('../errors')

function filter_keys(params, allowed_keys) {
    let filtered_params = {};
    allowed_keys.forEach(key => {
        if (typeof params[key] != 'undefined') {
            filtered_params[key] = params[key];
        }
    });
    return filtered_params;
}

module.exports = class BaseController {
    constructor(model) {
        this.model = model
    }
    
    validate_post_params(params) {
        let rules = this.model.rules.insert
        let required_params = filter_keys(params, rules.required_fields);
        if (Object.keys(required_params).length != rules.required_fields.length) {
            console.log("[POST_VALIDATOR]: Not all required post params provided")
            throw new MalformedInput('Not all required post params provided')
        }

        let validated_params = required_params
        let optional_params = filter_keys(params, rules.optional_fields);
        for (var k in optional_params)  {
           validated_params[k]  = optional_params[k]
        }

        return validated_params
    }

    validate_put_params(params) {
        let rules = this.model.rules.update
        console.log(rules)
        let required_params = filter_keys(params, rules.updatable_fields);
        console.log(required_params	)
        // For a put request to take place, all updateable fields must be passed
        if (Object.keys(required_params).length != rules.updatable_fields.length) {
            console.log("[PUT_VALIDATOR]: Not all required post params provided")
            throw new MalformedInput('Not all required post params provided')
        }

        return required_params
    }

    validate_patch_params(params) {
        let rules = this.model.rules.update
        let required_params = filter_keys(params, rules.updatable_fields);
        // For a put request to take place, all updateable fields must be passed
        if (Object.keys(required_params).length == 0) {
            console.log('[PATCH_VALIDATOR]: No updatable attributes provided in params')
            throw new MalformedInput('No updatable attributes provided in params')
        }

        return required_params
    }

    list(req, res) {
        res.status(501).json({error: 'Method Not Implemented'})
    }

    read(req, res, id) {
        res.status(501).json({error: 'Method Not Implemented'})
    }

    create(req, res) {
        res.status(501).json({error: 'Method Not Implemented'})
    }

    put(req, res, id) {
        res.status(501).json({error: 'Method Not Implemented'})
    }

    patch(req, res, id) {
        res.status(501).json({error: 'Method Not Implemented'})
    }

    delete(req, res, id) {
        res.status(501).json({error: 'Method Not Implemented'})
    }
}
