import express from 'express';
import cors from 'cors';
import router from './routes/route.js';
import { connection } from './database/db.js';
import { config } from 'dotenv';
config();

const app = express();

if (process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
}


app.use(cors())
app.use(express.json());
app.use('/', router);


const port = process.env.PORT;

app.listen(port, () => {
   console.log(`http://localhost:${port}`);
})

connection()