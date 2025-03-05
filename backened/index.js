const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.input;
        console.log("User Input:", userMessage);

        const responseStream = await axios.post("http://localhost:11434/api/generate", {
            model: "phi",
            prompt: userMessage,
            stream: true
        }, { responseType: "stream" });

        let fullResponse = "";

        responseStream.data.on("data", (chunk) => {
            const lines = chunk.toString().split("\n").filter(line => line.trim() !== "");
            lines.forEach(line => {
                try {
                    const json = JSON.parse(line);
                    if (json.response) {
                        fullResponse += json.response + " "; // Collect response
                    }
                } catch (err) {
                    console.error("Error parsing chunk:", err);
                }
            });
        });

        responseStream.data.on("end", () => {
            console.log("Final Response:", fullResponse.trim()); // Full collected response
            res.json({ reply: fullResponse.trim() }); // Send full response at once
        });

    } catch (error) {
        console.error("Error communicating with Ollama:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});
