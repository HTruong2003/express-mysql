export const userValidation = {
    email: {
        notEmpty: {
            errorMessage: 'Email cannot be empty',
        },
        isEmail: {
            errorMessage: 'Invalid email format. Email format is abc@gmail.com',
        },
    },
    password: {
        isLength: {
            options: {
                min: 6,
            },
            errorMessage: 'Password must be at least 6 characters',
        },
        notEmpty: {
            errorMessage: 'Password cannot be empty',
        },
        matches: {
            options: /^[a-zA-Z0-9]*$/,
            errorMessage: 'Password cannot contain special characters',
        },
    },
}

export const bookValidation = {
    title: {
        notEmpty: {
            errorMessage: 'Title cannot be empty',
        },
    },
    price: {
        isFloat: {
            errorMessage: 'Price must be a float',
        },
        notEmpty: {
            errorMessage: 'Price cannot be empty',
        },
    },
    available: {
        matches: {
            options: /^[0-9]*$/,
            errorMessage: 'Available only contains number',
        },
        notEmpty: {
            errorMessage: 'Available cannot be empty',
        },
    },
    category_code: {
        notEmpty: {
            errorMessage: 'Category code cannot be empty',
        },
    },
}

export const categoryValidation = {
    value: {
        notEmpty: {
            errorMessage: 'Value cannot be empty',
        },
    },
}
