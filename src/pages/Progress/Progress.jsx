import ProgressStepper from '../../components/ProgressStepper'
import Timeline from '../../components/Timeline'
import React, { useState, useEffect } from 'react'
import { Tabs, TabItem } from 'flowbite-react'
import Comments from '../../components/Comments'
import TimelineDropdown from '../../components/TimelineDropdown'

const Progress = ({ user }) => {
  const [selectedOrientandoEmail, setSelectedOrientandoEmail] = useState(
    user?.userType === 'orientando' ? user.email : null
  );
  const [selectedSubjectEmail, setSelectedSubjectEmail] = useState(selectedOrientandoEmail);
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([
    // ... seus comentários mockados
  ]);
  const isOrientando = user?.userType === 'orientando';

  // Atualiza selectedSubjectEmail quando selectedOrientandoEmail muda
  useEffect(() => {
    if (selectedOrientandoEmail) {
      setSelectedSubjectEmail(selectedOrientandoEmail);
    }
  }, [selectedOrientandoEmail]);

  // Busca as tarefas do backend
  useEffect(() => {
    const getTasks = async () => {
      if (!user) return;
      let email;
      if (user.userType === "orientando") {
        email = user.email;
        setSelectedSubjectEmail(email);
      } else {
        email = selectedSubjectEmail;
      }

      try {
        const response = await fetch(`http://localhost:8000/tasks?orientandoEmail=${encodeURIComponent(email)}`);
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const dados = await response.json();
        setTasks(dados);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        setTasks([]);
      }
    };
    if (selectedSubjectEmail) getTasks();
  }, [user, selectedSubjectEmail]);

  // CRUD de tarefas
  const fetchTasks = async () => {
    let email = selectedSubjectEmail;
    if (user.userType === "orientando") email = user.email;
    const response = await fetch(`http://localhost:8000/tasks?orientandoEmail=${encodeURIComponent(email)}`);
    const data = await response.json();
    setTasks(data);
  };

  const onTaskCreate = async (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now(),
      orientandoEmail: selectedSubjectEmail // ou user.email se for orientando
    };
    await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    fetchTasks();
  };

  const onTaskUpdate = async (oldTask, updatedTaskData) => {
    console.log(oldTask)
    console.log(updatedTaskData)
    await fetch(`http://localhost:8000/tasks/${oldTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...oldTask, ...updatedTaskData })
    });
    fetchTasks();
  };

  const onTaskDelete = async (taskToDelete) => {
    await fetch(`http://localhost:8000/tasks/${taskToDelete.id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };

  return (
    <div className='flex overflow-hidden flex-col max-w-7xl w-full bg-white'>
      <h1 className='text-5xl m-0 self-start text-start font-extrabold text-emerald-500 pt-8 px-16'>Progresso</h1>
      <p className="text-gray-600 py-4 px-16">Acompanhe o seu progresso, interaja com seu orientador e faça a entrega das tarefas.</p>
      <ProgressStepper />
      <div className='self-start px-8 w-full'>
        {user?.userType === "orientador" && (
          <div className="flex self-center justify-center">
            <TimelineDropdown
              user={user}
              onSelectOrientando={(orientando) => setSelectedOrientandoEmail(orientando.email)}
            />
          </div>
        )}
        <Tabs aria-label="Tabs with icons" variant="underline">
          <TabItem active title="Entregas">
            {!selectedSubjectEmail && (
              <div className="flex justify-center">
                <span>Nada a ser mostrado ainda.</span>
              </div>
            )}
            <Timeline
              tasks={tasks}
              comments={comments}
              isOrientando={isOrientando}
              subject={selectedSubjectEmail}
              onTaskCreate={onTaskCreate}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
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
