import { TaskFormProps } from "@/types/task";
import React from "react";

const TaskForm: React.FC<TaskFormProps> = ({
  title,
  setTitle,
  color,
  setColor,
  loading,
  onSubmit,
}) => {
  const colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "brown",
  ];

  return (
    <form
      onSubmit={onSubmit}
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
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Color
          </label>
          <div className="flex gap-3">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-full ${
                  c === color ? "ring-4 ring-white" : ""
                }`}
                style={{ backgroundColor: c }}
                disabled={loading}
              ></button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save ✔"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
