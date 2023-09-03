/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item, BaseItem } from "./item.interface";
import { Items } from './items.interface';

/**
 * Router Definition
 */

// Modular and mountable bundle of route handlers.
// An Express router instance is often referred to as a "mini-app" because it functions as
// a complete middleware and routing system, which is essential for organizing the architecture 
// of your Node.js project into components that you can easily test and re - use.
export const itemsRouter = express.Router();


/**
 * Controller Definitions
 */

// GET items
itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Items = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const item: Item = await ItemService.find(id);

    if (item) {
      res.status(200).send(item);
    }
    res.status(404).send("item not found");
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// POST items
itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const createdItem: Item = await ItemService.create(item);

    res.status(201).json(createdItem);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// PUT items/:id
itemsRouter.post("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const itemUpdate: BaseItem = req.body;
    const existingItem: Item = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      res.status(200).json(updatedItem);
    }

    const createdItem: Item = await ItemService.create(itemUpdate);
    res.status(201).json(createdItem);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});

// DELETE items/:id
itemsRouter.post("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const deleted: boolean = await ItemService.remove(id);

    if (!deleted) {
      res.status(404).send("item not found");
    }

    res.status(204);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
});