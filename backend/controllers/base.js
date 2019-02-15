const { MalformedInput, NotImplemented, NotFound } = require('../errors')

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
    constructor(resource, model) {
        this.resource = resource
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
        let required_params = filter_keys(params, rules.updatable_fields);
        // For a put request to take place, all updateable fields must be passed
        if (Object.keys(required_params).length != rules.updatable_fields.length) {
            console.log("[PUT_VALIDATOR]: Not all required put params provided")
            throw new MalformedInput('Not all required put params provided')
        }

        return required_params
    }

    validate_patch_params(params) {
        let rules = this.model.rules.update
        let required_params = filter_keys(params, rules.updatable_fields);
        // For a patch request to take place, some updateable fields must be passed
        if (Object.keys(required_params).length == 0) {
            console.log('[PATCH_VALIDATOR]: No updatable attributes provided in params')
            throw new MalformedInput('No updatable attributes provided in params')
        }

        return required_params
    }

    async list(conditions={}, order=[], start=0, count=20) {

        const list = await this.model.list(conditions, order)
        const response = {
            start,
            count,
            total: list.length,
        }
        response[this.resource] = list.slice(start, start + count).map(this.formatResponse)

        return response
    }

    async read(id) {
        const items = await this.model.list({id})
        if (items.length === 0) {
            throw new NotFound()
        }

        return this.formatResponse(items[0])
    }

    async create(params) {
        let item = this.validate_post_params(params)

        const result = await this.model.insert(item)
        if (result.insertId) {
            // TODO: possible race condition
            return this.read(result.insertId)
        }

        throw new Error(`Did not create ${this.resource}: ${JSON.stringify(params)}`)
    }

    async put(params, id) {
        let item_details = this.validate_put_params(params)

        const result = await this.model.update(item_details, {id})
        if (result.affectedRows > 0) {
            return this.read(id)
        }

        throw new NotFound(`Did not update ${this.resource} ${id}: ${params}`)
    }

    async patch(params, id) {
        let item_details = this.validate_patch_params(params)

        const result = await this.model.update(item_details, {id})
        if (result.affectedRows > 0) {
            return this.read(id)
        }

        throw new NotFound(`Did not update ${this.resource} ${id}: ${params}`)
    }

    async delete(id) {
        let role = 'admin', result
        if (role == 'admin') {
            result = await this.model.delete({id})
        } else {
            result = await this.model.update({'withdrawn': true}, {id})
        }

        if (result.affectedRows > 0) {
            return {message: 'OK'}
        }

        throw new NotFound(`Did not delete product ${id}`)
    }
}
