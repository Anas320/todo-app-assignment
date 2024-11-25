export interface Task {
    id: number;
    title: string;
    completed: boolean;
  }
  
export  interface TaskFormProps {
    title: string;
    setTitle: (value: string) => void;
    color: string;
    setColor: (value: string) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
  }
  export interface TaskItemProps {
    task: Task;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleCompletion: (id: number, currentStatus: boolean) => void;
    isLoading: boolean;
  }
  export interface TaskListProps {
    tasks: Task[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onToggleCompletion: (id: number, currentStatus: boolean) => void;
    isLoading: boolean;
  }