import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    type: {
        type: String,
        enum: ["direct"],
        default: "direct"
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
},
    { timestamps: true }
);

conversationSchema.index(
    { participants: 1 },
    { unique: true }
);

export default mongoose.model("Conversation", conversationSchema);