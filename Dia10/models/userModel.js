import {MongoClient, ObjectId} from "mongodb"
import dotenv from "dotenv";
dotenv.config();
export default class UserModel {

    constructor() {

        this.client = new MongoClient(process.env.MONGO_URI);
        this.dbName = process.env.MONGO_DB

    }



    async connect() {
        // Revisa si ya estaba conectado de antes, sino deja entrar a la db
       if(!this.client.topology?.isConnected()){
        await this.client.connect();

       }

       return this.client.db(this.dbName).collection("users")


    }

        async createUser (userData) {

            const collection = await this.connect();
            return await collection.insertOne(userData);
        }

        async findUserbyEmail(email){

            const collection = await this.connect()
            return await collection.findOne({email});
        }

        async deleteUser(id) {
            const collection = await this.connect()
            return await collection.deleteOne(id);
        }

        async findUser() {
            const collection = await this.connect()
            return await collection.find();

        }

        async findUserById(id) {
            const collection = await this.connect()
            return await collection.find(id);

        }

        async updateUser(id , newData) {
            const collection = await this.connect()
            return await collection.updateOne({
                _id: new ObjectId(id)
            }, {$set:newData});
        }
}