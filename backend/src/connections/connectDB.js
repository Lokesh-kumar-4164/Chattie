import mongoose from 'mongoose'

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection successful")
    }catch(e) {
        console.log(`Error at connect ${e}`);
    }
}

export default connect;