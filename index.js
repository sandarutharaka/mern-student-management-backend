import express from 'express';
import mongoose from 'mongoose';
import Student from './studentModel.js';
import cors from 'cors'; 
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const mongourl = "mongodb+srv://user:xOugXduNfayCaFdM@cluster0.luwyo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongourl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(()=>{
    console.log('Database connected');
}).catch((err)=>{
    console.log(err);
})
app.get ("/students",(req,res)=>{
    Student.find().
    then((students)=>res.send(students)
)
})


app.post('/students',(req,res)=>{
    const studentData = req.body;
    const student = new Student(studentData);
    student.save().then(()=>{
        res.send('Student Added');
}).catch((err)=>{
    res.send(err);
})
})
app.delete('/students/:id',(req,res)=>{
    const reg = req.params.id
    const student =Student.findOneAndDelete({reg}).then(()=>{
        res.send('student deleted')
    }).catch((err)=>{
        res.send(err);
})
})

app.put('/students/:id',(req,res)=>{
    const reg = req.params.id
    Student.findOneAndUpdate({reg},req.body).then(()=>{
      res.send("updated")
    })
  })


app.listen(5000,()=>
    {console.log('Server is running on port 5000')
    });