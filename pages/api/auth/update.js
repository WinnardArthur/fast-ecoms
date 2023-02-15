import User from "@/models/User";
import db from "@/utils/db";
import { getSession } from "next-auth/react";
import bcryptjs from 'bcryptjs';

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return res.status(400).send({message: `${req.method} not supported`})
    }

    const session = await getSession({ req });

    if(!session) return res.status(401).send({message: 'signin required'});

    const { user } = session;

    const { email, name, password } = req.body;

    if (!name || !email || !email.includes('@') || !password || password.trim().length < 5) {
        res.status(422).json({message: 'Validation error'})
        return;
    }

    await db.connect();

    const userToUpdate = await User.findById(user._id);
    userToUpdate.name = name;
    userToUpdate.email = email;

    if(password) {
        userToUpdate.password = bcryptjs.hashSync(password)
    }

    await userToUpdate.save();
    await db.disconnect();

    res.send({message: 'User updated'});

}

export default handler;