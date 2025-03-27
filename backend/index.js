import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import contentRoute from './routes/contentRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.options('*', cors());


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.body);
    next();;
})

// Routes
app.use("/api/content", contentRoute);

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`);
});
