import { MongoClient } from 'mongodb';

let cachedClient;
let cachedDb;

const { MONGODB_URI } = process.env;
const { DB_NAME } = process.env;

const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
  }
  if (!DB_NAME) {
    throw new Error('Define the MONGODB_DB environmental variable');
  }

  const client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
};

export default connectToDatabase;
