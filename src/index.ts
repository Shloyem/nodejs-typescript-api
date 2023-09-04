/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

// Invoke the itemsRouter middleware functions whenever the api/menu/items route path is requested
app.use("/api/menu/items", itemsRouter);

// Study purposes note: application can't reach any routes you define after mounting the errorHandler middleware function 
// because you close the request-response cycle within errorHandler by sending a response to the client.
// You must mount the errorHandler middleware function after you have mounted all the controller functions of your application.
app.use(errorHandler);
// Catch-all handler
app.use(notFoundHandler);


/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})