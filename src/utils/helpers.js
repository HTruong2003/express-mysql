import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export const generateCode = (value) => {
    let output = ''
    const arrValue = value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
    console.log(arrValue)
    if (arrValue.length >= 2) {
        arrValue.forEach((item) => {
            if (item === '-') return
            output += item.charAt(0).toUpperCase()
        })
    }
    return arrValue.length >= 2 ? output : value.toUpperCase()
}

export const generateId = () => {
    return v4().split('-').join('').slice(0, 9)
}

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

export const comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}
