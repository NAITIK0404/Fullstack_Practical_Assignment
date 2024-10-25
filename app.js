// app.js

const readline = require("readline");
const chatbot = require("./chatbot");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the E-Commerce Chatbot! Type 'exit' to quit.");
rl.setPrompt("You: ");
rl.prompt();

rl.on("line", (input) => {
  if (input.toLowerCase() === "exit") {
    console.log("Chatbot: Goodbye! Thank you for using our service.");
    rl.close();
  } else {
    const response = chatbot.getResponse(input);
    console.log(`Chatbot: ${response}`);
    rl.prompt();
  }
});

rl.on("close", () => {
  console.log("Chat session ended.");
  process.exit(0);
});
