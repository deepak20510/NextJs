import axios from "axios";

async function getTodos() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos",
  );
  return response.data;
}

export default async function Todos() {
  const todos = await getTodos();

  return (
    <div>
      {todos.map((todo: Itodo) => (
        <Todo key={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </div>
  );
}

interface Itodo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoProps {
  title: string;
  completed: boolean;
}

function Todo({ title, completed }: TodoProps) {
  return (
    <div>
      {title} {completed ? "done!" : "not done"}
    </div>
  );
}
