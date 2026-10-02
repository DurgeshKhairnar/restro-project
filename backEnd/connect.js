import mongoose from 'mongoose';
import 'dotenv/config';
import dns from 'dns';

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const Url = process.env.MONGOOSE_URL;


mongoose.connect(process.env.MONGOOSE_URL)
.then(() => console.log('mongoose is connected'))
.catch((error) => console.log(`mongoose error ${error}`));


export default mongoose;