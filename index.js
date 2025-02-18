import express from 'express'
import mongoose from 'mongoose';
import Student from './studentModel.js';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const mongoUrl = "mongodb+srv://user:xOugXduNfayCaFdM@cluster0.luwyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('Connected to MongoDB')
})


app.post('/students',(req,res)=>{
  const studentData = req.body
  const student = new Student(studentData)
  student.save().then(()=>{
    res.send("Student added")
  }).catch((error)=>{
    res.send(error)
  })
})

app.delete('/students/:id',(req,res)=>{
  const reg = req.params.id
  const student = Student.findOneAndDelete({reg}).then(()=>{
    res.send("Deleted")
  }).catch((error)=>{
    res.send(error)
  })
})

app.put('/students/:id',(req,res)=>{
  const reg = req.params.id
  Student.findOneAndUpdate({reg},req.body).then(()=>{
    res.send("updated")
  })
})

app.get("/students",(req,res)=>{
  Student.find().then((students)=>{
    res.send(students)
  })
})
app.get("/cicd-check",(req,res)=>{
  res.send("CI/CD is working")
});

app.listen(5000,()=>{
  console.log('Server is running')
})