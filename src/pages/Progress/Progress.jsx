import { apiFetch } from "../../api/http";
import ProgressStepper from "../../components/ProgressStepper";
import Timeline from "../../components/Timeline";
import React, { useState, useEffect } from "react";
import { Tabs, TabItem } from "flowbite-react";
import Comments from "../../components/Comments";
import TimelineDropdown from "../../components/TimelineDropdown";
import { FastForward } from "lucide-react";

const Progress = ({ user }) => {
  const [orientandos, setOrientandos] = useState([]);
  const [selectedOrientando, setSelectedOrientando] = useState(
    user?.userType === "orientando" ? user : null
  );
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const isOrientando = user?.userType === "orientando";

  // Efeito para buscar a lista de orientandos do orientador
  useEffect(() => {
    const getOrientandos = async () => {
      if (user?.userType === "orientador") {
        try {
          const response = await fetch(
            `http://localhost:3001/api/orientacoes?orientador_id=${user.id}`
          );
          if (!response.ok) throw new Error("Erro ao buscar orientandos");
          const dados = await response.json();
          setOrientandos(dados);
          if (dados.length > 0) {
            setSelectedOrientando(dados[0]);
          } else {
            setSelectedOrientando(null);
          }
        } catch (error) {
          console.error("Erro ao buscar orientandos:", error);
          setOrientandos([]);
        }
      }
    };
    getOrientandos();
  }, [user]);

  // Efeito para buscar as tarefas e os comentários do orientando selecionado
  useEffect(() => {
    const fetchData = async () => {
      let orientandoId = isOrientando
        ? user.id
        : selectedOrientando?.orientando_id;

      if (!orientandoId) {
        setTasks([]);
        setComments([]);
        return;
      }
      try {
        // Buscar tarefas
        const tasksResponse = await fetch(
          `http://localhost:3001/api/tasks?orientando_id=${orientandoId}`
        );
        if (!tasksResponse.ok) throw new Error("Erro ao buscar tarefas");
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);

        const commentsResponse = await fetch(
          `http://localhost:3001/api/comments?orientando_id=${orientandoId}`
        );
        if (!commentsResponse.ok) throw new Error("Erro ao buscar comentários");
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setTasks([]);
        setComments([]);
      }
    };

    fetchData();
  }, [isOrientando, selectedOrientando, user]);

  // --- Funções de CRUD para Tarefas ---
  const fetchTasks = async () => {
    let orientandoId = isOrientando
      ? user.id
      : selectedOrientando?.orientando_id;
    if (!orientandoId) return;

    const response = await fetch(
      `http://localhost:3001/api/tasks?orientando_id=${orientandoId}`
    );
    const data = await response.json();
    setTasks(data);
  };

  const onTaskCreate = async (taskData) => {
    let orientandoId = isOrientando
      ? user.id
      : selectedOrientando?.orientando_id;

    const newTask = {
      ...taskData,
      orientando_id: orientandoId,
    };
    await apiFetch("http://localhost:3001/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    fetchTasks();
  };

  const onTaskUpdate = async (oldTask, updatedTaskData) => {
    await fetch(`http://localhost:3001/api/tasks/${oldTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedTaskData,
        id: oldTask.id,
        orientando_id: oldTask.orientando_id,
      }),
    });
    fetchTasks();
  };

  const onTaskDelete = async (taskToDelete) => {
    await fetch(`http://localhost:3001/api/tasks/${taskToDelete.id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  // --- Função para criar comentários ---
  const onCommentCreate = async (newComment) => {
    try {
      const response = await fetch("http://localhost:3001/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newComment,
          isOrientando: isOrientando,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao criar o comentário");
      }

      const createdComment = await response.json();
      setComments((prevComments) => [...prevComments, createdComment]);
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  return (
    <div className="flex overflow-hidden flex-col max-w-7xl w-full bg-white">
      <div className="flex flex-row items-center gap-3 pb-[12px] pt-8 px-16">
        <div className="flex w-[40px] h-[40px] items-center justify-center bg-gradient-to-r rounded-md from-teal-500 via-teal-400 to-teal-200">
          <FastForward className="text-white" size={24} />
        </div>
        <h1 className="text-5xl m-0 self-start text-start font-extrabold bg-gradient-to-r from-cyan-500 to-indigo-600 text-transparent bg-clip-text">
          Progresso
        </h1>
      </div>

      <p className="text-gray-600 py-4 px-16">
        Acompanhe o seu progresso, interaja com seu orientador e faça a entrega
        das tarefas.
      </p>
      <ProgressStepper />
      <div className="self-start px-8 w-full">
        {user?.userType === "orientador" && (
          <div className="flex self-center justify-center">
            <TimelineDropdown
              orientandos={orientandos}
              selectedOrientando={selectedOrientando}
              onSelectOrientando={setSelectedOrientando}
            />
          </div>
        )}
        <Tabs aria-label="Tabs with icons" variant="underline">
          <TabItem active title="Entregas">
            {!selectedOrientando && user?.userType === "orientador" && (
              <div className="flex justify-center my-8">
                <span>Você ainda não tem orientandos.</span>
              </div>
            )}
            <Timeline
              tasks={tasks}
              comments={comments}
              isOrientando={isOrientando}
              subject={
                isOrientando ? user.name : selectedOrientando?.orientando_nome
              }
              onTaskCreate={onTaskCreate}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
              onCommentCreate={onCommentCreate}
            />
          </TabItem>
          <TabItem title="Comentarios">
            <Comments comments={comments} />
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};

export default Progress;
