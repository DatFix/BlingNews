import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)

const account = new Account(client)
const database = new Databases(client)
const storage = new Storage(client)

export { account, database, storage };
