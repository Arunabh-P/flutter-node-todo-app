import {StatusCodes} from 'http-status-codes';
import User from "../model/userModel.js";
import bcrypt from "bcrypt";

export const userService = () => {
    const registerUser = async (email, password) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                const error = new Error('Email already exist');
                error.statusCode = (StatusCodes.CONFLICT)
                throw error;
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const createUser = new User({email,password:hashedPassword})
            return await createUser.save();
    }
    return {registerUser}
}