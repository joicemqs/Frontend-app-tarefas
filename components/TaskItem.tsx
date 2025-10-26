// components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  created_at?: string;
}

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.completed ? '✅' : '⬜'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 16,
  },
});
