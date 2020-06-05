import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


const port = process.env.PORT || 5000


/* ========================
| DATABASE CONNECTION 
--------------------------*/

/*DEVELOPMENT(LOCAL)*/

mongoose.connect('mongodb://localhost:27017/hoteldelluna', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    }
);

/* ========================
| INITITALIZE THE APP 
--------------------------*/

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((req,res,next)=>next());


/* ========================
| ROUTES 
--------------------------*/

app.get('/', (req, res, next)=> res.send('HOTEL DEL LUNA BACKEND SERVER'))




/* ========================
| ERROR HANDLING
--------------------------*/

app.use((err, req, res, next)=> 
    {
        res.status(400).send (
            {
                error: err.message
            }
        )
    }
)

/* ========================
| LISTEN TO PORT
--------------------------*/

app.listen(port, () => 
    {
        console.log(`App is running on port: ${port}`)
    }
)