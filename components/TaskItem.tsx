import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';

interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed?: boolean;
}

interface Props {
  task: Task;
  onToggle: (taskId: number, is_completed: boolean) => void;
  onEdit: (taskId: number, newTitle: string, newDescription: string) => void;
}

export default function TaskItem({ task, onToggle, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description ?? '');

  console.log('Renderizando TaskItem:', task);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Título"
          />
          <TextInput
            style={styles.input}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Descrição"
          />
          <View style={styles.row}>
            <Button
              title="Salvar"
              onPress={() => {
                onEdit(task.id, editedTitle, editedDescription);
                setIsEditing(false);
              }}
            />
            <View style={{ width: 8 }} />
            <Button
              title="Cancelar"
              color="#888"
              onPress={() => {
                setEditedTitle(task.title);
                setEditedDescription(task.description ?? '');
                setIsEditing(false);
              }}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{task.title}</Text>
            {task.description ? (
              <Text style={styles.description}>{task.description}</Text>
            ) : null}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => onToggle(task.id, task.is_completed ?? false)}
              style={styles.toggleButton}
            >
              <Text style={styles.icon}>{task.is_completed ? '✅' : '⬜'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
              <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: { fontSize: 16, fontWeight: '600' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  actions: { flexDirection: 'row', alignItems: 'center' },
  toggleButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 8,
  },
  icon: { fontSize: 20 },
  editButton: { padding: 8 },
  editText: { fontSize: 18 },
});
