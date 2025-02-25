import React, { useState } from 'react';

const Contact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");

        const formData = new FormData(event.target);
        formData.append("access_key", "74c6ca26-bf42-47d9-8020-1b97b6cc9754");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully");
                event.target.reset();
            } else {
                setResult(data.message);
            }
        } catch (error) {
            setResult("Something went wrong. Please try again later.");
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className='mt-20 flex flex-col items-center justify-center'>
            <h1 className='text-white uppercase text-2xl font-bold'>
                Contact <span className='text-[#08D665]'>Us</span>
            </h1>
            <form onSubmit={onSubmit} className='flex flex-col mt-10 gap-4 items-center justify-center w-full max-w-md'>
                <input
                    name="name"
                    className='bg-black w-full border border-white text-white p-2 outline-none focus:border-[#08D665]'
                    type="text"
                    placeholder='Name'
                    required
                />
                <div className='flex w-full gap-4'>
                    <input
                        name="email"
                        className='bg-black w-full border border-white text-white p-2 outline-none focus:border-[#08D665]'
                        type="email"
                        placeholder='Email'
                        required
                    />
                    <input
                        name="subject"
                        className='bg-black w-full border border-white text-white p-2 outline-none focus:border-[#08D665]'
                        type="text"
                        placeholder='Subject'
                        required
                    />
                </div>
                <textarea
                    name="message"
                    className='bg-black w-full border border-white text-white p-2 outline-none focus:border-[#08D665]'
                    placeholder='Your Message'
                    required
                ></textarea>
                <button
                    type="submit"
                    className='text-center bg-[#08D665] text-white rounded-full p-2 px-6'
                >
                    Send Message
                </button>
                {result && <p className='text-white mt-2'>{result}</p>}
            </form>
        </div>
    );
};

export default Contact;
