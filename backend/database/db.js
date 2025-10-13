import mongoose from 'mongoose';
export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: 'Mern_Stack_Library_Management_System',
    }).then(() => {
        console.log('database Connected Successfully');
    }).catch((err) => {
        console.log('database Connection Failed',err);
    });
}