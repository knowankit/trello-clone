import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB, LOCAL_MONGODB, NODE_ENV} = process.env;

if (NODE_ENV === 'development' && !MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (NODE_ENV === 'development' && !LOCAL_MONGODB) {
  throw new Error('Please define the LOCAL_MONGODB environment variable inside .en.local during development mode);
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const mongoURL = NODE_ENV === 'development' ? MONGODB_DB : MONGODB_URI;

    cached.promise = MongoClient.connect(mongoURL, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB)
      };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
