import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
    reg : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    date : {
        type: String,
        required: true,
    }
})
const Student = mongoose.model("students", studentModel);
export default Student;