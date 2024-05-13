import { matchedData, validationResult } from 'express-validator'
import * as services from '../services/index.js'
import { internalServerError, badRequest } from '../utils/handleError.js'
const cloudinary = require('cloudinary').v2

export const getAllBooks = async (req, res) => {
    try {
        const response = await services.getAllBooks(req.query)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getOneBook = async (req, res) => {
    try {
        const { Book } = req
        console.log(Book)
        return res.status(200).json({
            err: 0,
            book: Book,
        })
    } catch (error) {
        return internalServerError(res)
    }
}

export const createBook = async (req, res) => {
    try {
        const fileData = req.file
        const result = validationResult(req)
        if (!result.isEmpty()) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return result.errors.forEach((err) => badRequest(err, res))
        }
        const data = matchedData(req)
        const response = await services.createBook({
            ...data,
            description: req.body.description,
            fileData,
        })
        return res.status(201).json({
            err: 0,
            book: response,
        })
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateBook = async (req, res) => {
    try {
        const {
            params: { id },
        } = req

        const fileData = req.file
        const result = validationResult(req)
        if (!result.isEmpty()) {
            if (fileData) cloudinary.uploader.destroy(fileData.filename)
            return result.errors.forEach((err) => badRequest(err, res))
        }
        const data = matchedData(req)
        const response = await services.updateBook({
            id,
            ...data,
            description: req.body.description,
            fileData,
        })
        return res.status(200).json({
            err: 0,
            book: response,
        })
    } catch (error) {
        return internalServerError(res)
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { Book } = req
        const result = validationResult(req)
        if (!result.isEmpty()) {
            return result.errors.forEach((err) => badRequest(err, res))
        }
        const response = await services.deleteBook({
            Book,
        })
        return res.status(200).json({
            err: 0,
            book: response,
        })
    } catch (error) {
        return internalServerError(res)
    }
}
