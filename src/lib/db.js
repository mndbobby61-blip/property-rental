import { MongoClient, ServerApiVersion } from "mongodb";

const options = {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
};

let clientPromise;


if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(process.env.DB_URI, options);
    global._mongoClientPromise = client.connect().then(() => client);
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(process.env.DB_URI, options);
  clientPromise = client.connect().then(() => client);
}

export default clientPromise;