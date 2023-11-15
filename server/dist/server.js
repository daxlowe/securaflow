"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create an instance of express
const app = (0, express_1.default)();
// Define the port the server will run on
const PORT = process.env.PORT || 3000;
// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
