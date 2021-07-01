import mongoose from 'mongoose';

const dbConnect = async () => {
    /// DATABASE CONNECTION
    mongoose.connect(`${process.env.MONGO_URI}`,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );

}

export default dbConnect;