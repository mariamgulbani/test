
import {Connection} from "../connection.js";
import {ObjectId} from "mongodb";

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
            if (params._id){

                await Connection.db.collection("users")
                    .updateOne(
                        {_id:ObjectId(params._id)},
                        {
                            $set: {
                                firstName:params.firstName,
                                lastName:params.lastName,
                                email: params.email,
                                phoneNumber:params.phoneNumber,
                                creationDate: new Date(),
                            },
                        }


                    )


            }
            else{
                await Connection.db.collection("users")
                    .insertMany([
                        params
                    ])
            }

            res.status(200).send({});
        } catch (exception) {
            console.error(exception.message)
            res.status(500).send()
        }
    }

    static async deleteClientData(req,res,params){
        console.log(params)
        try {
            await Connection.db.collection('users')
                .deleteOne({_id: ObjectId(params._id)})
            res.status(200).send({});

        } catch (exception) {
            console.error(exception.message)
            res.status(500).send();
        }
    }


    static async getMessageData(req, res) {
        try {
            const messages = await Connection.db.collection("chat")
                .find()
                .toArray();
            res.status(200).send(JSON.stringify(messages));
        } catch (exception) {
            res.status(500).send();
        }
    }

    static async saveMessageData(req, res, params) {
        console.log(params.message)
        try {
            console.log(params.message)

            await Connection.db.collection("chat")
                .insertOne({
                    senderId: params.senderId,
                    senderName: params.senderName,
                    receiverId: params.receiverId,
                    receiverName: params.receiverName,
                    message: params.message,
                })
            res.status(200).send({});
        } catch (exception) {
            console.error(exception.message)
            res.status(500).send()
        }
        console.log(params.message)
    }
    }





export {User};