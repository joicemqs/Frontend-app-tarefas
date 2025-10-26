// components/TaskItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Task {
  id: number;
  title: string;
  is_completed: boolean;
}

interface Props {
  task: Task;
  onToggle: (taskId: number, is_completed: boolean) => void;
}

export default function TaskItem({ task, onToggle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <TouchableOpacity
  onPress={() => {
    onToggle(task.id, task.is_completed ?? false);
  }}
>
  <Text style={styles.icon}>{task.is_completed ? '✅' : '⬜'}</Text>
</TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#acacacff',
  },
  title: {
    fontSize: 16,
  },
  touchArea: {
  padding: 8,
 },
 toggleButton: {
  padding: 8,
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
 },
 icon: {
  fontSize: 20,
  textAlign: 'center',
 }
});
