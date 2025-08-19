import React, { useState } from "react";
import {
  Modal,
  Button,
  Label,
  TextInput,
  Checkbox,
  Spinner,
  Alert,
} from "flowbite-react";

const LoginModal = ({ login }) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setErro(result.message || "Erro ao tentar fazer login.");
        setLoading(false);
        return;
      }

      const { token, user } = result;
      login(user);
      localStorage.setItem("userToken", token);
      setErro(null);
      setOpen(false);
    } catch (err) {
      setErro("Erro de conexão com o servidor. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Entrar</Button>
      <Modal show={open} onClose={() => setOpen(false)} size="md" popup={true}>
        <Modal.Header />
        <Modal.Body>
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Login de Usuário
          </h3>
          {erro && (
            <Alert color="failure" className="mb-4">
              {erro}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" value="Digite seu email" />
              <TextInput
                id="email"
                type="email"
                placeholder="nome@ifba.edu.br"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password" value="Digite sua senha" />
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Lembre-se de mim</Label>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? <Spinner /> : "Entre em sua conta"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
