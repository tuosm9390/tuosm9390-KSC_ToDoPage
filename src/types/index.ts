interface Board {
  id: string;
  title: string;
  order: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: string;
  title: string;
  description?: string;
  order: number;
  name: string;
  boardId: string;
}

export type { Board, Task };
