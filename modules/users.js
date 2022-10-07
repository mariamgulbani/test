import {Connection} from "../connection.js";



export class Users {
    static getUserCards(){
        Connection.db.collection('users')
            .aggregate( [
                {
                    $lookup:
                        {
                            from: "cards",
                            localField: "name",
                            foreignField: "nameOnCard",
                            as: "cardUser"
                        }
                }
            ] )
            .toArray()
            .then(result => console.log(result));
    }

}




