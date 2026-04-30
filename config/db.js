const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://localhost:27017/feastforward");

//         console.log("MongoDB Connected Successfully (LOCAL)");

//     } catch (error) {
//         console.error(error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));
};
module.exports = connectDB;