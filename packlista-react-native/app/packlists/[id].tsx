import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PackList } from "../../types";
import { getLists, saveLists } from "../../utils/storage";

export default function PackListDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const [list, setList] = useState<PackList | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const all = await getLists();
      const found = all.find((l) => l.id === id) ?? null;
      setList(found);
    })();
  }, [id]);

  // Toggle packed status för ett item
  const togglePacked = async (itemId: string) => {
    if (!list) return;
    const updatedItems = list.items.map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    );
    const updatedList = { ...list, items: updatedItems };
    setList(updatedList);

    // Uppdatera i storage
    const all = await getLists();
    const updatedLists = all.map((l) => (l.id === list.id ? updatedList : l));
    await saveLists(updatedLists);
  };

  if (!list) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Listan hittades inte</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list.title}</Text>
      <Text style={styles.subtitle}>Packade saker:</Text>

      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, item.packed && styles.itemPacked]}
            onPress={() => togglePacked(item.id)}
          >
            <View style={[styles.checkbox, item.packed && styles.checkboxChecked]}>
              {item.packed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={[styles.itemText, item.packed && styles.itemTextPacked]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemPacked: {
    backgroundColor: "#e0f7fa",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  checkmark: {
    color: "white",
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  itemTextPacked: {
    textDecorationLine: "line-through",
    color: "#999",
  },
});
