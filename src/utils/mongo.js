import { MongoClient } from 'mongodb';

let cachedClient;
let cachedDatabase;

const { MONGODB_URI, DB_NAME } = process.env;

const connectToDatabase = async () => {
  if (cachedClient && cachedDatabase) {
    return {
      client: cachedClient,
      db: cachedDatabase,
    };
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
  }
  if (!DB_NAME) {
    throw new Error('Define the MONGODB_DB environmental variable');
  }

  const client = new MongoClient(MONGODB_URI, options);
  await client.connect();
  const database = client.db(DB_NAME);

  cachedClient = client;
  cachedDatabase = database;

  return {
    client: cachedClient,
    db: cachedDatabase,
  };
};

export default connectToDatabase;
