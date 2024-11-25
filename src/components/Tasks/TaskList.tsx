import React from "react";
import { Task, TaskListProps } from "@/types/task";
import TaskItem from "./TaskItem";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleCompletion,
  isLoading,
}) => {
  return (
    <div className="flex gap-3 flex-col mt-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleCompletion={onToggleCompletion}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};

export default TaskList;
