"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import Card from "@/components/UI/Card";
import TaskForm from "@/components/Tasks/TaskForm";
import ErrorMessage from "@/components/UI/ErrorMessage";

const fetchTaskDetails = async (id: string) => {
  const response = await axios.get(`/api/tasks/${id}`);
  return response.data;
};

const updateTaskDetails = async ({
  id,
  title,
  color,
}: {
  id: string;
  title: string;
  color: string;
}) => {
  await axios.put(`/api/tasks/${id}`, { title, color });
};

const EditTask = ({ params }: { params: Promise<{ id: string }> }) => {
  const [taskParams, setTaskParams] = useState<{ id: string } | null>(null);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("red");
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchParams = async () => {
      const unwrappedParams = await params;
      setTaskParams(unwrappedParams);
    };

    fetchParams();
  }, [params]);

  const {
    data: task,
    isLoading: isFetching,
    isError,
  } = useQuery(
    ["task", taskParams?.id],
    () => fetchTaskDetails(taskParams!.id),
    {
      enabled: !!taskParams,
      onSuccess: (data) => {
        setTitle(data.title);
        setColor(data.color);
      },
      onError: () => {
        setError("Failed to fetch task details.");
      },
    }
  );

  const mutation = useMutation(updateTaskDetails, {
    onSuccess: () => {
      queryClient.invalidateQueries(["task", taskParams?.id]);
      router.push("/tasks");
    },
    onError: () => {
      setError("Failed to update the task. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskParams) return;

    mutation.mutate({ id: taskParams.id, title, color });
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ErrorMessage message="Failed to load task details." />;
  }

  return (
    <Card title="Edit Task">
      <div className="mt-[130px] w-full flex place-content-center">
        {error && <ErrorMessage message={error} />}
        <TaskForm
          title={title}
          setTitle={setTitle}
          color={color}
          setColor={setColor}
          loading={mutation.isLoading}
          onSubmit={handleSubmit}
        />
      </div>
    </Card>
  );
};

export default EditTask;
