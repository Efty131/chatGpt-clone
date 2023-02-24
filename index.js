const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("colours");
require('dotenv').config();

app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    apiKey : process.env.KEY,
})

const openai = new OpenAIApi(config);

// endpoint for chatgpt
app.post("/chat", async (req,res) =>{
    const { prompt } = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt,
    });
    res.send(completion.data.choices[0].text);
});

// server setup
const port = 5000;
app.listen(port, () =>{
    console.log(`Server is running at http://localhost:${port}`.blue.italic);
});
