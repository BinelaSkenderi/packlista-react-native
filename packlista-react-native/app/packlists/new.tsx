import { useLocalSearchParams, useRouter } from "expo-router";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import templates from "../../data/templates";
import { PackItem, PackList } from "../../types";
import { getLists, saveLists } from "../../utils/storage";

export default function NewListScreen() {
  const router = useRouter();
  const { templateId } = useLocalSearchParams<{ templateId?: string }>();

  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [items, setItems] = useState<PackItem[]>([]);
  const [newItemText, setNewItemText] = useState("");

  useEffect(() => {
    if (!templateId) return;
    setSelectedTemplate(templateId);

    const temp = templates.find((t) => t.id === templateId);
    if (temp) {
      if (!title) setTitle(temp.title);
      setItems(temp.items.map((item) => ({ ...item, id: nanoid(), packed: false })));
    }
  }, [templateId]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Titel saknas", "Ge din packlista ett namn innan du sparar.");
      return;
    }

    const newList: PackList = {
      id: nanoid(),
      title,
      items,
      createdAt: new Date().toISOString(),
    };

    const all = await getLists();
    await saveLists([...all, newList]);

    router.replace(`/packlists/${newList.id}`);
  };

  const handleAddItem = () => {
    if (!newItemText.trim()) return;

    const newItem: PackItem = {
      id: nanoid(),
      name: newItemText.trim(),
      packed: false,
    };

    setItems([...items, newItem]);
    setNewItemText("");
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New List</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.link}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Formulär */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder="Enter list name"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.templateButton}
        onPress={() => router.push("/templates")}
      >
        <Text style={styles.templateButtonText}>Choose Template</Text>
      </TouchableOpacity>

      {selectedTemplate && (
        <Text style={styles.selectedTemplate}>
          Vald mall: {templates.find((t) => t.id === selectedTemplate)?.title}
        </Text>
      )}

      {/* Add item */}
      <Text style={[styles.label, { marginTop: 30 }]}>Add item</Text>
      <View style={styles.addItemRow}>
        <TextInput
          placeholder="e.g. Toothbrush"
          value={newItemText}
          onChangeText={setNewItemText}
          style={[styles.input, { flex: 1, marginRight: 10 }]}
        />
        <TouchableOpacity onPress={handleAddItem} style={styles.addItemButton}>
          <Text style={{ color: "white", fontWeight: "600" }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Show current items */}
      {items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>• {item.name}</Text>
              <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                <Text style={styles.deleteButton}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

/* ───── Styling ───── */
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold" },
  link: { fontSize: 16, color: "#1e90ff" },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  templateButton: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  templateButtonText: { fontSize: 16, color: "#333" },
  selectedTemplate: { marginTop: 10, color: "#555" },
  addItemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  addItemButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
  deleteButton: {
    fontSize: 18,
  },
});
