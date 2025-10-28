// screens/TaskScreen.tsx
import React, { useEffect, useState } from 'react';
import { Modal, View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { fetchTasks, toggleTaskStatus, createTask, updateTask, deleteTask } from '../services/task';
import TaskItem from '../components/TaskItem';
import DateTimePicker from '@react-native-community/datetimepicker';


interface Task {
  id: number;
  title: string;
  is_completed: boolean;
  created_at: string;
}

export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.is_completed) ||
      (filterStatus === 'pending' && !task.is_completed);

    const matchDate =
      !filterDate || new Date(task.created_at) >= filterDate;

    return matchStatus && matchDate;
  });

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

      <View style={styles.dateFilter}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {filterDate ? filterDate.toLocaleDateString() : 'Filtrar por data'}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={filterDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setFilterDate(selectedDate);
            }}
          />
        )}

      </View>

      <View style={styles.filterRow}>
        {['all', 'pending', 'completed'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive,
            ]}
            onPress={() => setFilterStatus(status as 'all' | 'pending' | 'completed')}
          >
            <Text
              style={[
                styles.filterButtonText,
                filterStatus === status && styles.filterButtonTextActive,
              ]}
            >
              {status === 'all' ? 'Todas' : status === 'pending' ? 'Pendentes' : 'Concluídas'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar nova tarefa</Text>
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
            <View style={styles.modalButtons}>
              <Button
                title="Salvar"
                onPress={() => {
                  handleAddTask();
                  setModalVisible(false);
                }}
              />
              <Button
                title="Cancelar"
                color="#888"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>


      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

}

const styles = StyleSheet.create({
  container: { flex: 1, 
    padding: 12, 
    position: 'relative',
    backgroundColor: '#F2E9E4',

  },
  loader: { flex: 1, justifyContent: 'center' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  dateFilter: {
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4A4E69', // azul iOS, pode trocar
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    fontSize: 40,
    color: '#fff',
    lineHeight: 40,
  },
  dateButton: {
    backgroundColor: '#4A4E69',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },

  filterButtonActive: {
    backgroundColor: '#4A4E69',
    borderColor: '#22223B',
  },

  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },

  filterButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },


});
