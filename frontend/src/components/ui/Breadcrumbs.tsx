import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbNames: Record<string, string> = {
    pigeons: "Pombos",
    customers: "Clientes",
    letters: "Cartas",
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link
        to="/"
        className="flex items-center space-x-1 hover:text-gray-900 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Início</span>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={name} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {breadcrumbNames[name] || name}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="hover:text-gray-900 transition-colors"
              >
                {breadcrumbNames[name] || name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
