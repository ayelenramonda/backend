import 'dotenv/config'


export default {
  MONGO_ATLAS: process.env.MONGO_ATLAS || 'mongodb://localhost:27017/ecommerce'
};
