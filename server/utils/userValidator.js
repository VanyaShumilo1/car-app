import {body} from 'express-validator'

export const userValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Invalid email').isLength({min: 4, max: 20}),
]