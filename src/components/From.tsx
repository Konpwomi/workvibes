import axios from "axios";
import { useState } from "react";

interface FormData {
  title: string;
  description: string;
}

const From = () => {
  const [formData, setFromData] = useState<FormData>({
    title: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/todos", formData);
      setFromData({ title: "", description: "" });
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-xl">
      <div className="border-b border-gray-100 p-6">
        <h2 className="flex items-center text-2xl font-semibold text-gray-800">
          <span className="mr-2">➕</span>
          Add New Todo
        </h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              className="focus:ring-opacity-20 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              name="title"
              value={formData.title}
              placeholder="Enter todo title..."
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              id="description"
              className="focus:ring-opacity-20 w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="text"
              name="description"
              value={formData.description}
              placeholder="Enter todo description..."
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="focus:ring-opacity-50 w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2">➕</span>
              Add Todo
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default From;
