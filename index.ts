import express, { Express } from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import UserRoutes from "./src/routes/users.routes";
import EventRoutes from "./src/routes/events.routes";
import swaggerDocs from "./swagger.json";

const port = 8000;

const app: Express = express();

//CORS
app.use(cors());

// Middlewares (Lectura y Parseo del Body)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Instantiate Routes
const userRoutes = new UserRoutes();
const eventRoutes = new EventRoutes();

// Routes
app.use("/api/auth", userRoutes.getRouter());
app.use("/api/events", eventRoutes.getRouter());
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerDocs))

// Listen for incoming requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});