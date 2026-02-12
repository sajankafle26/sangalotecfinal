import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    courseType: {
        type: String,
        enum: ['VideoCourse', 'LiveCourse'],
        default: 'VideoCourse',
    },
    courseTitle: String, // Cache the title for easier tracking
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['esewa', 'khalti'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    transactionId: String,
    paymentDetails: Object,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
