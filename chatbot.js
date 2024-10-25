// chatbot.js

const responses = {
    greeting: "Hello! How can I assist you today?",
    orderStatus: "You can check your order status by providing your order ID.",
    returnPolicy: "Our return policy allows you to return items within 30 days of purchase.",
    paymentMethods: "We accept Visa, MasterCard, PayPal, and Apple Pay.",
    goodbye: "Thank you for reaching out! Have a great day!",
    fallback: "I'm sorry, I didn't understand that. Could you please rephrase?"
};

function getResponse(input) {
    input = input.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
        return responses.greeting;
    } else if (input.includes("order status")) {
        return responses.orderStatus;
    } else if (input.includes("return policy")) {
        return responses.returnPolicy;
    } else if (input.includes("payment methods")) {
        return responses.paymentMethods;
    } else if (input.includes("bye") || input.includes("goodbye")) {
        return responses.goodbye;
    } else {
        return responses.fallback;
    }
}

module.exports = { getResponse };
