import { Link } from "react-router-dom";
import { Package, Users, Mail, Zap, Star, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="h-[calc(100vh-240px)] flex flex-col">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-12 -mt-6 -mx-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-4">
            <span className="text-4xl mb-2 block animate-bounce">🐦</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">
              Pombo Correio
            </h1>
            <p className="text-base md:text-lg text-blue-100 max-w-xl mx-auto leading-relaxed">
              O sistema de entrega aérea mais inovador do Sr. Moraes Moreira.
              Gerencie pombos, clientes e cartas com elegância e eficiência.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/letters" className="btn-primary text-sm px-5 py-2.5">
              <Mail className="w-4 h-4 mr-2" />
              Enviar Carta
            </Link>
            <Link
              to="/pigeons"
              className="btn-secondary bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              <Package className="w-4 h-4 mr-2" />
              Ver Pombos
            </Link>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-5xl mx-auto px-4 -mt-6 relative z-10 flex flex-col">
        {/* Cards de navegação */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 flex-shrink-0">
          <Link
            to="/pigeons"
            className="gradient-card hover-lift group p-4 text-center"
          >
            <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Pombos-Correio
            </h3>
            <p className="text-gray-600 text-xs mb-2">
              Gerencie seus pombos-correio, velocidades e aposentadorias
            </p>
            <div className="flex items-center justify-center text-blue-600 font-semibold text-xs">
              Gerenciar <TrendingUp className="w-3 h-3 ml-1" />
            </div>
          </Link>

          <Link
            to="/customers"
            className="gradient-card hover-lift group p-4 text-center"
          >
            <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Clientes</h3>
            <p className="text-gray-600 text-xs mb-2">
              Cadastre e gerencie informações dos seus clientes
            </p>
            <div className="flex items-center justify-center text-green-600 font-semibold text-xs">
              Cadastrar <Star className="w-3 h-3 ml-1" />
            </div>
          </Link>

          <Link
            to="/letters"
            className="gradient-card hover-lift group p-4 text-center"
          >
            <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Cartas</h3>
            <p className="text-gray-600 text-xs mb-2">
              Envie cartas e acompanhe o status das entregas
            </p>
            <div className="flex items-center justify-center text-purple-600 font-semibold text-xs">
              Enviar <Zap className="w-3 h-3 ml-1" />
            </div>
          </Link>
        </div>

        {/* Stats compactas */}
        <div className="gradient-card p-4 flex-shrink-0">
          <h2 className="text-lg font-bold text-center text-gray-900 mb-4">
            Estatísticas do Sistema
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                3
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Pombos Ativos
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                2
              </div>
              <div className="text-xs text-gray-600 font-medium">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                5
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Cartas Enviadas
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                2
              </div>
              <div className="text-xs text-gray-600 font-medium">Entregues</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
