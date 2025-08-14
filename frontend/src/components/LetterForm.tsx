import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreateLetterDto, Customer, Pigeon } from "../types";
import { customersApi, pigeonsApi } from "../services/api";

interface LetterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateLetterDto) => Promise<void>;
}

export default function LetterForm({
  isOpen,
  onClose,
  onSubmit,
}: LetterFormProps) {
  const [formData, setFormData] = useState<CreateLetterDto>({
    content: "",
    recipientName: "",
    recipientAddress: "",
    senderId: "",
    pigeonId: "",
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pigeons, setPigeons] = useState<Pigeon[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const [customersRes, pigeonsRes] = await Promise.all([
        customersApi.getAll(),
        pigeonsApi.getAll(),
      ]);
      setCustomers(customersRes.data);
      setPigeons(pigeonsRes.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        content: "",
        recipientName: "",
        recipientAddress: "",
        senderId: "",
        pigeonId: "",
      });
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao criar carta");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Nova Carta</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Remetente *
            </label>
            <select
              required
              value={formData.senderId}
              onChange={(e) =>
                setFormData({ ...formData, senderId: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o remetente</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pombo *</label>
            <select
              required
              value={formData.pigeonId}
              onChange={(e) =>
                setFormData({ ...formData, pigeonId: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o pombo</option>
              {pigeons.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nickname} ({p.averageSpeed} km/h)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Destinatário *
            </label>
            <input
              required
              value={formData.recipientName}
              onChange={(e) =>
                setFormData({ ...formData, recipientName: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Nome do destinatário"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Endereço de entrega *
            </label>
            <textarea
              required
              rows={2}
              value={formData.recipientAddress}
              onChange={(e) =>
                setFormData({ ...formData, recipientAddress: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Endereço completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Conteúdo da carta *
            </label>
            <textarea
              required
              rows={4}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Escreva sua mensagem..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? "Enviando..." : "Criar Carta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
