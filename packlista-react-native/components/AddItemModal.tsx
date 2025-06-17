import React, { useState } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { PackList } from '../types';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (newList: PackList) => void;
};

export default function AddItemModal({ visible, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    const newList: PackList = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      items: [],
      createdAt: ''
    };
    onSave(newList);
    setTitle('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.label}>New List Title:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Road Trip"
        />
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onClose} color="gray" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 20,
  },
});
