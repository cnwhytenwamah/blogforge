import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const healthApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getHealthStatus = async () => {
  const response = await healthApi.get("/health");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const getPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post("/posts", postData);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

export default api;