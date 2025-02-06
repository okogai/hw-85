import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    db: 'mongodb://localhost:27017/discography',
    port: 8000,
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
    }
};

export default config;