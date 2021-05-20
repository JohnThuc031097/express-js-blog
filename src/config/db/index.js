import mongoose from "mongoose";

const connect = async (nameDb) => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${nameDb}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Connect OK");
    } catch (error) {
        console.log("Connect:", error);
    }
};

export default {
    connect,
};
