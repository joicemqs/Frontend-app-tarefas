import api from './api';

export const fetchTasks = async () => {
  const response = await api.get('/tasks/tasks/');
  return response.data;
};

export const toggleTaskStatus = async (taskId: number, is_completed: boolean) => {
  const response = await api.patch(`/tasks/tasks/${taskId}/`, {
    is_completed: !is_completed,
  });
  return response.data;
};

export const createTask = async (title: string, description: string) => {
  const response = await api.post('/tasks/tasks/', {
    title,
    description,
    is_completed: false,
  });
  return response.data;
};

export const updateTask = async (taskId: number, title: string, description: string) => {
  const response = await api.patch(`/tasks/tasks/${taskId}/`, {
    title,
    description,
  });
  return response.data;
};

export const deleteTask = async (taskId: number) => {
  const response = await api.delete(`/tasks/tasks/${taskId}/`);
  return response.data;
};