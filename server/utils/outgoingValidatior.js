import {body} from 'express-validator'

export const outgoingValidation = [
    body('price', 'Invalid price').isNumeric(),
    body('description', 'Invalid description').isString().isLength({min: 1}),
    body('type', 'Invalid type').isString().isLength({min: 1}),
]