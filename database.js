const mongoose = require('mongoose');


const db = mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected");
}).catch((err) => {
    console.log("Error",err);
});

module.exports = mongoose.connection;
