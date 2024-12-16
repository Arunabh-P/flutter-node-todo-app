import asyncHandler from "express-async-handler";
import { registrationValidation } from "../validation/userValidation.js";
import { StatusCodes } from "http-status-codes";
import { userService } from "../services/userService.js";

export const registerUser =  asyncHandler(async(req,res)=>{
        const {email,password} = req.body
        const { error } = registrationValidation.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                status: false,
                errors: error.details.map(detail => detail.message),
            });
        }
        const {registerUser} = userService();
        const newUser = await registerUser(email, password);
        res.status(StatusCodes.CREATED).json({
            status: true,
            success: 'User registered successfully',
            user: {
                id: newUser._id,
                email: newUser.email
            }
        });
})