// screens/TaskScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchTasks } from '../services/task';
import TaskItem from '../components/TaskItem';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  created_at?: string;
}

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        console.log('Tarefas recebidas:', data); // 👈 Verifique no console
        setTasks(data); // ou setTasks(data.results) se for paginado
      } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
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
        renderItem={({ item }) => <TaskItem task={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loader: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
