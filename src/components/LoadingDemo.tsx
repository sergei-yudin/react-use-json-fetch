import { useState } from "react";
import { usersUrl } from "../config";
import { RequestViewer } from "./RequestViewer";

export function LoadingDemo() {
  const [started, setStarted] = useState(false);

  return (
    <article>
      <h2>Состояние загрузки</h2>
      {started ? (
        <RequestViewer
          title="Запрос выполняется минимум 3 секунды"
          url={usersUrl}
          delay={3_000}
        />
      ) : (
        <button onClick={() => setStarted(true)}>
          Запустить медленный запрос
        </button>
      )}
    </article>
  );
}
