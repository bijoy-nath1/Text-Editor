import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contentRoute from './routes/contentRoute.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ 
    origin: "https://0b274d8b-ce64-4408-9561-abbd81dede33-00-1iqo4llmoghcs.sisko.replit.dev/", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"],
   
}));
app.options('*', cors());


app.use(express.json());
app.use((req, res, next) => {
    console.log(req.body);
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
