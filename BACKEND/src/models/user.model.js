import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profileCompleted: {
        type: Boolean,
        default: false
    },

    name: String,
    avatar: String,
},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;