import React from "react";
import { TaskItemProps } from "@/types/task";

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleCompletion,
  isLoading,
}) => {
  return (
    <div className="flex gap-2 w-full justify-center">
      <div className="flex items-center gap-2 w-[65%] justify-between p-4 bg-[#262626] rounded-lg shadow">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            onChange={() => onToggleCompletion(task.id, task.completed)}
            checked={task.completed}
            disabled={isLoading}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <p
            onClick={() => onEdit(task.id)}
            className={`text-gray-700 cursor-pointer ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </p>
        </div>
        <button
          className="text-gray-500 hover:text-red-500"
          onClick={() => onDelete(task.id)}
        >
          <img
            src="/svgs/delete.svg"
            alt="Delete"
            width={25}
            height={25}
            className="invert-[1]"
          />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
