import * as Crypto from "expo-crypto";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import templates from "../../data/templates";
import { PackItem, PackList } from "../../types";
import { getLists, saveLists } from "../../utils/storage";


const uuidv4 = () => Crypto.randomUUID();

export default function NewListScreen() {
  const router = useRouter();
  const { templateId } = useLocalSearchParams<{ templateId?: string }>();

  const [title, setTitle] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  
  useEffect(() => {
    if (!templateId) return;
    setSelectedTemplate(templateId);

    const temp = templates.find((t) => t.id === templateId);
    if (temp && !title) setTitle(temp.title);
  }, [templateId]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Titel saknas", "Ge din packlista ett namn innan du sparar.");
      return;
    }

    const template = templates.find((t) => t.id === selectedTemplate);

    const items: PackItem[] = template
      ? template.items.map((item) =>
          typeof item === "string"
            ? { id: uuidv4(), name: item, packed: false }
            : { ...item, id: uuidv4(), packed: false }
        )
      : [];

    const newList: PackList = {
      id: uuidv4(),
      title,
      items,
      createdAt: new Date().toISOString(),
    };

    const all = await getLists();
    await saveLists([...all, newList]);

    router.replace(`/packlists/${newList.id}`); // gå till listan
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
        placeholder=""
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
});
