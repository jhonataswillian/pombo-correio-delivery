import axios from "axios";
import type {
  Pigeon,
  Customer,
  Letter,
  CreatePigeonDto,
  CreateCustomerDto,
  CreateLetterDto,
  UpdateLetterStatusDto,
} from "../types";

// Configuração base do axios
const api = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Serviços para Pombos
export const pigeonsApi = {
  getAll: () => api.get<Pigeon[]>("/pigeons"),
  getAllIncludingRetired: () => api.get<Pigeon[]>("/pigeons/all"),
  getById: (id: string) => api.get<Pigeon>(`/pigeons/${id}`),
  create: (data: CreatePigeonDto) => api.post<Pigeon>("/pigeons", data),
  update: (id: string, data: Partial<CreatePigeonDto>) =>
    api.patch<Pigeon>(`/pigeons/${id}`, data),
  retire: (id: string) => api.patch(`/pigeons/${id}/retire`),
};

// Serviços para Clientes
export const customersApi = {
  getAll: () => api.get<Customer[]>("/customers"),
  getById: (id: string) => api.get<Customer>(`/customers/${id}`),
  create: (data: CreateCustomerDto) => api.post<Customer>("/customers", data),
  update: (id: string, data: Partial<CreateCustomerDto>) =>
    api.patch<Customer>(`/customers/${id}`, data),
};

// Serviços para Cartas
export const lettersApi = {
  getAll: () => api.get<Letter[]>("/letters"),
  getById: (id: string) => api.get<Letter>(`/letters/${id}`),
  getByStatus: (status: "QUEUED" | "SENT" | "DELIVERED") =>
    api.get<Letter[]>(`/letters/status/${status}`),
  create: (data: CreateLetterDto) => api.post<Letter>("/letters", data),
  updateStatus: (id: string, data: UpdateLetterStatusDto) =>
    api.patch(`/letters/${id}/status`, data),
};

export default api;
