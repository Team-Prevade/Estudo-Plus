// src/hooks/useAuth.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth(redirectIfNoToken = true) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      if (redirectIfNoToken) navigate("/");
      setLoading(false);
      return;
    }

    fetch("https://estudamaisapi.onrender.com/auth/me", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Token inválido ou sessão expirada");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        if (redirectIfNoToken) navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, redirectIfNoToken]);

  return { user, loading, setUser };
}
