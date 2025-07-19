import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Contexts/UserContext";

const Login = () => {
  const { user, setUser } = useUserContext(); // Access user context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      try {
        const { data: userDoc } = await axios.post("/users/login", {
          email,
          password,
        });

        setUser(userDoc); // Set the user state in the parent component
        setredirect(true); // Redirect to home page
      } catch (error) {
        alert(
          `Erro ao fazer login. Verifique suas credenciais. ${error.response.data}`,
        );
      }
    } else {
      alert("Por favor, preencha email e senha.");
    }
  };

  if (redirect || user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu login</h1>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-primary-400 hover:bg-primary-500 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 font-bold text-white">
            Login
          </button>
        </form>
        <p>
          Ainda não tem conta?{" "}
          <Link to="/register" className="font-semibold underline">
            Registre-se aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
