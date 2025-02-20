import { useEffect, useState } from "react";
import Board from "../components/Board";
import { loadFromStorage, saveToStorage } from "../utils/storage";
import { Board as BoardType } from "../types";
// 식별자 id 사용
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [newBoardName, setNewBoardName] = useState("");

  useEffect(() => {
    const storedBoards = loadFromStorage("boards");
    if (storedBoards) {
      setBoards(storedBoards);
    }
  }, []);

  useEffect(() => {
    saveToStorage("boards", boards);
  }, [boards]);

  // board 함수
  const handleCreateBoard = () => {
    if (newBoardName.trim()) {
      const newBoard: BoardType = {
        id: uuidv4(),
        name: newBoardName,
        tasks: [],
        title: newBoardName,
        order: boards.length,
      };
      setBoards([...boards, newBoard]);
      setNewBoardName("");
    }
  };

  const handleEditBoard = (id: string, newName: string) => {
    setBoards(
      boards.map((board) =>
        board.id === id ? { ...board, name: newName } : board
      )
    );
  };

  const handleDeleteBoard = (id: string) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  const handleChangeBoardOrder = (id: string, newIndex: number) => {
    const board = boards.find((board) => board.id === id);
    if (!board || newIndex < 0 || newIndex >= boards.length) return;

    const updatedBoards = boards.filter((board) => board.id !== id);
    updatedBoards.splice(newIndex, 0, board);

    setBoards(updatedBoards.map((board, order) => ({ ...board, order })));
  };

  // task 함수
  const handleCreateTask = (boardId: string, taskName: string) => {
    setBoards(
      boards.map((board) =>
        // boardId와 같은 board의 tasks에 새로운 task 추가
        board.id === boardId
          ? {
              ...board,
              tasks: [
                ...board.tasks,
                {
                  id: uuidv4(),
                  name: taskName,
                  title: "",
                  order: board.tasks.length,
                  boardId: boardId,
                },
              ],
            }
          : // boardId와 다른 board는 그대로
            board
      )
    );
  };

  const handleDeleteTask = (boardId: string, taskId: string) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks
                .filter((task) => task.id !== taskId)
                .map((task, index) => ({ ...task, order: index })),
            }
          : board
      )
    );
  };

  const handleEditTask = (
    boardId: string,
    taskId: string,
    newTaskName: string
  ) => {
    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map((task) =>
                task.id === taskId ? { ...task, name: newTaskName } : task
              ),
            }
          : board
      )
    );
  };

  const handleChangeTaskOrder = (
    boardId: string,
    taskId: string,
    newIndex: number
  ) => {
    const board = boards.find((board) => board.id === boardId);
    if (!board) return;

    const task = board.tasks.find((task) => task.id === taskId);
    if (!task || newIndex < 0 || newIndex >= board.tasks.length) return;

    const updatedTasks = board.tasks.filter((task) => task.id !== taskId);
    updatedTasks.splice(newIndex, 0, task);

    setBoards(
      boards.map((board) =>
        board.id === boardId
          ? {
              ...board,
              tasks: updatedTasks.map((task, order) => ({ ...task, order })),
            }
          : board
      )
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          placeholder="제목을 입력하세요."
          className="border rounded p-2 mr-2 w-80"
        />
        <button
          onClick={handleCreateBoard}
          className="bg-blue-500 text-white rounded p-2"
        >
          보드 추가
        </button>
      </div>
      <div className="flex space-x-4 overflow-x-auto">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            onEditBoard={handleEditBoard}
            onDeleteBoard={handleDeleteBoard}
            onChangeBoardOrder={handleChangeBoardOrder}
            onCreateTask={handleCreateTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onChangeTaskOrder={handleChangeTaskOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
