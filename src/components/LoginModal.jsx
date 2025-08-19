import React, { useState, useRef } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Alert,
} from "flowbite-react";

const LoginModal = ({ open, setOpen, login }) => {
  const emailInputRef = useRef(null);

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
          headers: { "Content-Type": "application/json" },
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
    <Modal
      show={open}
      size="md"
      popup
      initialFocus={emailInputRef}
      onClose={() => setOpen(false)}
    >
      <ModalHeader />
      <ModalBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900">
            Login de Usuário
          </h3>

          {erro && <Alert color="failure">{erro}</Alert>}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Seu email" />
            </div>
            <TextInput
              id="email"
              ref={emailInputRef}
              type="email"
              placeholder="nome@ifba.edu.br"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Sua senha" />
            </div>
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Lembre-se de mim</Label>
          </div>

          <div className="w-full">
            <Button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar na conta"}
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default LoginModal;
