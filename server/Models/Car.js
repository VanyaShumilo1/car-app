import mongoose, {Schema} from "mongoose";

const CarModel = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fuelType: {
        type: String,
        required: true,
    },
    engineSize: {
        type: Number,
        required: true,
    },
    outgoings: {
        type: Array,
        ref: 'Outgoings',
    }
}, {timestamps: true})

export default mongoose.model('Car', CarModel)