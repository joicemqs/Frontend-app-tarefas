import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';

interface Task {
  id: number;
  title: string;
  description?: string;
  is_completed?: boolean;
  created_at: string;
}

interface Props {
  task: Task;
  onToggle: (taskId: number, is_completed: boolean) => void;
  onEdit: (taskId: number, newTitle: string, newDescription: string) => void;
  onDelete: (taskId: number) => void;
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description ?? '');

  console.log('Renderizando TaskItem:', task);

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.TextInput}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Título"
          />
          <TextInput
            style={styles.TextInput}
            value={editedDescription}
            onChangeText={setEditedDescription}
            placeholder="Descrição"
          />
          <View style={styles.row}>
            <TouchableOpacity style={styles.button2} onPress={() => {
                onEdit(task.id, editedTitle, editedDescription);
                setIsEditing(false);
              }}>
              <Text style={styles.text2}>Salvar</Text>
            </TouchableOpacity>

            <View style={{ width: 8 }} />
            <TouchableOpacity style={styles.button2} onPress={() => {
                setEditedTitle(task.title);
                setEditedDescription(task.description ?? '');
                setIsEditing(false);
              }}>
              <Text style={styles.text2}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>

          <View>
            <TouchableOpacity
              onPress={() => onToggle(task.id, task.is_completed ?? false)}
              style={styles.toggleButton}
            >
              <Text style={styles.icon}>{task.is_completed ? '✔' : '    '}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{task.title}</Text>
            {task.description ? (
              <Text style={styles.description}>{task.description}</Text>
            ) : null}
          </View>

          <View style={styles.actions}>

            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
              <Text style={styles.editText}>✒</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(task.id)}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteText}>
                ✖
              </Text>
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
    borderColor: '#4A4E69',
    backgroundColor: '#9a8c9856',
    marginBottom: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22223B'
  },
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
  icon: {
    fontSize: 20,
    color: '#22223B',
    height: 27,
    width: 27,
    textAlign: 'center',
  },
  editButton: {
    padding: 8
  },
  editText: {
    fontSize: 18,
    height: 30,
    width: 30,
    textAlign: 'center',
    color: '#4A4E69',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 18,
    color: '4A4E69',
  },
  button2:{
    height: 45,
    borderRadius: 15,
    backgroundColor: '#22223B',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 12,
  },
  text2: {
    textAlign: 'center',
    color: '#ffffffff',
  },
  TextInput: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 15,
    height: 45,
    borderColor: '#9A8C98'
  },
});
