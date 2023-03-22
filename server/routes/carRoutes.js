import {Router} from "express";
import CarModel from "../Models/Car.js";
import checkAuth from "../middleware/checkAuth.js";
import {carValidation} from "../utils/carValidatior.js";
import handleValidation from "../utils/handleValidation.js";
import OutgoingModel from "../Models/Outgoing.js";

const router = new Router()

router.post('/', checkAuth, carValidation, handleValidation, async (req, res) => {
    try {
        const car = await CarModel.create({
            brand: req.body.brand,
            model: req.body.model,
            year:  req.body.year,
            fuelType: req.body.fuelType,
            engineSize: req.body.engineSize,
            description: req.body.description,
            user: req.userId
        })
        res.status(200).json({
            message: "car created",
            car
        })
    } catch (err) {
        res.status(500).json({
            message: "something went wrong while creating car",
            err
        })
    }
})

router.get('/', checkAuth, async (req, res) => {
    try {
        const userId = req.userId
        const cars = await CarModel.find({user: userId})

        res.status(200).json({
            cars
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Error while finding cars",
            err
        })
    }
})

router.delete('/:id', checkAuth, async (req, res) => {
    try {
        const carId = req.params.id
        const car = await CarModel.findOneAndDelete({_id: carId})

        if (!car) {
            return res.status(404).json({
                message: "Car not found"
            })
        }

        const outgoings = await OutgoingModel.deleteMany({car: carId})

        res.status(200).json({
            message: "post deleted successfully",
            car,
            outgoings
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Something went wrong while removing car",
            err,
        })
    }
})

export default router