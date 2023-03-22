import mongoose, {Schema} from "mongoose"

const UserModel = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    cars: {
        type: Array
    }
}, {timestamps: true})

export default mongoose.model("User", UserModel)