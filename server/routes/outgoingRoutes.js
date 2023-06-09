import {Router} from "express";
import checkAuth from "../middleware/checkAuth.js";
import OutgoingModel from "../Models/Outgoing.js";
import {outgoingValidation} from "../utils/outgoingValidatior.js";
import handleValidation from "../utils/handleValidation.js";

const router = new Router()

router.post('/', checkAuth, outgoingValidation, handleValidation, async (req, res) => {
    try {
        const carId = req.headers.carid
        const outgoing = await OutgoingModel.create({
            car: carId,
            user: req.userId,
            price: req.body.price,
            description: req.body.description,
            type: req.body.type,
            currency: req.body.currency
        })

        res.status(200).json({
            message: "Added outgoing",
            outgoing
        })

    } catch (err) {
        res.status(500).json({
            message: "",
            err
        })
    }
})

router.get('/', checkAuth, async (req, res) => {
    try {
        const outgoings = await OutgoingModel.find({user: req.userId})

        res.status(200).json({
            outgoings
        })
    } catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
})

router.get('/carid/:id', checkAuth, async (req, res) => {
    try {
        const outgoings = await OutgoingModel.find({car: req.params.id}).sort({createdAt: -1})

        res.status(200).json({
            outgoings
        })

    } catch (err) {
        console.log(err)
        res.status(404).json(err)
    }
})

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const outgoingId = req.params.id
        const outgoing = await OutgoingModel.findOneAndDelete({_id: outgoingId})

        if (!outgoing) {
            return res.status(404).json({
                message: "Outgoing not found"
            })
        }

        res.status(200).json({
            message: "Outgoing deleted successfully",
            outgoing
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong while removing outgoing",
            err
        })
    }
})

export default router