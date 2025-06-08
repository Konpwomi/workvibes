import { useEffect, useState } from "react";
import axios from "axios";
import From from "./components/From";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/todos");
        setTodo(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log(todo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Work Vibes.
        </h1>

        <div className="mb-8">
          <From />
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Your Todos</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {todo.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-2xl text-gray-400">📝</span>
                  </div>
                  <p className="text-gray-500">
                    No todos found. Add your first todo above!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todo.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:bg-white hover:shadow-md"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mb-3 leading-relaxed text-gray-600">
                            {item.description}
                          </p>
                        </div>
                        <div
                          className={`ml-4 flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                            item.completed
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          <span className="mr-1">
                            {item.completed ? "✅" : "⏳"}
                          </span>
                          {item.completed ? "Done" : "Pending"}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4 border-t border-gray-200 pt-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-1">📅</span>
                          <span className="font-medium">Created:</span>
                          <span className="ml-1">
                            {new Date(item.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">🔄</span>
                          <span className="font-medium">Updated:</span>
                          <span className="ml-1">
                            {new Date(item.updatedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
