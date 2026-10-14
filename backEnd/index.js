import express from 'express';
import 'dotenv/config';
import router from './routers/users_routers.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
))

app.use(express.json({}));
app.use(cookieParser());
app.use('/api',router);


app.post("/api/test", (req, res) => {
  console.log(req.body);

  res.status(200).json({
    success: true,
    message: "POST request successful",
    data: req.body
  });
});

app.listen(3000,() => {
    console.log('server running in http://localhost:3000')
})