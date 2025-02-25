import generateToken from "../utils/generateToken.js";
import tryCatch from "../utils/tryCatch.js";
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel.js';
import nodemailer from 'nodemailer';

// Registe
export const registerUser = tryCatch(async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists!" });
    };
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name, email, password: hashPassword
    });

    generateToken(user._id, res);

    res.status(200).json({ message: "User registered successfully!" })
});

// Login
export const loginUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    };
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        return res.status(400).json({ message: "Invalid email or password" });
    };
    generateToken(user._id, res)

    res.status(200).json({ message: "User logged in successfully!" })
});

// My Profile
export const myProfile = tryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
});

//log             out
export const logout = tryCatch(async (req, res) => {
    res.cookie("token", "", { maxAge: 0 });
    res.json({ message: "User logged out successfully!" })
});

// Edit User
export const editUser = tryCatch(async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();

    res.status(200).json({ message: "User updated successfully!", user });
});

// Delete User
export const deleteUser = tryCatch(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully!" });
});

// Get All Users
export const getAllUsers = tryCatch(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

//forgot password

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
    },
});

// Forgot Password Route
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.json({ message: "Password reset email sent!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }

}
