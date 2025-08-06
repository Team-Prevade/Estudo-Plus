import { BookOpen, X } from 'lucide-react';

const diasSemana = [
  { key: 'Segunda-feira', label: 'SEG' },
  { key: 'Terça-feira', label: 'TER' },
  { key: 'Quarta-feira', label: 'QUA' },
  { key: 'Quinta-feira', label: 'QUI' },
  { key: 'Sexta-feira', label: 'SEX' },
  { key: 'Sábado', label: 'SAB' },
];

export default function Card({ visible, onClose, dados, onChange, onSubmit }) {
  if (!visible) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // Atualiza seleção de dias
  function toggleDia(dia) {
    const selected = dados.dias?.[dia]?.selected;
    onChange({
      ...dados,
      dias: {
        ...dados.dias,
        [dia]: {
          selected: !selected,
          inicio: '',
          fim: '',
        }
      }
    });
  }

  // Atualiza horário de um dia
  function setHorario(dia, campo, valor) {
    onChange({
      ...dados,
      dias: {
        ...dados.dias,
        [dia]: {
          ...dados.dias[dia],
          [campo]: valor
        }
      }
    });
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black/50 fixed top-0 left-0 z-50"
      onClick={handleOverlayClick}
    >
      <section className="w-full max-w-sm sm:min-w-[500px] mx-auto p-4 sm:p-8 bg-white rounded-xl shadow-lg text-[#33658A] text-base sm:text-lg relative">
        <div className="flex justify-end cursor-pointer">
          <X
            className="text-red-500 w-6 h-6 hover:text-red-600 transition-colors duration-300"
            onClick={onClose}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="idis" className="block mb-2 font-medium">
            Disciplina
          </label>
          <input
            id="idis"
            type="text"
            placeholder="Por favor, insira o nome da disciplina"
            className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A] focus:border-transparent"
            value={dados.disciplina}
            onChange={e => onChange({ ...dados, disciplina: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium">Dias da semana</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {diasSemana.map(dia => (
              <button
                type="button"
                key={dia.key}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border transition
                  ${dados.dias?.[dia.key]?.selected
                    ? 'bg-[#F6AE2D] text-white border-[#F6AE2D] scale-110'
                    : 'bg-white text-[#33658A] border-[#33658A] hover:bg-[#eaf1fa]'
                  }`}
                onClick={() => toggleDia(dia.key)}
              >
                {dia.label}
              </button>
            ))}
          </div>
          {/* Campos de horário para dias selecionados */}
          <div className="flex flex-col gap-3 max-h-60 sm:max-h-40 overflow-y-auto">
            {diasSemana.filter(dia => dados.dias?.[dia.key]?.selected).map(dia => (
              <div key={dia.key} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-[#f7f7f7] rounded-md p-2">
                <span className="w-16 font-semibold text-[#33658A]">{dia.label}</span>
                <div className="flex items-center gap-2 w-full">
                  <label className="text-xs text-[#33658A]">Início</label>
                  <input
                    type="time"
                    className="h-10 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A] focus:border-transparent w-full"
                    value={dados.dias[dia.key]?.inicio || ''}
                    onChange={e => setHorario(dia.key, 'inicio', e.target.value)}
                  />
                  <label className="text-xs text-[#33658A]">Fim</label>
                  <input
                    type="time"
                    className="h-10 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A] focus:border-transparent w-full"
                    value={dados.dias[dia.key]?.fim || ''}
                    onChange={e => setHorario(dia.key, 'fim', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="flex items-center gap-3 p-2 cursor-pointer w-full h-12 bg-[#F26419] text-white rounded-md hover:bg-[#C95417] transition-colors duration-300 font-semibold justify-center mt-2"
          onClick={onSubmit}
        >
          <BookOpen className="w-5 h-5" />
          <span>Criar aula</span>
        </button>
      </section>
    </div>
  );
}
