import {MongoClient, ObjectId} from "mongodb";
import {Connection} from "./connection.js";
import {Users} from "./modules/users.js";
import express from 'express';
import bodyParser from "body-parser";

MongoClient.connect('mongodb+srv://mariamgulbani:Mariami-123@bogcluster.plfscy7.mongodb.net/?retryWrites=true&w=majority', (error, client) => {
    if (error) {
        return console.error(error);
    }

    Connection.set(client.db('bog_test'));

    console.log('Connected to database....');
//     Connection.db.collection('users')
// .find()
// .toArray()
// .then(result => console.log(result));
//     Connection.db.collection('cards')
//         .find()
//         .toArray()
//         .then(result => console.log(result));

    Users.getUserCards()
    Connection.db.collection('cards')
        .aggregate( [
            {
                $lookup:
                    {
                        from: "users",
                        localField: "nameOnCard",
                        foreignField: "name",
                        as: "cardUser"
                    }
            }
        ] )
        .toArray()
        .then(result => console.log(result));
    Connection.db.collection('users')
        .aggregate( [
        {
            $lookup: {
                from: "cards",
                localField: "name",    // field in the orders collection
                foreignField: "nameOnCard",  // field in the items collection
                as: "fromItems"
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$fromItems", 0 ] }, "$$ROOT" ] } }
        },
        { $project: { fromItems: 0 } }
    ] )
        .toArray()
        .then(result => console.log(result));

    // Connection.db.collection('orders')
    //     .insertMany( [
    //     { "_id" : 1, "item" : "almonds", "price" : 12, "ordered" : 2 },
    //     { "_id" : 2, "item" : "pecans", "price" : 20, "ordered" : 1 },
    //     { "_id" : 3, "item" : "cookies", "price" : 10, "ordered" : 60 }
    // ] );
    //
    // Connection.db.collection('warehouses')
    //     .insertMany( [
    //     { "_id" : 1, "stock_item" : "almonds", warehouse: "A", "instock" : 120 },
    //     { "_id" : 2, "stock_item" : "pecans", warehouse: "A", "instock" : 80 },
    //     { "_id" : 3, "stock_item" : "almonds", warehouse: "B", "instock" : 60 },
    //     { "_id" : 4, "stock_item" : "cookies", warehouse: "B", "instock" : 40 },
    //     { "_id" : 5, "stock_item" : "cookies", warehouse: "A", "instock" : 80 }
    // ] );



    // Connection.db.collection('warehouses')
    //     .aggregate( [
    //     {
    //         $lookup:
    //             {
    //                 from: "warehouses",
    //                 let: { order_item: "$item", order_qty: "$ordered" },
    //                 pipeline: [
    //                     { $match:
    //                             { $expr:
    //                                     { $and:
    //                                             [
    //                                                 { $eq: [ "$stock_item",  "$$order_item" ] },
    //                                                 { $gte: [ "$instock", "$$order_qty" ] }
    //                                             ]
    //                                     }
    //                             }
    //                     },
    //                     { $project: { stock_item: 0, _id: 0 } }
    //                 ],
    //                 as: "stockdata"
    //             }
    //     }
    // ] )
    //     .toArray()
    //     .then(result => console.log(result));



})

// Connection.db.collection('users')
//      .insertOne({
//     name: 'temur',
//     surname: 'kvirkvelia',
//     email: 'tkvirkvelia@bog.ge',
//     phone: '22222'
// });

// Connection.db.collection('users')
// .find()
// .toArray()
// .then(result => console.log(result));



 //   app.listen(8082, () => {
//     console.log('App is running...');
// });



