module.exports = class BaseController {
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
