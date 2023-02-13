import Order from "@/models/Order";
import db from "@/utils/db";
import { getSession } from "next-auth/react";

export default async function handler (req, res) {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send('signin required')
    }

    const { user } = session;
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user: user._id
    });

    const order = await newOrder.save();
    res.status(201).send(order)
}
