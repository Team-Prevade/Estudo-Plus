import { SearchBar } from "../components/SearchBar";
import  Saudação  from "../components/Saudacao";
import { Photo } from "../utils/Photo";
import { Aside } from "../components/Aside";
import { Search } from "lucide-react";
import TasksCard from "../components/TasksCard";
import { DicasCard } from "../components/DicasCard";
const user = JSON.parse(localStorage.getItem("loggedUser"));

const Home = () => {
  const aside = true; // Simula a condição para exibir o Aside

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Coluna principal */}
      <section className="space-y-6 flex flex-col lg:flex-1 w-full max-w-4xl mx-auto">
        {/* Saudação */}
        <header className="flex items-center justify-center gap-3">
          <Photo className={`w-10 h-10 shrink-0`}/>
          <Saudação username={""+""}/>
        </header>
  
        <div className="rounded-lg overflow-hidden border border-gray-300 bg-gray-100">
  {/* Barra de Pesquisa */}
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

        {/* Tarefas Pendentes */}
        <article>
           <div className="flex justify-center ">
      <TasksCard />
    </div>
          </article>
        {/* Dicas do Dia */}
        <article>
          <div className="flex justify-center">
            <DicasCard />
          </div>
        </article>
      </section>

      {/* Aside lateral */}
      <aside className="w-full lg:max-w-sm">
        <Aside dominio={aside} />
      </aside>
    </div>
  );
};

export default Home;
