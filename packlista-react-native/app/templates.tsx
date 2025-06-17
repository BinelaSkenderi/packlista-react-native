import { useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import 'react-native-get-random-values';

import templates from "../data/templates";

export default function TemplatesScreen() {
  const router = useRouter();

  const handleSelect = (templateId: string) => {
    // Gå tillbaka till new-skärmen med vald mall
    router.push({
      pathname: "/packlists/new",
      params: { templateId },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Välj en mall</Text>

      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.templateItem}
            onPress={() => handleSelect(item.id)}
          >
            <Text style={styles.templateText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  templateItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  templateText: { fontSize: 16 },
});
