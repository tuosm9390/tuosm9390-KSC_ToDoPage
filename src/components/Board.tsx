import React, { useState } from "react";
import { Board as BoardType, Task as TaskType } from "../types";
import Task from "./Task";

interface BoardProps {
  board: BoardType;
  onEditBoard: (id: string, newName: string) => void;
  onDeleteBoard: (id: string) => void;
  onChangeBoardOrder: (id: string, newIndex: number) => void;
  onCreateTask: (boardId: string, taskName: string) => void;
  onDeleteTask: (boardId: string, taskId: string) => void;
  onEditTask: (boardId: string, taskId: string, newTaskName: string) => void;
  onChangeTaskOrder: (
    boardId: string,
    taskId: string,
    newIndex: number
  ) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  onEditBoard,
  onDeleteBoard,
  onChangeBoardOrder,
  onCreateTask,
  onDeleteTask,
  onEditTask,
  onChangeTaskOrder,
}) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [boardName, setBoardName] = useState(board.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleCreateTask = () => {
    if (newTaskName.trim()) {
      onCreateTask(board.id, newTaskName);
      setNewTaskName("");
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      onEditBoard(board.id, boardName);
    }
    setIsEditing(!isEditing);
  };

  const handleMoveUp = () => {
    onChangeBoardOrder(board.id, board.order - 1);
  };

  const handleMoveDown = () => {
    onChangeBoardOrder(board.id, board.order + 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-64 h-[fit-content]">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="border rounded p-1 flex-grow"
          />
        ) : (
          <h2 className="text-xl font-bold">{board.name}</h2>
        )}
      </div>
      <div className="mt-4">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="제목을 입력하세요."
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleCreateTask}
          className="mt-2 bg-blue-500 text-white rounded p-2 w-full"
        >
          할 일 추가
        </button>
        <div className="mt-2 flex justify-between">
          <button onClick={handleEdit} className="mr-2 w-1/2 ">
            {isEditing ? "저장" : "수정"}
          </button>
          <button
            onClick={() => onDeleteBoard(board.id)}
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
            앞으로
          </button>
          <button
            onClick={handleMoveDown}
            className="w-1/2 bg-gray-600 hover:bg-gray-800"
          >
            뒤로
          </button>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {board.tasks &&
          board.tasks.map((task: TaskType) => (
            <Task
              key={task.id}
              board={board}
              task={task}
              onDeleteTask={() => onDeleteTask(board.id, task.id)}
              onEditTask={(newTaskName) =>
                onEditTask(board.id, task.id, newTaskName)
              }
              onChangeTaskOrder={onChangeTaskOrder}
            />
          ))}
      </div>
    </div>
  );
};

export default Board;
