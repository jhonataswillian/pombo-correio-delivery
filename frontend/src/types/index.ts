// Tipos das entidades da API
export interface Pigeon {
  id: string;
  nickname: string;
  photoUrl?: string;
  averageSpeed: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface Letter {
  id: string;
  content: string;
  recipientName: string;
  recipientAddress: string;
  status: "QUEUED" | "SENT" | "DELIVERED";
  createdAt: string;
  updatedAt: string;
  senderId: string;
  pigeonId: string;
  sender?: Pick<Customer, "id" | "name" | "email">;
  pigeon?: Pick<Pigeon, "id" | "nickname" | "averageSpeed" | "isActive">;
}

// DTOs para criação
export interface CreatePigeonDto {
  nickname: string;
  averageSpeed: number;
  photoUrl?: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  birthDate: string;
  address: string;
}

export interface CreateLetterDto {
  content: string;
  recipientName: string;
  recipientAddress: string;
  senderId: string;
  pigeonId: string;
}

// DTOs para atualização
export interface UpdatePigeonDto {
  nickname?: string;
  averageSpeed?: number;
  photoUrl?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  birthDate?: string;
  address?: string;
}

export interface UpdateLetterStatusDto {
  status: "QUEUED" | "SENT" | "DELIVERED";
}
