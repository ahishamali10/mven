import express from 'express'
import employee from './employee.js'
import auth from "./auth.js";
const router = express.Router()

router.use('/employees', employee)
router.use('/auth', auth)

export default router
