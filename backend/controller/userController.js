import asyncHandler from "express-async-handler";
import { loginValidation, registrationValidation } from "../validation/userValidation.js";
import { StatusCodes } from "http-status-codes";
import { userService } from "../services/userService.js";

export const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const { error } = registrationValidation.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            status: false,
            errors: error.details.map(detail => detail.message),
        });
    }
    const { registerUser } = userService();
    try {
        const newUser = await registerUser(email, password);
        res.status(StatusCodes.CREATED).json({
            status: true,
            success: 'User registered successfully',
            user: {
                id: newUser._id,
                email: newUser.email
            }
        });
    } catch (error) {
        next(error);
    }

})

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const { error } = loginValidation.validate(req.body, { abortEarly: false })
    if (error) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
            status: false,
            errors: error.details.map(detail => detail.message),
        });
    }
    const { checkUserExist, comparePassword, generateToken } = userService();
    try {
        const user = await checkUserExist(email);
        await comparePassword(password, user.password);
        const token = generateToken(user);
        res.status(StatusCodes.OK).json({
            status: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        next(error);
    }
})