import api from './api';

export const fetchTasks = async () => {
  const response = await api.get('/tasks/tasks/');
  return response.data;
};