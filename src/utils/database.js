import mongoose from 'mongoose';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbProtocol = process.env.DB_PROTOCOL;
const dbUri = process.env.DB_URI;

export function connectDB() {
  mongoose.connect(`${ dbProtocol }://${ dbUser }:${ dbPassword }@${ dbUri }`)
    .catch((e) => console.log('Error on connection >>>>', e));
}

export function disconnectDB() {
  mongoose.disconnect(err => console.log('Disconnect DB>>>>', err));
}

export default {
  connectDB,
  disconnectDB
};
