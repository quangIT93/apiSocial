const mongoose = require('mongoose');

// const { ServerApiVersion } = require("mongoDB");
const { MongoClient, ServerApiVersion } = require('mongodb');
async function connectDB() {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@social.zmpduyq.mongodb.net/apiSocial?retryWrites=true&w=majority`,
            // `mongodb+srv://projectSocial:quangbk5493@social.zmpduyq.mongodb.net/Apisocial?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverApi: ServerApiVersion.v1,

                // hai cai ben duoi da khong con ho tro
                // options usecreateindex, usefindandmodify are not supported
                // useCreateIndex: true,
                // useFindAndModify: false,
            }
        );
        console.log('connected mongooseDB!!!');
    } catch (error:any ) {
        console.log('ket noi that bai');
        console.log(error.message);
        process.exit(1);
    }
}

export default { connectDB };