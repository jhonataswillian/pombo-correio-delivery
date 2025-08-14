import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreateCustomerDto, Customer } from "../types";

interface CustomerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCustomerDto) => Promise<void>;
  onUpdate?: (id: string, data: CreateCustomerDto) => Promise<void>;
  editingCustomer?: Customer | null;
}

export default function CustomerForm({
  isOpen,
  onClose,
  onSubmit,
  onUpdate,
  editingCustomer,
}: CustomerFormProps) {
  const [formData, setFormData] = useState<CreateCustomerDto>({
    name: "",
    email: "",
    birthDate: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isEditMode = !!editingCustomer;

  useEffect(() => {
    if (editingCustomer) {
      const formattedDate = editingCustomer.birthDate.substring(0, 10);

      setFormData({
        name: editingCustomer.name,
        email: editingCustomer.email,
        birthDate: formattedDate,
        address: editingCustomer.address,
      });
    } else {
      setFormData({ name: "", email: "", birthDate: "", address: "" });
    }

    setEmailError("");
  }, [editingCustomer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailError("");

    try {
      if (isEditMode && editingCustomer && onUpdate) {
        await onUpdate(editingCustomer.id, formData);
      } else {
        await onSubmit(formData);
      }

      setFormData({ name: "", email: "", birthDate: "", address: "" });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);

      // Tratamento específico de erros
      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response: { status: number; data: { message?: string } };
        };

        if (axiosError.response?.status === 409) {
          // Erro de conflito (email duplicado)
          const message =
            axiosError.response?.data?.message ||
            "Já existe um cliente com este email";
          setEmailError(message);
        } else if (axiosError.response?.status === 400) {
          // Erro de validação
          const message =
            axiosError.response?.data?.message || "Dados inválidos";
          setEmailError(message);
        } else {
          // Erro genérico
          setEmailError("Erro ao salvar cliente. Tente novamente.");
        }
      } else {
        // Erro sem response (rede, etc)
        setEmailError("Erro de conexão. Verifique sua internet.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", birthDate: "", address: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Editar Cliente" : "Novo Cliente"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Nome Completo *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="form-input"
              placeholder="Ex: João da Silva"
            />
          </div>

          <div>
            <label className="form-label">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                // Limpa erro quando usuário digita
                if (emailError) setEmailError("");
              }}
              className={`form-input ${
                emailError ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="joao@email.com"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <div>
            <label className="form-label">Data de Nascimento *</label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Endereço Completo *</label>
            <textarea
              required
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="form-input resize-none"
              placeholder="Rua, número, bairro, cidade, estado"
            />
          </div>

          <div className="flex space-x-3 pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary flex-1"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
              disabled={loading}
            >
              {loading
                ? isEditMode
                  ? "Salvando..."
                  : "Criando..."
                : isEditMode
                ? "Salvar Alterações"
                : "Criar Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
