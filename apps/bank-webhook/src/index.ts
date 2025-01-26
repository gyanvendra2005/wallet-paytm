// import express from 'express';
// import { PrismaClient } from '@repo/db/client';
// import { data, u } from 'motion/react-client';

// const db= new PrismaClient();
// const app = express();

// app.post('/', async (req, res) => {
//     const paymentInformation = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount
//     };

//     // Update the user's wallet balance
//      await db.balance.update({
//         where:{
//             userId: paymentInformation.userId
//         },
//         data:{
//             amount:{
//                 increment: paymentInformation.amount
//             }
//         }
//     })

//      await db.onRampTransaction.update({
//         where:{
//             token: paymentInformation.token
//         },
//         data:{
//             status: "Success"
//         }
//     })

//     res.status(200).json({ message: 'Payment successful' });

// });


import express from "express";
import { PrismaClient } from '@repo/db/client';

const db= new PrismaClient();
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        db.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            }, 
            data: {
                status: "Success",
            }
        })
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);