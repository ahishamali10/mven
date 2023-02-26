import express from 'express'
const router = express.Router()

// const authJwt = require('../middlewares/user/authJwt')
import * as controller from '../controllers/employee.js'

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

// you can test your token with these URLs for authorization
router.get('/', controller.index)
router.post('/', controller.store)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

export default router
