import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contentRoute from './routes/contentRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: "*", // Allow requests from any origin
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS", // Allow these methods
    allowedHeaders: "Content-Type, Authorization"
}));


app.use(express.json());
app.use((req, res, next) => {

    next();;
})

// Routes
app.use("/api/v1/user", contentRoute);

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`);
});
