import mongoose, {Schema} from "mongoose";

const OutgoingModel = new Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'USD',
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true})

export default mongoose.model('Outgoing', OutgoingModel)