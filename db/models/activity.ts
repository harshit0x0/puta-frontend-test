// sample activity
// {
//         id: 1,
//         title: "Annual Teachers' Conference",
//         date: "March 15, 2024",
//         description: "A gathering of educators to discuss current trends and challenges in higher education.",
//         image: "/placeholder.svg",
//}

import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
});

export default mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);