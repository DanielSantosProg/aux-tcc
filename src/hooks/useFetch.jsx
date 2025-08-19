import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // A função assíncrona para buscar os dados.
    const fetchData = async () => {
      try {
        const res = await fetch(url);

        // Verifica se a resposta não foi bem-sucedida (status 400-599)
        if (!res.ok) {
          throw new Error("Não foi possível buscar os dados para este recurso");
        }

        const data = await res.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        // Pega o erro e o armazena no estado.
        // A mensagem de erro agora será a que definimos acima ou o erro original.
        setIsPending(false);
        setError(err); // Armazena o objeto de erro completo
      }
    };

    // Chama a função de busca
    fetchData();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
