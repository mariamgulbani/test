//Connection.db.collection('users');
// .insertMany([
//     {
//         name: 'temur',
//         surname: 'kvirkvelia',
//         email: 'tkvirkvelia@bog.ge',
//         phone: '22222'
//     },
//     {
//         name: 'mariam',
//         surname: 'gulbani',
//         email: 'mgulbani@bog.ge',
//         phone: '33333'
//     },
//     {
//         name: 'jemal',
//         surname: 'tadumadze',
//         email: 'jtadumadze@bog.ge',
//         phone: '11111'
//     }]);
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
        res.send({success: true,...params})
    }
    static async updateClientData(req,res){
        try {
            await Connection.db.collection('users').remove();
            await Connection.db.collection('user').insertMany(
                [
                    {
                        firstName:'Mariami',
                        lastName:'Gulbani',
                        email: 'mgulbani@bog.ge',
                        phone:'2222',

                    }
                    ]
            )
        } catch (exception) {
            res.status(500).send();
        }
    }
}

export {User};