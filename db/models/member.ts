// name, designation, college, contact, department, membershipValidity, paymentId, joiningDate


import mongoose from "mongoose";
const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    college: { type: String, required: true },
    contact: { type: String, required: true },
    department: { type: String, required: true },
    membershipValidity: { type: String, required: true },
    paymentId: { type: String, required: true },
    joiningDate: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Member || mongoose.model("Member", memberSchema);
