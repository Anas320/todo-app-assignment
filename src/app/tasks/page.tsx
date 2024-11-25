"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import Card from "@/components/UI/Card";
import NoData from "@/components/UI/NoData";
import { Task } from "@/types/task";
import TaskList from "@/components/Tasks/TaskList";

const HomePage: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery<Task[]>("tasks", {
    queryFn: async () => {
      const response = await fetch("/api/tasks");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete task");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const toggleCompletionMutation = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) throw new Error("Failed to toggle task completion");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });

  const handleEdit = (id: number) => router.push(`/tasks/edit/${id}`);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleCompletion = (id: number, currentStatus: boolean) => {
    toggleCompletionMutation.mutate({ id, completed: !currentStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tasks</div>;

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <Card title="Create Task" task={tasks.length} completed={completedTasks}>
      {tasks.length === 0 ? (
        <NoData />
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleCompletion={handleToggleCompletion}
          isLoading={
            deleteMutation.isLoading || toggleCompletionMutation.isLoading
          }
        />
      )}
    </Card>
  );
};

export default HomePage;
