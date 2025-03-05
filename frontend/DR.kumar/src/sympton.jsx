import { useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import "./sympton.css";

export default function Chat() {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setChatHistory((prev) => [...prev, { type: "user", message: input }]);
        setInput("");

        try {
            const { data } = await axios.post("http://localhost:3000/chat", { input });
            setChatHistory((prev) => [...prev, { type: "bot", message: data.reply }]);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div className="chat-container">
            {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type === "user" ? "user-message" : "bot-message"}`}>
                    {msg.type === "bot" && <Avatar alt="Bot Avatar" src="/images/avatar1.jpg" className="avatar" />}
                    {msg.message}
                </div>
            ))}

            <form onSubmit={handleSubmit} className="form">
                <input 
                    type="text" 
                    value={input} 
                    onChange={handleChange} 
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
