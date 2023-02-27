import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken'

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept')
  next()
})

export const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(401).send({message: 'unauthorized',status: '401'})
  }

  jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({message: 'unauthorized',status: '401'})
    }
    req.userId = decoded.id
    next()
  })
}