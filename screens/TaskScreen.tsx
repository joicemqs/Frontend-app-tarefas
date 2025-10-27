// screens/TaskScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { fetchTasks, toggleTaskStatus, createTask, updateTask, deleteTask } from '../services/task';
import TaskItem from '../components/TaskItem';


interface Task {
  id: number;
  title: string;
  is_completed: boolean;
}

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');


  const handleToggle = async (taskId: number, is_completed: boolean) => {
    try {
      const updatedTask = await toggleTaskStatus(taskId, is_completed);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, is_completed: updatedTask.is_completed } : task
        )
      );
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
      setError('Erro ao atualizar tarefa');
    }
  };

  const handleAddTask = async () => {
    if (!newTitle.trim()) return;

    try {
      const newTask = await createTask(newTitle, newDescription);
      setTasks((prev) => [...prev, newTask]);
      setNewTitle('');
      setNewDescription('');
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
      setError('Erro ao adicionar tarefa');
    }
  };

  const handleEdit = async (taskId: number, newTitle: string, newDescription: string) => {
    try {
      const updated = await updateTask(taskId, newTitle, newDescription);
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, title: updated.title, description: updated.description } : task
        )
      );
    } catch (err) {
      console.error('Erro ao editar tarefa:', err);
      setError('Erro ao editar tarefa');
    }
  };

  const handleDelete = (taskId: number) => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(taskId);
              setTasks((prev) => prev.filter((t) => t.id !== taskId));
            } catch (err) {
              console.error('Erro ao excluir tarefa:', err);
              setError('Erro ao excluir tarefa');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };



  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError('Erro ao carregar tarefas');
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#000" />;
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nova tarefa:</Text>
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={newTitle}
          onChangeText={setNewTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete}/>
        )}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  taskText: { fontSize: 16 },
  form: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },

});
