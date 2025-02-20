import React, { useState } from "react";
import { Board as BoardType, Task as TaskType } from "@/types";

interface TaskProps {
  board: BoardType;
  task: TaskType;
  onDeleteTask: () => void;
  onEditTask: (newTaskName: string) => void;
  onChangeTaskOrder: (
    boardId: string,
    taskId: string,
    newIndex: number
  ) => void;
}

const Task: React.FC<TaskProps> = ({
  board,
  task,
  onDeleteTask,
  onEditTask,
  onChangeTaskOrder,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(task.name);

  // task 이름 수정
  const handleEdit = () => {
    if (isEditing) {
      onEditTask(taskName);
    }
    setIsEditing(!isEditing);
  };

  const handleMoveUp = () => {
    onChangeTaskOrder(board.id, task.id, task.order - 1);
  };

  const handleMoveDown = () => {
    onChangeTaskOrder(board.id, task.id, task.order + 1);
  };

  return (
    <div className="bg-gray-100 rounded p-2 mb-2 flex-col justify-between items-center">
      {isEditing ? (
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="border rounded p-1 flex-grow"
        />
      ) : (
        <span>{task.name}</span>
      )}
      <div className="mt-2 flex justify-between">
        <button onClick={handleEdit} className="mr-2 w-1/2">
          {isEditing ? "저장" : "수정"}
        </button>
        <button
          onClick={onDeleteTask}
          className="w-1/2 bg-red-500 hover:bg-red-700"
        >
          삭제
        </button>
      </div>
      <div className="mt-2 flex justify-between">
        <button
          onClick={handleMoveUp}
          className="mr-2 w-1/2 bg-gray-600 hover:bg-gray-800"
        >
          위로
        </button>
        <button
          onClick={handleMoveDown}
          className="w-1/2 bg-gray-600 hover:bg-gray-800"
        >
          아래로
        </button>
      </div>
    </div>
  );
};

export default Task;
