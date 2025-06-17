import Checkbox from 'expo-checkbox';
import { Pressable, StyleSheet, Text } from 'react-native';
import 'react-native-get-random-values';

type Props = {
  name: string;
  packed: boolean;
  onToggle: () => void;
  onDelete?: () => void;
};

export default function ListItem({ name, packed, onToggle }: Props) {
  return (
    <Pressable onPress={onToggle} style={styles.container}>
      <Checkbox
        value={packed}
        onValueChange={onToggle}
        color={packed ? '#007AFF' : undefined}
      />
      <Text style={[styles.text, packed && styles.packed]}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    gap: 12,
  },
  text: {
    fontSize: 16,
  },
  packed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});
