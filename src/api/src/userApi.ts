import axios from 'axios';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string; 
}

const mockData = 'https://635017b9df22c2af7b630c3e.mockapi.io/api/v1/users';

// Función para obtener usuarios
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(mockData);
  return response.data;
};

// Función para obtener un usuario
export const fetchUser = async (id: string): Promise<User> => {
  const response = await axios.get<User>(`${mockData}/${id}`);
  return response.data;
};

// Función para crear un nuevo usuario
export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post<User>(mockData, user);
  return response.data;
};

// Función para actualizar un usuario existente
export const updateUser = async (id: string, user: User): Promise<User> => {
  const response = await axios.put<User>(`${mockData}/${id}`, user);
  return response.data;
};

// Función para eliminar un usuario
export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${mockData}/${id}`);
};
