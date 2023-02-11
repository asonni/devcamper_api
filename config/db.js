const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.set('strictQuery', true);
  const conn = await mongoose.connect(process.env.MONGO_URI);
  // eslint-disable-next-line no-console
  console.log(
    `MongoDB Connected: ${conn.connections[0].host}`.cyan.underline.bold
  );
};

module.exports = connectDB;
