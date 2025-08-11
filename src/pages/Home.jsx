import { useAuth } from "../hooks/useAuth";
import { SearchBar } from "../components/SearchBar";
import  Saudação  from "../components/Saudacao";
import { Photo } from "../utils/Photo";
import { Aside } from "../components/Aside";
import { Search } from "lucide-react";
import TasksCard from "../components/TasksCard";
import { DicasCard } from "../components/DicasCard";

const Home = () => {
  const aside = true; // Define se o aside deve ser exibido
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Carregando...
      </div>
    );
  }

  return (
    <div
      className={`p-6 gap-6 ${
        aside ? "flex flex-col lg:flex-row" : "flex justify-center"
      }`}
    >
      {/* Coluna principal */}
      <section
        className={`space-y-6 flex flex-col w-full ${
          aside ? "lg:flex-1" : "max-w-4xl"
        }`}
      >
        {/* Saudação */}
        <header className="flex items-center justify-center gap-3">
          <Photo className="w-10 h-10 shrink-0" />
          <Saudação username={user} />
        </header>

        {/* Barra de pesquisa */}
        <div className="rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
          <div className="flex items-center gap-2 p-4 bg-gray-200">
            <Search className="text-gray-600" size={20} />
            <SearchBar />
          </div>
          <hr className="border-t border-gray-300" />
          <div className="p-4 bg-gray-100 text-sm text-gray-700">
            <div className="list-disc pl-5 flex gap-7">
              <span>Meu Perfil</span>
              <span>Disciplinas</span>
            </div>
          </div>
        </div>

        {/* Tarefas */}
        <article className="flex justify-center">
          <TasksCard />
        </article>

        {/* Dicas do dia */}
        <article className="flex justify-center">
          <DicasCard />
        </article>
      </section>

      {/* Aside */}
      {aside && (
        <aside className="w-full lg:max-w-sm">
          <Aside dominio={aside} />
        </aside>
      )}
    </div>
  );
};

export default Home;
