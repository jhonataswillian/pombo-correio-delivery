import { useState, useEffect } from "react";
import { lettersApi } from "../services/api";
import LetterForm from "../components/LetterForm";
import type { Letter, CreateLetterDto } from "../types";
import Toast from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";
import {
  Plus,
  Clock,
  Send,
  CheckCircle,
  MapPin,
  Users,
  Package,
} from "lucide-react";

export default function LettersPage() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { toasts, showSuccess, showError, removeToast } = useToast();

  useEffect(() => {
    loadLetters();
  }, []);

  const loadLetters = async () => {
    try {
      const response = await lettersApi.getAll();
      setLetters(response.data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  const createLetter = async (data: CreateLetterDto) => {
    try {
      await lettersApi.create(data);
      loadLetters();
      showSuccess("Carta criada com sucesso!");
    } catch {
      showError("Erro ao criar carta");
    }
  };

  const updateStatus = async (id: string, status: "SENT" | "DELIVERED") => {
    try {
      await lettersApi.updateStatus(id, { status });
      loadLetters();
      showSuccess(`Status alterado para ${status.toLowerCase()}!`);
    } catch {
      showError("Erro ao alterar status");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "QUEUED":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "SENT":
        return <Send className="w-4 h-4 text-blue-600" />;
      case "DELIVERED":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🐦 Pombos-Correio
            </h1>
            <p className="text-gray-600 mt-1">Gerencie seus pombos-correio</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
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
        <h1 className="page-title">📮 Cartas</h1>
        <p className="page-subtitle">Gerencie envios e acompanhe entregas</p>
      </div>

      <div className="flex justify-end mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nova Carta</span>
        </button>
      </div>

      {/* Lista de Cartas */}
      <div className="space-y-6">
        {letters.map((letter) => (
          <div key={letter.id} className="gradient-card hover-lift">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                {/* Status e Data */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(letter.status)}
                    <span
                      className={`status-badge status-${letter.status.toLowerCase()}`}
                    >
                      {letter.status === "QUEUED"
                        ? "Na Fila"
                        : letter.status === "SENT"
                        ? "Enviado"
                        : "Entregue"}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(letter.createdAt).toLocaleDateString("pt-BR")}
                  </div>
                </div>

                {/* Destinatário */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    Para: {letter.recipientName}
                  </h3>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-sm text-gray-600">
                      {letter.recipientAddress}
                    </p>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 italic">"{letter.content}"</p>
                </div>

                {/* Remetente e Pombo */}
                <div className="flex flex-col sm:flex-row gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="bg-blue-100 p-1.5 rounded-lg">
                      <Users className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-gray-600">
                      <span className="font-medium">Remetente:</span>{" "}
                      {letter.sender?.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 p-1.5 rounded-lg">
                      <Package className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-gray-600">
                      <span className="font-medium">Pombo:</span>{" "}
                      {letter.pigeon?.nickname}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ações */}
              <div className="flex flex-col space-y-2 min-w-[120px]">
                {letter.status === "QUEUED" && (
                  <button
                    onClick={() => updateStatus(letter.id, "SENT")}
                    className="btn-secondary text-blue-600 hover:bg-blue-50 hover:border-blue-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar</span>
                  </button>
                )}
                {letter.status === "SENT" && (
                  <button
                    onClick={() => updateStatus(letter.id, "DELIVERED")}
                    className="btn-secondary text-green-600 hover:bg-green-50 hover:border-green-200 flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Entregar</span>
                  </button>
                )}
                {letter.status === "DELIVERED" && (
                  <div className="text-center py-2">
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <span className="text-xs text-green-600 font-medium">
                      Entregue
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {letters.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📮</div>
          <div className="text-xl font-semibold text-gray-600 mb-2">
            Nenhuma carta encontrada
          </div>
          <div className="text-gray-500">Envie sua primeira carta</div>
        </div>
      )}

      {/* Modal e Toasts */}
      <LetterForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={createLetter}
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
