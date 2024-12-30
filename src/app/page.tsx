"use client"

import { useState, useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export interface Task {
  id: string;
  properties: {
    Name: {
      title: { plain_text: string }[];
    };
    Priority?: {
      select?: { name: string };
    };
    Status?: {
      status?: { name: string };
    };
    "Due Date"?: {
      date?: { start?: string; end?: string | null };
    };
    [key: string]: unknown;
  };
}


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // New task fields
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("2024-12-31");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskStatus, setNewTaskStatus] = useState("Not started");

  // Edit task fields
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [editTaskName, setEditTaskName] = useState("");
  const [editTaskDueDate, setEditTaskDueDate] = useState("2024-12-31");
  const [editTaskPriority, setEditTaskPriority] = useState("Medium");
  const [editTaskStatus, setEditTaskStatus] = useState("Not started");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/read");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async () => {
    if (!newTaskName.trim()) return;
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskName.trim(),
          dueDate: newTaskDueDate,
          priority: newTaskPriority,
          status: newTaskStatus,
        }),
      });
      if (!response.ok) throw new Error("Failed to create task");
      // Reset fields
      setNewTaskName("");
      setNewTaskDueDate("2024-12-31");
      setNewTaskPriority("Medium");
      setNewTaskStatus("Not started");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (id: string, newName: string, dueDate: string, priority: string, status: string) => {
    if (!newName.trim()) return;
    try {
      const response = await fetch("/api/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: id,
          updates: {
            Name: { title: [{ text: { content: newName.trim() } }] },
            "Due Date": { date: { start: dueDate } },
            Priority: { select: { name: priority } },
            Status: { status: { name: status } }
          },
        }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      setEditTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch("/api/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId: id }),
      });
      if (!response.ok) throw new Error("Failed to delete task");
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

 

    

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-6 border-b border-gray-100 bg-white">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <p className="mt-2 text-gray-500">Organize your work and life</p>
          </div>

         {/* Create Task */}
         <TaskForm
            newTaskName={newTaskName}
            setNewTaskName={setNewTaskName}
            newTaskDueDate={newTaskDueDate}
            setNewTaskDueDate={setNewTaskDueDate}
            newTaskPriority={newTaskPriority}
            setNewTaskPriority={setNewTaskPriority}
            newTaskStatus={newTaskStatus}
            setNewTaskStatus={setNewTaskStatus}
            createTask={createTask}
          />

          {/* Task List */}
          <TaskList
            loading={loading}
            tasks={tasks}
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
        </div>
      </div>
    </div>
  );
}