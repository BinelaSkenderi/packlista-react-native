import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListCard from "../components/ListCard";
import { PackList } from "../types";
import { getLists, saveLists } from "../utils/storage";

export default function HomeScreen() {
  const router = useRouter();
  const [lists, setLists] = useState<PackList[]>([]);

  // Läser listor varje gång skärmen fokuseras
  useFocusEffect(
    useCallback(() => {
      (async () => {
        const stored = await getLists();
        setLists(stored);
      })();
    }, [])
  );

  const handleDelete = async (id: string) => {
    const updated = lists.filter((list) => list.id !== id);
    setLists(updated);
    await saveLists(updated);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.newListButton}
        onPress={() => router.push("/packlists/new")}
      >
        <Text style={styles.newListButtonText}>Ny packlista</Text>
      </TouchableOpacity>

      <FlatList
        data={lists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/packlists/${item.id}`)}
            activeOpacity={0.8}
          >
            <ListCard list={item} onDelete={handleDelete} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  newListButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  newListButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
