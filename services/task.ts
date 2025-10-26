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