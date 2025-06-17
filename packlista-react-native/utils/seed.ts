// utils/seed.ts
import { PackList } from "../types";
import { getLists, saveLists } from "./storage";

export async function seedInitialLists() {
  const existing = await getLists();
  if (existing.length > 0) return; // redan data, gör inget

  const exampleLists: PackList[] = [
    {
      id: "1",
      title: "Weekend Gateway",
      items: [{ id: "a", name: "Toothbrush", packed: false }],
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Business Trip",
      items: [{ id: "b", name: "Laptop", packed: false }],
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Trip to Italy 2025",
      items: [{ id: "c", name: "Passport", packed: false }],
      createdAt: new Date().toISOString(),
    },
  ];

  await saveLists(exampleLists);
}
