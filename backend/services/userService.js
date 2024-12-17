import {StatusCodes} from 'http-status-codes';
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
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
    const checkUserExist = async (email)=>{
        const isUser = await User.findOne({email})
        if(!isUser){
            const error = new Error("Email not registered with us");
            error.statusCode = (StatusCodes.NOT_FOUND)
            throw error;
        }
        return isUser;
    }
    const comparePassword = async (inputPassword, storedPassword)=>{
        const isMatch = await bcrypt.compare(inputPassword, storedPassword);
        if (!isMatch) {
            const error = new Error("Invalid credentials");
            error.statusCode = StatusCodes.UNAUTHORIZED;
            throw error;
        }
        return isMatch;
    }
    const generateToken = (user) => {
        return jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } 
        );
    };
    return {registerUser,checkUserExist,comparePassword,generateToken}
}