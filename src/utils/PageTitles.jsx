export const PageTitles = {
  "/home": "Visão Geral",
  "/horario": "Horário",
  "/biblioteca": "Biblioteca",
  "/aula": "Aulas",
    "/disciplinas": "Disciplinas",
    "/tarefas": "Tarefas",
    "/notas": "Notas e Anotações",
    "/provas": "Provas",
    "/nerdola": "Nerdola - Assistente Virtual"
};
export const getPageTitle = (path) => {
  return PageTitles[path] || "Estudo+";
};