import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [copied, setCopied] = useState(false);
  const [keep, setKeep] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const selects = ['Masculino', 'Feminino', 'Generalizado'];
  const schools = [
    { educationLevel: 'Ensino Primário', schoolClasses: ['1ª Classe', '2ª Classe', '3ª Classe', '4ª Classe', '5ª Classe', '6ª Classe'] },
    { educationLevel: 'Ensino Secundário - 1º Ciclo', schoolClasses: ['7ª Classe', '8ª Classe', '9ª Classe'] },
    { educationLevel: 'Ensino Secundário - 2º Ciclo', schoolClasses: ['10ª Classe', '11ª Classe', '12ª Classe', '13ª Classe'] },
    { educationLevel: 'Ensino Superior', schoolClasses: ['1º Ano Superior', '2º Ano Superior', '3º Ano Superior', '4º Ano Superior'] },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(username);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const generateUsername = () => {
    if (!firstName) return alert("Insira o primeiro nome!");
    const fn = firstName.trim().toLowerCase();
    const ln = lastName?.trim().toLowerCase() || '';
    const rand = () => Math.floor(Math.random() * 900 + 100);
    const options = [
      `${fn}_${ln}`, `${fn}${ln}`, `${ln}${fn}`,
      `${fn}_${ln}${rand()}`, `${ln}_${fn}${rand()}`,
      `${fn}${ln}${rand()}`, `${fn.charAt(0)}${ln.charAt(0)}`,
      `${fn.charAt(0)}${ln}`, `${ln.charAt(0)}${fn}`,
      `${fn}_${ln.charAt(0)}`, `${ln}_${fn.charAt(0)}`,
      `${fn.charAt(0)}${ln.charAt(0)}_${rand()}`,
      `${fn.slice(0, 3)}${ln.slice(0, 3)}`, `${fn}_${rand()}`,
      `${ln}_${rand()}`, `${ln.slice(0, 4)}${rand()}`
    ].filter(Boolean);
    const filtered = options.filter(option => option !== username);
    const nextUsername = filtered[Math.floor(Math.random() * filtered.length)];
    setUsername(nextUsername);
    setKeep(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    if (!username || !gender || !classLevel || !password || password !== confirmPassword) {
      return setMensagem("Preencha todos os campos corretamente e confirme a senha.");
    }

    setLoading(true);

    try {
      const response = await fetch("https://estudamaisapi.onrender.com/auth/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          gender,
          grade: classLevel
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Erro ao registrar");

      setMensagem(data.message); // "Usuário cadastrado com sucesso"
      setFirstName('');
      setLastName('');
      setUsername('');
      setGender('');
      setClassLevel('');
      setPassword('');
      setConfirmPassword('');
      setKeep(false);
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto m-20 p-10 bg-white rounded-md text-[#33658A] shadow-md">
      <h1 className="text-5xl font-bold text-center mb-10">ESTUDO+</h1>

      <form onSubmit={handleSubmit}>
        {/* Nomes */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <label htmlFor="firstName" className="block mb-2 font-semibold">Primeiro nome</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
              type="text" id="firstName" placeholder="Por favor, insira o seu primeiro nome"
              className="w-full h-14 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]" />
          </div>

          <div className="flex-1">
            <label htmlFor="lastName" className="block mb-2 font-semibold">Último nome (opcional)</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)}
              type="text" id="lastName" placeholder="Por favor, insira o seu último nome"
              className="w-full h-14 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]" />
          </div>
        </div>

        {/* Username gerado */}
        <div className="mb-8">
          <label htmlFor="username" className="block mb-2 font-semibold">Nome de utilizador</label>

          <div className="w-full h-12 px-3 py-2 border border-gray-300 rounded-md text-gray-600 flex items-center justify-between">
            {keep && <p className="truncate">{username}</p>}
            {keep && (
              <button onClick={handleCopy} className="ml-4 text-[#33658A]" title="Copiar nome">
                {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
              </button>
            )}
          </div>

          {/* Feedback */}
          {copied && (
            <p className="text-sm text-green-600 mt-2 transition-opacity duration-300">
              Copiado com sucesso!
            </p>
          )}

          <p className="mt-4">
            <button
              type="button"
              onClick={generateUsername}
              className="p-2 bg-[#2F4858] text-white rounded-md hover:bg-[#33658A] transition-colors font-semibold"
            >
              Gerar nome de utilizador
            </button>
          </p>
        </div>


        {/* Gênero */}
        <div className="mb-8">
          <label htmlFor="gender" className="block mb-2 font-semibold">Gênero</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}
            id="gender"
            className="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]"
          >
            <option value="" hidden>Por favor, selecione o gênero</option>
            {selects.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Classe */}
        <div className="mb-8">
          <label htmlFor="classLevel" className="block mb-2 font-semibold">Classe</label>
          <select value={classLevel} onChange={(e) => setClassLevel(e.target.value)}
            id="classLevel"
            className="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]"
          >
            <option value="" hidden>Por favor, selecione a classe</option>
            {schools.map((school) => (
              <optgroup key={school.educationLevel} label={school.educationLevel}>
                {school.schoolClasses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Senha */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <label htmlFor="password" className="block mb-2 font-semibold">Senha</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)}
              type="password" id="password" placeholder="Insira a senha"
              className="w-full h-14 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold">Confirme a senha</label>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              type="password" id="confirmPassword" placeholder="Confirme a senha"
              className="w-full h-14 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]"
            />
          </div>
        </div>

        {mensagem && (
          <p className={`mt-4 text-center font-semibold ${mensagem.includes("sucesso") ? "text-green-600" : "text-red-600"}`}>
            {mensagem}
          </p>
        )}

        <div className="text-center mt-6">
          <button type="submit" disabled={loading}
            className="w-full max-w-xs bg-[#2F4858] text-white p-4 rounded-md hover:bg-[#33658A] transition-colors font-semibold">
            {loading ? "Criando..." : "Criar Perfil"}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center">
        Já tem conta?{' '}
        <a href="/" className="underline font-semibold text-[#2F4858] hover:text-[#33658A]">
          Entrar
        </a>
      </p>
    </section>
  );
}
