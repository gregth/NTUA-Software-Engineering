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
    
    validate_post_request(req, res) {
        let rules = this.model.rules.insert
        let required_params = filter_keys(req.body, rules.required_fields);
        if (Object.keys(required_params).length != rules.required_fields.length) {
            console.log("[POST_VALIDATOR]: Not all required post params provided")

            return {
                succesfull: false,
                error: 'Not all required post params provided'
            }
        }

        let validated_params = required_params
        let optional_params = filter_keys(req.body, rules.optional_fields);
        for (var k in optional_params)  {
           validated_params[k]  = optional_params[k]
        }

        return {
            succesfull: true,
            validated_params: validated_params
        }
    }

    list(req, res) {
        res.status(501).json({status: 400, message: 'Method Not Implemented'})
    }

    read(req, res, id) {
        res.status(501).json({status: 400, message: 'Method Not Implemented'})
    }

    create(req, res) {
        res.status(501).json({status: 400, message: 'Method Not Implemented'})
    }

    put(req, res, id) {
        res.status(501).json({status: 400, message: 'Method Not Implemented'})
    }

    patch(req, res, id) {
        res.status(501).json({status: 400, message: 'Method Not Implemented'})
    }

    delete(req, res, id) {
        res.status(501).json({status: 400, message: 'Method Not Implemented'})
    }
}
