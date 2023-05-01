const mongoose = require('mongoose');


const db = mongoose.connect(process.env.MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected");
}).catch((err) => {
    console.log("Error",err);
});

// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to database'));

module.exports = mongoose.connection;
