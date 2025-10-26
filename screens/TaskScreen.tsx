// screens/TaskScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchTasks, toggleTaskStatus  } from '../services/task';
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


  <FlatList
  data={tasks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
  <TaskItem task={item} onToggle={handleToggle} />
)}
  />
  
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
    <FlatList
  data={tasks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TaskItem task={item} onToggle={handleToggle} />
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
});
