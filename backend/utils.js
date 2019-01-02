const express = require('express')
const { MalformedInput } = require('./errors')

const createControllerRoutes = controller => {
    const router = express.Router()
    async function endpointHandler(method, res) {
        try {
            const results = await method

            if (typeof results === 'object') {
                res.setHeader('Content-Type', 'application/json');
                res.json(results)
            } else if (typeof results === 'boolean') {
                if (results) {
                    res.status(204).send()
                } else {
                    res.status(400).send()
                }
            }
        } catch(err) {
            console.log(err)

            if (err instanceof MalformedInput) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).send()
            }
        }
    }

    router.get('/', (req, res) => endpointHandler(controller.list(), res))
    router.get('/:id', (req, res) => endpointHandler(controller.read(req.params.id), res))
    router.post('/', (req, res) => endpointHandler(controller.create(req.body), res))
    router.put('/:id', (req, res) => endpointHandler(controller.put(req.params.id), res))
    router.patch('/:id', (req, res) => endpointHandler(controller.patch(req.body, req.params.id), res))
    router.delete('/:id', (req, res) => endpointHandler(controller.delete(req.params.id), res))

    return router
}

const createSimpleRouter = (key, dbConnection) => {
    const ControllerClass = require(`./controllers/${key}`)
    const controller = new ControllerClass(dbConnection)

    return createControllerRoutes(controller)
}

module.exports = {
    createControllerRoutes,
    createSimpleRouter
}
