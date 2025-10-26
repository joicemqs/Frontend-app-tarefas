// screens/TaskScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchTasks } from '../services/task';
import TaskItem from '../components/TaskItem';


interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  <FlatList
  data={tasks}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <TaskItem task={item} />}
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
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <Text>{item.completed ? '✅' : '⬜'}</Text>
          </View>
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
