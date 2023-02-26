import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import router from './routes/index.js'

const app = express()

// cors settings if you need
const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
    ]
}


app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use(express.static('public'))

// reponses jsons correctly
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// route files
app.use(process.env.API_PREFIX, router)

// 404 error handle
app.use(function(req, res, next) {
    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }
});
// app will listen this port
app.listen(process.env.PORT || 80, () => console.log('Server is started'))
