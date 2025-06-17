import AsyncStorage from "@react-native-async-storage/async-storage";
import { PackList } from "../types";

const STORAGE_KEY = "packlists";

export async function getLists(): Promise<PackList[]> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error("Failed to load lists", e);
    return [];
  }
}

export async function saveLists(lists: PackList[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  } catch (e) {
    console.error("Failed to save lists", e);
  }
}
