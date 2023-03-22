import {body} from 'express-validator'

export const carValidation = [
    body('brand', 'Invalid Brand').isLength({min: 1, max: 40}),
    body('model', 'Invalid Model').isLength({min: 1, max: 40}),
    body('year', 'Invalid Year').isNumeric(),
    body('fuelType', 'Invalid fuel type').isString(),
    body('engineSize', 'Invalid engine size').isNumeric(),
    body('description').optional().isString()
]