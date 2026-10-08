import { missingUrl, usersUrl } from "../config";
import { LoadingDemo } from "./LoadingDemo";
import { RequestViewer } from "./RequestViewer";

export function RequestExamples() {
  return (
    <section>
      <RequestViewer title="Успешный запрос" url={usersUrl} />
      <RequestViewer title="Запрос с ошибкой" url={missingUrl} />
      <LoadingDemo />
    </section>
  );
}
