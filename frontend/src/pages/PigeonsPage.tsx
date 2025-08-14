import { useState, useEffect } from "react";
import type { Pigeon, CreatePigeonDto } from "../types";
import { pigeonsApi } from "../services/api";
import PigeonForm from "../components/PigeonForm";
import Toast from "../components/ui/Toast";
import { useToast } from "../hooks/useToast";
import { Plus, Edit2, UserX, Zap } from "lucide-react";

export default function PigeonsPage() {
  const [pigeons, setPigeons] = useState<Pigeon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRetired, setShowRetired] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingPigeon, setEditingPigeon] = useState<Pigeon | null>(null);
  const { toasts, showSuccess, showError, removeToast } = useToast();

  useEffect(() => {
    loadPigeons();
  }, [showRetired]);

  const loadPigeons = async () => {
    try {
      setLoading(true);
      const response = showRetired
        ? await pigeonsApi.getAllIncludingRetired()
        : await pigeonsApi.getAll();
      setPigeons(response.data);
    } catch (error) {
      console.error("Erro ao carregar pombos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPigeon = async (data: CreatePigeonDto) => {
    try {
      await pigeonsApi.create(data);
      loadPigeons();
      showSuccess("Pombo criado com sucesso!");
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
      showError("Erro ao criar pombo");
      throw error;
    }
  };

  const updatePigeon = async (id: string, data: CreatePigeonDto) => {
    try {
      await pigeonsApi.update(id, data);
      loadPigeons();
      showSuccess("Pombo atualizado com sucesso!");
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
      showError("Erro ao atualizar pombo");
      throw error;
    }
  };

  const handleEditPigeon = (pigeon: Pigeon) => {
    setEditingPigeon(pigeon);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPigeon(null);
  };

  const retirePigeon = async (id: string) => {
    if (confirm("Tem certeza?")) {
      try {
        await pigeonsApi.retire(id);
        loadPigeons();
        showSuccess("Pombo aposentado com sucesso!");
      } catch {
        showError("Erro ao aposentar pombo");
      }
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
        <h1 className="page-title">🐦 Pombos-Correio</h1>
        <p className="page-subtitle">Gerencie sua frota de pombos-correio</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Filtros */}
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showRetired}
            onChange={(e) => setShowRetired(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Mostrar aposentados
          </span>
        </label>

        {/* Botão Novo */}
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Novo Pombo</span>
        </button>
      </div>

      {/* Lista de Pombos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pigeons.map((pigeon) => (
          <div
            key={pigeon.id}
            className="gradient-card hover-lift"
            style={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header com avatar + título e status */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start space-x-3 flex-1">
                {/* Avatar de perfil */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    border: "2px solid #e5e7eb",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {pigeon.photoUrl ? (
                    <img
                      src={pigeon.photoUrl}
                      alt={pigeon.nickname}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const container = target.parentElement;
                        if (container) {
                          container.innerHTML = `
                            <span style="font-size: 1.25rem; color: #94a3b8;">🐦</span>
                          `;
                        }
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "1.25rem", color: "#94a3b8" }}>
                      🐦
                    </span>
                  )}
                </div>

                {/* Informações do pombo */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {pigeon.nickname}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      {pigeon.averageSpeed} km/h
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={`status-badge ${
                  pigeon.isActive ? "status-active" : "status-retired"
                }`}
              >
                {pigeon.isActive ? "Ativo" : "Aposentado"}
              </span>
            </div>

            {/* Conteúdo flexível */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {/* Botões sempre no bottom */}
              <div className="flex space-x-3" style={{ marginTop: "auto" }}>
                <button
                  onClick={() => handleEditPigeon(pigeon)}
                  className="btn-secondary flex-1 flex items-center justify-center space-x-2"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                {pigeon.isActive && (
                  <button
                    onClick={() => retirePigeon(pigeon.id)}
                    className="btn-secondary flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 hover:border-red-200"
                  >
                    <UserX className="w-4 h-4" />
                    <span>Aposentar</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {pigeons.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🐦</div>
          <div className="text-xl font-semibold text-gray-600 mb-2">
            Nenhum pombo encontrado
          </div>
          <div className="text-gray-500">
            Adicione seu primeiro pombo-correio
          </div>
        </div>
      )}

      {/* Modal e Toasts */}
      <PigeonForm
        isOpen={showForm}
        onClose={handleCloseForm}
        onSubmit={createPigeon}
        onUpdate={updatePigeon}
        editingPigeon={editingPigeon}
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
