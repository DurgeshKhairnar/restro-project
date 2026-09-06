import express from 'express';
import 'dotenv/config';
import router from './routers/users_routers.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json({}));
app.use(cookieParser());
app.use('/api',router);


app.get('/',(req,res) => {
    res.status(200).json({message:'all good'})
})

app.listen(3000,() => {
    console.log('server running in http://localhost:3000')
})