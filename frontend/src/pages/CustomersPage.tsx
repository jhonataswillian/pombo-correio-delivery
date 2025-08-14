import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Mail, MapPin, Calendar } from "lucide-react";
import { customersApi } from "../services/api";
import CustomerForm from "../components/CustomerForm";
import type { Customer, CreateCustomerDto } from "../types";
import Toast from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const { toasts, showSuccess, showError, removeToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await customersApi.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCustomer = async (data: CreateCustomerDto) => {
    try {
      await customersApi.create(data);
      loadCustomers();
      showSuccess("Cliente criado com sucesso!");
    } catch (error) {
      // Se é erro de validação (409, 400), repassa para o form tratar
      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response: { status: number } };
        if (
          axiosError.response?.status === 409 ||
          axiosError.response?.status === 400
        ) {
          throw error; // Repassa para o form
        }
      }

      // Outros erros (500, rede, etc) trata aqui
      showError("Erro ao criar cliente");
      throw error;
    }
  };

  const updateCustomer = async (id: string, data: CreateCustomerDto) => {
    try {
      await customersApi.update(id, data);
      loadCustomers();
      showSuccess("Cliente atualizado com sucesso!");
    } catch (error) {
      // Se é erro de validação (409, 400), repassa para o form tratar
      if (error instanceof Error && "response" in error) {
        const axiosError = error as { response: { status: number } };
        if (
          axiosError.response?.status === 409 ||
          axiosError.response?.status === 400
        ) {
          throw error; // Repassa para o form
        }
      }

      // Outros erros (500, rede, etc) trata aqui
      showError("Erro ao atualizar cliente");
      throw error;
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleSendLetter = (customer: Customer) => {
    navigate(
      `/letters?customerId=${customer.id}&customerName=${encodeURIComponent(
        customer.name
      )}`
    );
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCustomer(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">👥 Clientes</h1>
            <p className="text-gray-600 mt-1">Gerencie seus clientes</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="flex space-x-2">
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">👥 Clientes</h1>
        <p className="page-subtitle">Gerencie sua base de clientes</p>
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="gradient-card hover-lift">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {customer.name}
                </h3>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="bg-blue-100 p-1.5 rounded-lg">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {customer.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">
                  <span className="font-medium">Nascimento:</span>{" "}
                  {formatDate(customer.birthDate)}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-1.5 rounded-lg mt-0.5">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-600 break-words flex-1">
                  <span className="font-medium">Endereço:</span>
                  <br />
                  {customer.address}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleEditCustomer(customer)}
                className="btn-secondary flex-1 flex items-center justify-center space-x-2"
              >
                <Edit2 className="w-4 h-4" />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleSendLetter(customer)}
                className="btn-secondary flex items-center justify-center space-x-2 text-blue-600 hover:bg-blue-50 hover:border-blue-200"
              >
                <Mail className="w-4 h-4" />
                <span>Enviar Carta</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {customers.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👥</div>
          <div className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum cliente encontrado
          </div>
          <div className="text-gray-500">Adicione seu primeiro cliente</div>
        </div>
      )}

      {/* Modal e Toasts */}
      <CustomerForm
        isOpen={showForm}
        onClose={handleCloseForm}
        onSubmit={createCustomer}
        onUpdate={updateCustomer}
        editingCustomer={editingCustomer}
      />

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
