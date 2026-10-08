import { RequestExamples } from "./components/RequestExamples";
import "./App.css";

export default function App() {
  return (
    <main>
      <header>
        <span>Custom React Hook</span>
        <h1>useJsonFetch</h1>
        <p>Универсальная обработка data, loading и error</p>
      </header>
      <RequestExamples />
    </main>
  );
}
