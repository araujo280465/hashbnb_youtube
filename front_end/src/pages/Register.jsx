import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../Contexts/UserContext";

const Register = () => {
  const { setUser } = useUserContext(); // Assuming useUserContext is imported from UserContext
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setredirect] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password && name) {
      try {
        const { data: userDoc } = await axios.post("/users", {
          name,
          email,
          password,
        });

        setUser(userDoc); // Set the user state in the parent component
        setredirect(true); // Redirect to home page
      } catch (error) {
        alert(
          `Erro ao fazer cadastro do usuário. Verifique suas credenciais. ${JSON.stringify(error)}`,
        );
      }
    } else {
      alert("Por favor, preencha email, nome e a senha.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex items-center">
      <div className="mx-auto flex w-full max-w-96 flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Faça seu cadastro</h1>
        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full rounded-full border border-gray-300 px-4 py-2"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Registrar
          </button>
        </form>
        <p>
          Já tem um conta?{" "}
          <Link to="/login" className="font-semibold underline">
            Logue aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
