import db from '../models'
import { Op } from 'sequelize'
import { generateId } from '../utils/helpers.js'
const cloudinary = require('cloudinary').v2

export const getAllBooks = ({
    page,
    limit,
    order,
    name,
    search,
    min,
    max,
    filter,
    ...query
}) =>
    new Promise(async (res, rej) => {
        try {
            const queries = { raw: true, nest: true }
            const offset = !page || +page <= 1 ? 0 : +page - 1
            const limitPage = +limit || 2
            queries.offset = offset * limitPage
            queries.limit = limitPage
            if (order) queries.order = [[name, order]]
            if (search) query.title = { [Op.substring]: search }
            if (min && max && filter === 'between')
                query.available = { [Op[filter]]: [min, max] }
            else if (min && !max) query.available = { [Op[filter]]: min }
            else if (!min && max) query.available = { [Op[filter]]: max }
            const response = await db.Book.findAndCountAll({
                where: query,
                ...queries,
                attributes: {
                    exclude: ['category_code'],
                },
                include: [
                    {
                        model: db.Category,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        as: 'category',
                    },
                ],
            })
            res({
                err: response ? 0 : 1,
                message: response ? 'Success' : 'Cannot found book',
                books: {
                    page: page ? page : queries.offset + 1,
                    pageSize: queries.limit,
                    ...response,
                },
            })
        } catch (error) {
            rej(error)
        }
    })

export const createBook = ({ ...body }) =>
    new Promise(async (res, rej) => {
        try {
            const checkCategory = await db.Category.findOne({
                where: {
                    code: body.category_code.toUpperCase(),
                },
            })
            if (checkCategory === null) {
                if (body.fileData)
                    cloudinary.uploader.destroy(body.fileData.filename)

                return res({
                    err: 1,
                    message: 'Invalid category code',
                    book: null,
                })
            }
            const response = await db.Book.findOrCreate({
                where: {
                    title: body.title,
                },
                defaults: {
                    id: generateId(),
                    ...body,
                    description: description ? description : '',
                    category_code: body.category_code.toUpperCase(),
                    image: body?.fileData.path,
                },
            })
            res({
                err: response[1] ? 0 : 1,
                message: response[1]
                    ? 'Book created successfully'
                    : 'Book created failed',
            })
            if (body.fileData && !response[1])
                cloudinary.uploader.destroy(body.fileData.filename)
        } catch (error) {
            console.log(error)
            rej(error)
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
        }
    })

export const updateBook = ({
    id,
    title,
    price,
    available,
    description,
    category_code,
    fileData,
}) =>
    new Promise(async (res, rej) => {
        try {
            const checkCategory = await db.Category.findOne({
                where: {
                    code: category_code.toUpperCase(),
                },
            })
            if (checkCategory === null) {
                if (fileData) cloudinary.uploader.destroy(fileData.filename)
                return res({
                    err: 1,
                    message: 'Invalid category code',
                    book: null,
                })
            }
            const updateData = {
                title,
                price: parseFloat(price),
                available: parseInt(available),
                description: description ? description : '',
                category_code: category_code.toLowerCase(),
            }
            if (fileData) {
                updateData.image = fileData.path
            }
            const [response] = await db.Book.update(updateData, {
                where: {
                    id,
                },
            })
            res({
                err: response > 0 ? 0 : 1,
                message:
                    response > 0
                        ? 'Book updated successfully'
                        : 'Book updated failed. Book not found',
            })
            if (fileData && response === 0)
                cloudinary.uploader.destroy(fileData.filename)
        } catch (error) {
            console.log(error)
            rej(error)
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
        }
    })

export const deleteBook = ({ Book }) =>
    new Promise(async (res, rej) => {
        try {
            const response = await db.Book.destroy({
                where: {
                    id: Book.id,
                },
            })
            console.log('response: ', response)
            res({
                err: response > 0 ? 0 : 1,
                message:
                    response > 0
                        ? 'Book deleted successfully'
                        : 'No book deleted',
            })
            if (Book.image !== null && response > 0) {
                const arr = Book.image.split('/')
                const filename =
                    arr[arr.length - 2] +
                    '/' +
                    arr[arr.length - 1].split('.')[0]
                console.log(filename)
                cloudinary.uploader.destroy(filename)
            }
        } catch (error) {
            console.log(error)
            rej(error)
        }
    })
