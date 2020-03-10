const mongoose = require ('mongoose');

const URI = process.env.MONGODB_URI||"mongodb://localhost/mernstack";

mongoose.connect(URI,{ //ayuda a mongoose a conectarse
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Base CONECTADA");
})