import { config } from 'https://deno.land/x/dotenv/mod.ts'; 
import { MongoClient } from 'https://deno.land/x/mongo@v0.7.0/mod.ts'; 
const env = config();

const client = new MongoClient();
client.connectWithUri(`mongodb://127.0.0.1:27017`);

const db = client.database("Deno_Test");

export default db;
