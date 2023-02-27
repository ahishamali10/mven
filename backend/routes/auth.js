import express from 'express'
const router = express.Router()
import * as authJwt from '../middlewares/authJwt.js'

import * as controller from '../controllers/auth.js'

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

router.post('/check', [authJwt.verifyToken],controller.check)
router.post('/login', controller.login)
router.post('/register', controller.register)

export default router
