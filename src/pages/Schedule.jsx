import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/Card';

function formatarDataHora(data) {
  const dias = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado'
  ];
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const diaSemana = dias[data.getDay()];
  const hora = String(data.getHours()).padStart(2, '0');
  const minuto = String(data.getMinutes()).padStart(2, '0');
  return `${dia}/${mes}/${ano}, ${diaSemana}, ${hora}:${minuto}`;
}

// Componente para cada disciplina
const DisciplinaCard = ({ nome, horario, provided, snapshot }) => (
  <div
    ref={provided?.innerRef}
    {...provided?.draggableProps}
    {...provided?.dragHandleProps}
    className={`bg-[#f7f7f7] rounded-lg p-4 mb-3 shadow cursor-grab ${
      snapshot?.isDragging ? 'ring-2 ring-[#F6AE2D]' : ''
    }`}
  >
    <div className="font-bold text-[#24242C]">{nome}</div>
    <div className="text-xs text-[#24242C]">{horario}</div>
  </div>
);

const disciplinasCatalogo = [
  { id: "1", nome: "Matemática", horario: "Duração: 2h" },
  { id: "2", nome: "Física", horario: "Duração: 2h" },
  { id: "5", nome: "Química", horario: "Duração: 2h" },
  { id: "6", nome: "Biologia", horario: "Duração: 2h" }
];

const initialSchedule = {
  "Segunda-feira": [],
  "Terça-feira": [],
  "Quarta-feira": [],
  "Quinta-feira": [],
  "Sexta-feira": [],
};

function getAmanhaDisciplinas(schedule) {
  const diasSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];
  const hoje = new Date();
  let amanha = new Date(hoje);
  let diaSemana = hoje.getDay();

  // Se hoje for sexta (5) ou sábado (6), pula para segunda (1)
  if (diaSemana === 5) { // sexta
    amanha.setDate(hoje.getDate() + 3);
  } else if (diaSemana === 6) { // sábado
    amanha.setDate(hoje.getDate() + 2);
  } else {
    amanha.setDate(hoje.getDate() + 1);
  }

  const diaAmanha = diasSemana[amanha.getDay()];
  const disciplinas = schedule[diaAmanha] || [];
  return { diaAmanha, disciplinas };
}

const Schedule = () => {
  const agora = new Date();
  const dataFormatada = formatarDataHora(agora);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [modalVisible, setModalVisible] = useState(false);
  const [dados, setDados] = useState({
  disciplina: '',
  dias: {
    'Segunda-feira': { selected: false, inicio: '', fim: '' },
    'Terça-feira': { selected: false, inicio: '', fim: '' },
    'Quarta-feira': { selected: false, inicio: '', fim: '' },
    'Quinta-feira': { selected: false, inicio: '', fim: '' },
    'Sexta-feira': { selected: false, inicio: '', fim: '' },
    'Sábado': { selected: false, inicio: '', fim: '' },
  }
});

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // Arrastando do catálogo para um dia
    if (source.droppableId === "Disciplinas" && destination.droppableId !== "Disciplinas") {
      const disciplina = disciplinasCatalogo.find(d => d.id === draggableId);
      // Evita duplicatas no mesmo dia
      if (schedule[destination.droppableId]?.some(d => d.nome === disciplina.nome)) {
        alert("Esta disciplina já está neste dia!");
        return;
      }
      // Cria uma nova instância para o dia
      const novaDisciplina = { ...disciplina, uuid: uuidv4() };
      setSchedule({
        ...schedule,
        [destination.droppableId]: [
          ...(schedule[destination.droppableId] || []),
          novaDisciplina
        ]
      });
      return;
    }

    // Arrastando entre dias
    if (source.droppableId !== "Disciplinas" && destination.droppableId !== "Disciplinas") {
      const sourceItems = Array.from(schedule[source.droppableId]);
      const destItems = Array.from(schedule[destination.droppableId] || []);
      const [removed] = sourceItems.splice(source.index, 1);

      // Evita duplicatas no destino (por nome)
      if (destItems.some(d => d.nome === removed.nome)) {
        alert("Esta disciplina já está neste dia!");
        return;
      }

      destItems.splice(destination.index, 0, removed);

      setSchedule({
        ...schedule,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems
      });
    }
  }

  const { diaAmanha, disciplinas: disciplinasAmanha } = getAmanhaDisciplinas(schedule);

  return (
    <div className="min-h-screen">
      <h1 className="text-[#24242C] text-4xl font-bold mb-6">Horário de aulas</h1>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-8 max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#24242C] mb-1">Hoje</h2>
          <p className="text-sm text-[#24242C] mb-1">{dataFormatada}</p>
          <p className="text-[#24242C] ">
            {disciplinasAmanha.length > 0
              ? <>Prepare-se, amanhã (<b>{diaAmanha}</b>) terá {disciplinasAmanha.map(d => d.nome).join(', ')}.</>
              : <>Amanhã (<b>{diaAmanha}</b>) não há disciplinas agendadas.</>
            }
          </p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-none">
            {/* Catálogo de disciplinas */}
            <div className="min-w-[315px] flex-shrink-0">
              <Droppable droppableId="Disciplinas" isDropDisabled>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[120px]"
                  >
                    <div className="mb-3">
                      <span className="bg-[#F6AE2D] text-[#24242C] px-3 py-1 rounded font-semibold text-sm">Disciplinas</span>
                    </div>
                    {disciplinasCatalogo.map((disciplina, i) => (
                      <Draggable key={disciplina.id} draggableId={disciplina.id} index={i}>
                        {(provided, snapshot) => (
                          <DisciplinaCard
                            nome={disciplina.nome}
                            horario={disciplina.horario}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <button className="w-full mt-2 border border-[#33658A] text-[#24242C] rounded-lg py-2 text-sm font-semibold hover:bg-[#eaf1fa] transition" onClick={() => setModalVisible(true)}>
                      + Adicionar disciplina
                    </button>
                  </div>
                )}
              </Droppable>
            </div>
            {/* Colunas dos dias */}
            {Object.keys(schedule).map((key) => (
              <div className="min-w-[315px] flex-shrink-0" key={key}>
                <Droppable droppableId={key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[120px]"
                    >
                      <div className="mb-3">
                        <span className="bg-[#F6AE2D] text-[#24242C] px-3 py-1 rounded font-semibold text-sm">{key}</span>
                      </div>
                      {(schedule[key] || []).map((disciplina, i) => (
                        <Draggable key={disciplina.uuid} draggableId={disciplina.uuid} index={i}>
                          {(provided, snapshot) => (
                            <DisciplinaCard
                              nome={disciplina.nome}
                              horario={disciplina.horario}
                              provided={provided}
                              snapshot={snapshot}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
        <Card
  visible={modalVisible}
    onClose={() => setModalVisible(false)}
    dados={dados}
  onChange={setDados}
  onSubmit={(dados) => console.log('Submeter dados', dados)}
/>
      </div>
    </div>
  )
}

export default Schedule
