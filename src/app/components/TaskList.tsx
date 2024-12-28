"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Task } from "../page"; 
import TaskCard from "./TaskCard";




interface TaskListProps {
  loading: boolean;
  tasks: Task[];
  editTaskId: string | null;
  setEditTaskId: React.Dispatch<React.SetStateAction<string | null>>;

  editTaskName: string;
  setEditTaskName: React.Dispatch<React.SetStateAction<string>>;
  editTaskDueDate: string;
  setEditTaskDueDate: React.Dispatch<React.SetStateAction<string>>;
  editTaskPriority: string;
  setEditTaskPriority: React.Dispatch<React.SetStateAction<string>>;
  editTaskStatus: string;
  setEditTaskStatus: React.Dispatch<React.SetStateAction<string>>;

  updateTask: (
    id: string,
    newName: string,
    dueDate: string,
    priority: string,
    status: string
  ) => void;
  deleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  loading,
  tasks,
  editTaskId,
  setEditTaskId,
  editTaskName,
  setEditTaskName,
  editTaskDueDate,
  setEditTaskDueDate,
  editTaskPriority,
  setEditTaskPriority,
  editTaskStatus,
  setEditTaskStatus,
  updateTask,
  deleteTask
}) => {
  // 1. Show loading
  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-500">Loading your tasks...</p>
      </div>
    );
  }

  // 2. Show no tasks
  if (!tasks.length) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500">No tasks yet. Create your first task above!</p>
      </div>
    );
  }

  // 3. Render tasks
  return (
    <div className="divide-y divide-gray-100">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
          editTaskName={editTaskName}
          setEditTaskName={setEditTaskName}
          editTaskDueDate={editTaskDueDate}
          setEditTaskDueDate={setEditTaskDueDate}
          editTaskPriority={editTaskPriority}
          setEditTaskPriority={setEditTaskPriority}
          editTaskStatus={editTaskStatus}
          setEditTaskStatus={setEditTaskStatus}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;