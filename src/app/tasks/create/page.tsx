"use client";

import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/navigation";
import Card from "@/components/UI/Card";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const router = useRouter();

  const createTaskMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, color, completed: false }),
      });
      if (!response.ok) throw new Error("Failed to create task");
      return response.json();
    },
    onSuccess: () => {
      router.push("/tasks");
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to create task. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTaskMutation.mutate();
  };

  return (
    <Card title="Create Task">
      <div className="mt-[130px] w-full flex place-content-center">
        <form
          onSubmit={handleSubmit}
          className="w-[65%] p-6 rounded-lg shadow-lg space-y-6"
        >
          <div className="grid gap-11">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Color
              </label>
              <div className="flex gap-3">
                {[
                  "red",
                  "orange",
                  "yellow",
                  "green",
                  "blue",
                  "purple",
                  "pink",
                  "brown",
                ].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full ${
                      c === color ? "ring-4 ring-white" : ""
                    }`}
                    style={{ backgroundColor: c }}
                  ></button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={createTaskMutation.isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600"
            >
              {createTaskMutation.isLoading ? "Saving..." : "Save ✔"}
            </button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default CreateTask;
