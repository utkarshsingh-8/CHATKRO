import 'dotenv/config';

export const env = {
    port: process.env.PORT,
    client_url: process.env.CLIENT_URL,
    jwt_secret: process.env.JWT_SECRET,
    mongo_uri: process.env.MONGO_URI
};