import { useJsonFetch } from "../hooks/useJsonFetch";

type Props = {
  title: string;
  url: string;
  delay?: number;
};

export function RequestViewer({ title, url, delay = 0 }: Props) {
  const [data, loading, error] = useJsonFetch<unknown>(url, undefined, delay);

  return (
    <article>
      <h2>{title}</h2>
      {loading && (
        <div className="loading">
          <span />
          Загрузка…
        </div>
      )}
      {error && <div className="error">{error.message}</div>}
      {data !== null && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </article>
  );
}
