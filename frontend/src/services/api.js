import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const healthApi = axios.create({
  baseURL: "http://localhost:5000",
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