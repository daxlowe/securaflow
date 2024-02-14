import mongoose from 'mongoose';
import dotenv from 'dotenv';
import log from './logger';

function connect() 
{
    dotenv.config()

    const DB_CONN_STRING: string = `${process.env.DB_CONN}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;

    mongoose.connect(DB_CONN_STRING)
    .then(() => {
        log.info(`Connected to DB`);  
    })
    .catch((error) => {
        log.error(error);
        process.exit(1);
    });
}

export default connect
