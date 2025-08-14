import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { CreatePigeonDto, Pigeon } from "../types";

interface PigeonFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePigeonDto) => Promise<void>;
  onUpdate?: (id: string, data: CreatePigeonDto) => Promise<void>;
  editingPigeon?: Pigeon | null;
}

export default function PigeonForm({
  isOpen,
  onClose,
  onSubmit,
  onUpdate,
  editingPigeon,
}: PigeonFormProps) {
  const [formData, setFormData] = useState<CreatePigeonDto>({
    nickname: "",
    averageSpeed: 0,
    photoUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [nicknameError, setNicknameError] = useState("");

  const isEditMode = !!editingPigeon;

  useEffect(() => {
    if (editingPigeon) {
      setFormData({
        nickname: editingPigeon.nickname,
        averageSpeed: editingPigeon.averageSpeed,
        photoUrl: editingPigeon.photoUrl || "",
      });
    } else {
      setFormData({ nickname: "", averageSpeed: 0, photoUrl: "" });
    }

    setNicknameError("");
  }, [editingPigeon]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNicknameError("");

    try {
      const submitData = {
        ...formData,
        photoUrl: formData.photoUrl || undefined,
      };

      if (isEditMode && editingPigeon && onUpdate) {
        await onUpdate(editingPigeon.id, submitData);
      } else {
        await onSubmit(submitData);
      }

      setFormData({ nickname: "", averageSpeed: 0, photoUrl: "" });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar pombo:", error);

      // Tratamento específico de erros
      if (error instanceof Error && "response" in error) {
        const axiosError = error as {
          response: { status: number; data: { message?: string } };
        };

        if (axiosError.response?.status === 409) {
          // Erro de conflito (apelido duplicado)
          const message =
            axiosError.response?.data?.message ||
            "Já existe um pombo com este apelido";
          setNicknameError(message);
        } else if (axiosError.response?.status === 400) {
          // Erro de validação
          const message =
            axiosError.response?.data?.message || "Dados inválidos";
          setNicknameError(message);
        } else {
          // Erro genérico
          setNicknameError("Erro ao salvar pombo. Tente novamente.");
        }
      } else {
        // Erro sem response (rede, etc)
        setNicknameError("Erro de conexão. Verifique sua internet.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ nickname: "", averageSpeed: 0, photoUrl: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Editar Pombo-Correio" : "Novo Pombo-Correio"}
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
            <label className="form-label">Apelido *</label>
            <input
              type="text"
              required
              value={formData.nickname}
              onChange={(e) => {
                setFormData({ ...formData, nickname: e.target.value });
                if (nicknameError) setNicknameError("");
              }}
              className={`form-input ${
                nicknameError ? "border-red-500 focus:ring-red-500" : ""
              }`}
              placeholder="Ex: Flash, Sonic, Thunder..."
            />
            {nicknameError && (
              <p className="mt-1 text-sm text-red-600">{nicknameError}</p>
            )}
          </div>

          <div>
            <label className="form-label">Velocidade Média (km/h) *</label>
            <input
              type="number"
              required
              min="0.1"
              step="0.1"
              value={formData.averageSpeed}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  averageSpeed: Number(e.target.value),
                })
              }
              className="form-input"
              placeholder="Ex: 85.5"
            />
          </div>

          <div>
            <label className="form-label">URL da Foto (opcional)</label>
            <input
              type="url"
              value={formData.photoUrl}
              onChange={(e) =>
                setFormData({ ...formData, photoUrl: e.target.value })
              }
              className="form-input"
              placeholder="https://example.com/foto.jpg"
            />
            {formData.photoUrl && (
              <div className="mt-3 relative">
                <div
                  style={{
                    width: "120px",
                    height: "80px",
                    overflow: "hidden",
                    borderRadius: "0.5rem",
                    border: "2px solid #e5e7eb",
                    backgroundColor: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={formData.photoUrl}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const container = target.parentElement;
                      if (container) {
                        container.innerHTML = `
                          <div style="color: #ef4444; font-size: 0.75rem; text-align: center; padding: 0.5rem;">
                            ❌ URL inválida
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              </div>
            )}
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
                : "Criar Pombo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
