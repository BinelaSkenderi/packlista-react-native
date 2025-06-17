import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PackList } from '../types';

type Props = {
  list: PackList;
  onDelete?: (id: string) => void; // ny prop
};

export default function ListCard({ list, onDelete }: Props) {
  const totalItems = list.items.length;
  const packedItems = list.items.filter((item) => item.packed).length;

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{list.title}</Text>
          <Text style={styles.subtitle}>
            {packedItems} av {totalItems} saker packade
          </Text>
        </View>

        {onDelete && (
          <TouchableOpacity
            onPress={() => onDelete(list.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Radera</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});
