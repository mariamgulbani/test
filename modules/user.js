
import {Connection} from "../connection.js";

class User {
    static async getClientInfo(req,res) {
        try {
            const users = await Connection.db.collection('users')
                .find()
                .toArray();
            res.status(200).send(JSON.stringify(users));
        } catch (exception) {
            res.status(500).send();
        }

    }
    static async registerUser(req,res,params){
        try {
            await Connection.db.collection("users")
                .insertMany([
                    params
                ])
            res.status(200).send({});
        } catch (exception) {
            console.error(exception.message)
            res.status(500).send()
        }
    }

    static async deleteClientData(req,res,params){
        try {
            await Connection.db.collection('users')
                .deleteOne({params})
            res.status(200).send({});

        } catch (exception) {
            res.status(500).send();
        }
    }
}

export {User};