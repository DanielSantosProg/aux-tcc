import React, { useState } from "react";
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Alert,
  TabItem,
  Tabs,
} from "flowbite-react";

const ConfigModal = ({ open, setOpen, user }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [nome, setNome] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [qtdOrientacoes, setQtdOrientacoes] = useState(
    user?.qtd_orientandos || ""
  );
  const [maxOrientacoes, setMaxOrientacoes] = useState(
    user?.max_orientandos || ""
  );
  const [formacao, setFormacao] = useState(user?.formacao || "");
  const [areaAtuacao, setAreaAtuacao] = useState(user?.area_atuacao || "");
  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setSucesso(null);

    if (activeTab === 0 && password !== confirmPassword) {
      setErro("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    let url;
    let body;
    const userId = user.id;

    if (activeTab === 0) {
      url = `${import.meta.env.VITE_API_BASE}/api/users/config`;
      // Só envia password se preenchido
      if (password) {
        body = { userId, nome, password };
      } else {
        body = { userId, nome };
      }
    } else if (activeTab === 1) {
      url = `${import.meta.env.VITE_API_BASE}/api/users/config/orientador`;
      body = { userId, qtdOrientacoes, maxOrientacoes, formacao, areaAtuacao };
    } else {
      setErro("Aba inválida.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) {
        setErro(
          result.message || "Erro ao alterar as configurações de usuário."
        );
        setLoading(false);
        return;
      }

      setErro(null);
      setSucesso("Configurações atualizadas com sucesso!");
      // Limpa senha após sucesso e fecha modal após 2 segundos
      setTimeout(() => {
        setSucesso(null);
        setPassword("");
        setConfirmPassword("");
        setOpen(false);
      }, 2000);
    } catch (err) {
      setErro("Erro de conexão com o servidor. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <Modal show={open} size="lg" popup onClose={() => setOpen(false)}>
      <ModalHeader className="justify-center mx-4 mt-4 text-lg font-semibold text-gray-700">
        Configurações de Usuário
      </ModalHeader>
      <ModalBody>
        {erro && <Alert color="failure">{erro}</Alert>}
        {sucesso && <Alert color="success">{sucesso}</Alert>}

        <Tabs
          aria-label="Tabs de Configurações"
          variant="underline"
          onActiveTabChange={(tabIndex) => setActiveTab(tabIndex)}
        >
          {/* Aba Gerais */}
          <TabItem active title="Gerais">
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="nome"
                  className="text-sm font-semibold text-gray-700"
                >
                  Nome de Usuário
                </Label>
                <TextInput
                  id="nome"
                  type="text"
                  placeholder="Digite o nome de usuário"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Sua senha
                </Label>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-gray-700"
                >
                  Confirme sua senha
                </Label>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="w-full pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  {loading ? "Enviando..." : "Confirmar alterações"}
                </Button>
              </div>
            </form>
          </TabItem>

          {/* Aba Orientador */}
          {user.userType === "orientador" && (
            <TabItem title="Orientador">
              <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="qtdOrientacoes"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Quantidade de Orientações
                  </Label>
                  <TextInput
                    id="qtdOrientacoes"
                    type="number"
                    value={qtdOrientacoes}
                    onChange={(e) => setQtdOrientacoes(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="maxOrientacoes"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Máximo de Orientações
                  </Label>
                  <TextInput
                    id="maxOrientacoes"
                    type="number"
                    value={maxOrientacoes}
                    onChange={(e) => setMaxOrientacoes(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="formacao"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Formação
                  </Label>
                  <TextInput
                    id="formacao"
                    type="text"
                    value={formacao}
                    onChange={(e) => setFormacao(e.target.value)}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <Label
                    htmlFor="areaAtuacao"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Área de Atuação
                  </Label>
                  <TextInput
                    id="areaAtuacao"
                    type="text"
                    value={areaAtuacao}
                    onChange={(e) => setAreaAtuacao(e.target.value)}
                  />
                </div>

                <div className="w-full pt-2">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                  >
                    {loading ? "Enviando..." : "Confirmar alterações"}
                  </Button>
                </div>
              </form>
            </TabItem>
          )}
        </Tabs>
      </ModalBody>
    </Modal>
  );
};

export default ConfigModal;
