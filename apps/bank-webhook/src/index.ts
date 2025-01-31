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
        userId: req.body.userId,
        amount: req.body.amount
    };
    console.log(paymentInformation);

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

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});