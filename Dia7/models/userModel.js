import {MongoClient, ObjectOd} from "mongodb"
import dotenv from "dotenv";

export default class UserModel {

    constructor() {

        this.client = new MongoClient(process.env.MONGO_URI);
        this.dbName = process.env.MONGO_DB

    }



    async connect() {
        if (db) return db
        await this.client.connect()
        db = this.client.db(this.dbName)
        return db.collection("users");


    }

        async createUser (userData) {

            const collection = await this.connect();
            return await collection.insertOne(userData);
        }

        async findUserbyEmail(email){

            const collection = await this.connect()
            return await collection.find({email});
        }

        async deleteUser(id, data) {
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

        async updateUser(id , data) {
            const collection = await this.connect()
            return await collection.updateOne(id);
        }
}