import { MongoClient, ServerApiVersion } from "mongodb";

const options = {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
};

let clientPromise;

/**
 * client.connect()-এর রিটার্ন ভ্যালুর উপর নির্ভর না করে, .then(() => client)
 * দিয়ে explicitly client instance-এ resolve করানো হলো — এতে ড্রাইভারের যেকোনো
 * ভার্সনেই clientPromise সবসময় ব্যবহারযোগ্য MongoClient রিটার্ন করবে, যার .db() আছে।
 */
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