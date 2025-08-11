import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://estudamaisapi.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: inputName,
          password: inputPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Falha no login");
      }

      // Salva o token no localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redireciona para a página inicial
      navigate("/home");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-[#33658A] text-lg">
      <h1 className="text-4xl font-bold text-center mb-10">ESTUDO+</h1>

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label htmlFor="iname" className="block mb-2 font-medium">
            Nome de utilizador
          </label>
          <input
            id="iname"
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Insira o seu nome"
            className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="ipassword" className="block mb-2 font-medium">
            Senha
          </label>
          <input
            id="ipassword"
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Insira a sua senha"
            className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33658A]"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 font-semibold">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer w-full h-12 bg-[#2F4858] text-white rounded-md hover:bg-[#33658A] transition-colors duration-300 font-semibold"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm">
        <p>
          Ainda não tem conta?{" "}
          <a href="/register" className="underline font-bold">
            Criar Perfil
          </a>
        </p>
      </div>
    </section>
  );
}
