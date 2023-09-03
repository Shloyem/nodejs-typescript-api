/**
 * Data Model Interfaces
 */

import { Item, BaseItem } from "./item.interface";
import { Items } from "./items.interface";

/**
 * In-Memory Store
 */

let items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};


/**
 * Service Methods
 */

// Returns the whole items store object
export const findAll = async (): Promise<Item[]> => Object.values(items);

// Receives an id parameter that it uses to look up and return a single store element if found
export const find = async (id: number): Promise<Item> => items[id];

// Receives an object of type BaseItem as an argument, providing all the required values to define a new item in the store,
// except the item's id.
export const create = async (newItem: BaseItem): Promise<Item> => {
  // id is the number of milliseconds passed between the current Date and 1 January 1970
  const id = new Date().valueOf();
  items[id] = {
    id,
    ...newItem
  }

  return items[id];
}

// receives the item id property and an itemUpdate object as arguments.
// Uses id to find the item and update it with the properties of itemUpdate.
// return the items or null if the store doesn't have the item.
export const update = async (
  id: number,
  itemUpdate: BaseItem
): Promise<Item | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
}

// Receives an id value as a parameter and uses it to look up an item in the store and to delete it if found.
// Returns true if found item and deleted it, otherwise false
export const remove = async (
  id: number
): Promise<boolean> => {
  const item = await find(id);

  if (!item) {
    return false;
  }

  delete items[id];
  return true;
}
