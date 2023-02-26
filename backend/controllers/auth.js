import {PrismaClient} from "@prisma/client";
import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const login = async (req, res) => {
    try {
        const user = await prisma.users.findFirstOrThrow({
            where: {email: req.body.email, password: req.body.password}
        })

        // authentication process
        let expiresIn = 86400 // 24 hours
        if (req.body.remember === true) {
            expiresIn *= 100 // it will be 100 days
        }
        const token = jwt.sign({id: user.id}, process.env.AUTH_SECRET, {
            expiresIn
        })

        await prisma.users.update({
            where: {id: user.id},
            data: {
                last_login: new Date(),
                remember_token: token
            }
        })

        return res.status(200).send({message: 'successfully logged in', token: token})
    } catch (e) {
        logger.error('error fetching data, db-err message: ' + e.message)
        return res.status(500).send({message: 'error fetching data', status: '500'})
    }
}
export const register = async (req, res) => {
    try {
        const user = await prisma.users.create({
            data: {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
            }
        })
        // send email
        return res.status(200).send({message: 'user successfully registered', status: '200'})
    } catch (e) {
        logger.error('there was a problem in creating model, db-err message: ' + e.message)
        return res.status(400).send({message: 'there was a problem in creating model', status: '400'})
    }
}