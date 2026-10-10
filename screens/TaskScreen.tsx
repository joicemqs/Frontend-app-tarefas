// screens/TaskScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { Modal, View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { fetchTasks, toggleTaskStatus, createTask, updateTask, deleteTask } from '../services/task';
import TaskItem from '../components/TaskItem';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Task } from '../types';
import { showConfirm } from '../utils/alert';


export default function TaskScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadError, setLoadError] = useState(''); // falha ao carregar a lista: mostra tela com "Tentar novamente"
  const [error, setError] = useState(''); // falha numa ação: mostra aviso sem esconder a lista
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const loadTasks = useCallback(async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
      setLoadError('');
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
      setLoadError('Não foi possível carregar suas tarefas.');
    }
  }, []);

  useEffect(() => {
    loadTasks().finally(() => setLoading(false));
  }, [loadTasks]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleRetry = async () => {
    setLoading(true);
    await loadTasks();
    setLoading(false);
  };

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

  const closeModal = () => {
    setModalVisible(false);
    setNewTitle('');
    setNewDescription('');
    setTitleError('');
  };

  const handleAddTask = async () => {
    if (!newTitle.trim()) {
      setTitleError('Informe um título para a tarefa.');
      return;
    }

    try {
      const newTask = await createTask(newTitle.trim(), newDescription);
      // a API ordena da mais recente para a mais antiga, então a nova vai para o topo
      setTasks((prev) => [newTask, ...prev]);
      closeModal();
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
      setTitleError('Não foi possível salvar a tarefa. Tente novamente.');
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
    showConfirm('Excluir tarefa', 'Tem certeza que deseja excluir esta tarefa?', 'Excluir', async () => {
      try {
        await deleteTask(taskId);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
        setError('Erro ao excluir tarefa');
      }
    });
  };

  function isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'completed' && task.is_completed) ||
      (filterStatus === 'pending' && !task.is_completed);

    const matchDate =
      !filterDate ||
      isSameDay(new Date(task.created_at), filterDate);

    return matchStatus && matchDate;
  });

  if (loading) return <ActivityIndicator style={styles.loader} size="large" color="#4A4E69" />;

  if (loadError) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.error}>{loadError}</Text>
        <TouchableOpacity style={styles.button2} onPress={handleRetry}>
          <Text style={styles.text2}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {error ? (
        <TouchableOpacity style={styles.errorBanner} onPress={() => setError('')}>
          <Text style={styles.errorBannerText}>{error} (toque para fechar)</Text>
        </TouchableOpacity>
      ) : null}

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

        {filterDate && (
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setFilterDate(null)}
          >
            <Text style={styles.dateButtonText}>✖</Text>
          </TouchableOpacity>
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
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar nova tarefa</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={newTitle}
              onChangeText={(text) => {
                setNewTitle(text);
                if (titleError) setTitleError('');
              }}
            />
            {titleError ? <Text style={styles.fieldError}>{titleError}</Text> : null}
            <TextInput
              style={styles.input}
              placeholder="Descrição"
              value={newDescription}
              onChangeText={setNewDescription}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button2} onPress={handleAddTask}>
                <Text style={styles.text2}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button2} onPress={closeModal}>
                <Text style={styles.text2}>Cancelar</Text>
              </TouchableOpacity>
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        contentContainerStyle={filteredTasks.length === 0 ? styles.emptyContainer : undefined}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {tasks.length === 0
              ? 'Você ainda não tem tarefas.\nToque no + para criar a primeira!'
              : 'Nenhuma tarefa encontrada com esses filtros.'}
          </Text>
        }
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
  container: {
    flex: 1,
    padding: 12,
    position: 'relative',
    backgroundColor: '#F2E9E4',

  },
  loader: { flex: 1, justifyContent: 'center', backgroundColor: '#F2E9E4' },
  centered: { justifyContent: 'center' },
  error: { color: '#9B2226', textAlign: 'center', marginBottom: 12, fontSize: 16 },
  errorBanner: {
    backgroundColor: '#F8D7DA',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  errorBannerText: { color: '#9B2226', textAlign: 'center' },
  fieldError: { color: '#9B2226', marginTop: -4, marginBottom: 8, marginLeft: 8 },
  emptyContainer: { flexGrow: 1, justifyContent: 'center' },
  emptyText: { textAlign: 'center', color: '#4A4E69', fontSize: 16, lineHeight: 24 },
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
    borderColor: '#4A4E69',
    borderRadius: 17,
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
    flexDirection: 'row',
    gap: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
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
    textAlign: 'center',
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

  button2: {
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
    color: '#F2E9E4',
  },

});
