import { UserCircle } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle} from "../utils/PageTitles";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation()
  const menuRef = useRef(null);

// Função para alternar o menu
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };
// Fechar o menu ao clicar fora
    useEffect(() => {
        const ClicouFora = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", ClicouFora);
        return () => {
            document.removeEventListener("mousedown", ClicouFora);
        };
    }, []);
    
  return (
    <header className="bg-white shadow px-6 py-3 flex items-center justify-between border-b">
      {/* Logo e Título */}
      <div className="flex items-center">
        <h1 className="text-base text-gray-600 hidden sm:block">{getPageTitle(location.pathname)}</h1>
      </div>

      {/* Ícone do utilizador */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className={`p-1 rounded-full hover:bg-gray-100 focus:outline-none transition ${
            menuOpen ? "bg-gray-100 ring-2 ring-blue-300" : ""
          }`}
        >
          <UserCircle size={28} className="text-gray-700" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-md z-50">
            <div className="p-4 border-b">
              <p className="font-semibold text-gray-800">Erasmo Veloso</p>
              <p className="text-sm text-gray-500">erasmo_veloso</p>
              <p className="text-sm text-gray-500 mt-1">10ª Classe – Informática</p>
            </div>
            <ul className="divide-y text-sm">
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Gerenciar conta
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                  Sair
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
