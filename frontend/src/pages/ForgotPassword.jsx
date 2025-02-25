import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="p-6 max-w-md w-full bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-[#08D665] text-2xl font-bold text-center">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="mt-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 text-white bg-black border border-gray-400 rounded focus:ring-[#08D665]"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 p-2 bg-[#08D665] text-white rounded hover:bg-[#07b659] transition"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
