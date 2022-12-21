import dotenv from 'dotenv';

dotenv.config();

export default {
    MONGO_ATLAS: process.env.MONGO_ATLAS,
    PUERTO: process.env.PUERTO || 8080,
}
