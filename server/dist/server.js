"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const ticketRoutes_1 = __importDefault(require("./routes/ticketRoutes"));
const mongoose = __importStar(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Ticket_1 = __importDefault(require("./models/Ticket"));
dotenv_1.default.config();
// Create an instance of express
const app = (0, express_1.default)();
// Define the port the server will run on
const PORT = process.env.PORT;
const DB_CONN_STRING = `${process.env.DB_CONN}${process.env.DB_NAME}${process.env.DB_OPTIONS}`;
// Middleware to parse request body
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/tickets', ticketRoutes_1.default);
// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //res.status(200).send("Hello, World!");
        const ticket = yield Ticket_1.default.create({
            name: "Test",
            description: "Test",
            difficulty: 10,
            assignees: [],
            time_estimate: 10,
            current_status: "Open",
            status_updates: [
                {
                    body: "Open",
                    date_started: "2001-04-22",
                    date_ended: null
                }
            ],
            vulnerability: {
                name: "Test",
                cve_id: "1",
                priority: "High",
                imported_from: "Test"
            },
            comments: ["Test"]
        });
        res.status(200).json(ticket);
        //const user = await User.create({first_name: "Shad", last_name: "Boswell", email: "fakemail@gmail.com", groups: [], tickets: []});
        //res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
// Start the server
mongoose.connect(DB_CONN_STRING)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to DB. Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.log(error);
});
