import express, { Express } from "express";
import swaggerDocs from "./src/common/swagger";
import UserRoutes from "./src/routes/users.routes";
import EventRoutes from "./src/routes/events.routes";

const port = 8000;

const app: Express = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Instantiate Routes
const userRoutes = new UserRoutes();
const eventRoutes = new EventRoutes();

// Routes
app.use("/api/auth", userRoutes.getRouter());
app.use("/api/events", eventRoutes.getRouter());

// Listen for incoming requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Initialize Swagger docs after configuring routes
swaggerDocs(app, port);