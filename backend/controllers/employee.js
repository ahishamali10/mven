import {PrismaClient} from "@prisma/client";
import logger from "../utils/logger.js";

const prisma = new PrismaClient()

export const index = async (req, res) => {
    try {
        const employees = await prisma.employees.findMany({
            include: {
                details: true
            }
        })
        return res.status(200).send(employees)
    } catch (e) {
        logger.error('error fetching data, db-err message: ' + e.message)
        return res.status(500).send({message: 'error fetching data', status: '500'})
    }
}
export const store = async (req, res) => {
    try {
        const employee = await prisma.employees.create({
            data: {
                name: req.body.name,
                level: parseInt(req.body.level),
                department: req.body.department,
                details: {
                    create: {
                        address: req.body.address,
                        mobile: req.body.mobile,
                    }
                },
            }
        })
        return res.status(201).send({id: employee.id, message: 'employee successfully created', status: '201'})
    } catch (e) {
        logger.error('there was a problem in creating model, db-err message: ' + e.message)
        return res.status(400).send({message: 'there was a problem in creating model', status: '400'})
    }
}
export const update = async (req, res) => {
    try {
        const employee = await prisma.employees.update({
            where: {id: parseInt(req.params.id)},
            data: {
                name: req.body.name,
                level: parseInt(req.body.level),
                department: req.body.department,
                details: {
                    update: {
                        address: req.body.address,
                        mobile: req.body.mobile,
                    }
                },
            }
        })
        return res.status(200).send({message: 'employee successfully updated', status: '200'})
    } catch (e) {
        logger.error('this object does not exit, db-err message: ' + e.message)
        return res.status(400).send({message: 'this object does not exit', status: '400'})
    }
}
export const destroy = async (req, res) => {
    try {
        const employee = await prisma.employees.delete({
            where: {id: parseInt(req.params.id)}
        })
        return res.status(202).send({message: 'employee successfully deleted', status: '202'})
    } catch (e) {
        logger.error('this object does not exit, db-err message: ' + e.message)
        return res.status(400).send({message: 'this object does not exit', status: '400'})
    }
}