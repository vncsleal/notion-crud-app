"use client"

import { useState, useEffect, useCallback } from "react";
import { Trash2, Edit2, CheckCircle2, XCircle, PlusIcon } from 'lucide-react';

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

const PRIORITY_COLORS = {
  "High": { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  "Medium": { bg: "bg-yellow-50", text: "text-yellow-600", dot: "bg-yellow-500" },
  "Low": { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
};

const STATUS_COLORS = {
  "Not started": { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
  "In progress": { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  "Done": { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
};

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];
const STATUS_OPTIONS = ["Not started", "In progress", "Done"];

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

  const Select = ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
  }) => {
    return (
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="appearance-none w-full bg-white border border-gray-200 rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
          ▼
        </div>
      </div>
    );
  };

  const DateInput = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <input
      type="date"
      value={value}
      onChange={onChange}
      className="w-full bg-white border border-gray-200 rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );

  return (
    <div className="w-full min-h-screen bg-[#f3f4f5] py-12 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            
          </div>

          {/* Create Task */}
          <div className="px-6 py-4 border-b border-gray-200 space-y-4">
            <div className="flex items-center space-x-3">
              <PlusIcon className="text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Type a task..."
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && createTask()}
                className="flex-grow text-lg bg-transparent text-gray-900 placeholder-gray-400 outline-none border-b border-transparent focus:border-blue-500 transition-colors"
              />
              {newTaskName.trim() && (
                <button
                  onClick={createTask}
                  className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors"
                >
                  Add
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Due Date</label>
                <DateInput value={newTaskDueDate} onChange={(e) => setNewTaskDueDate(e.target.value)} />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Priority</label>
                <Select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)} options={PRIORITY_OPTIONS}/>
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-500 mb-1">Status</label>
                <Select value={newTaskStatus} onChange={(e) => setNewTaskStatus(e.target.value)} options={STATUS_OPTIONS}/>
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-6 text-center text-gray-400">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="p-6 text-center text-gray-400">No tasks yet</div>
            ) : (
              tasks.map((task) => {
                const name = task.properties.Name.title[0]?.plain_text || "";
                const dueDate = task.properties["Due Date"]?.date?.start ?? "2024-12-31";
                const priority = task.properties.Priority?.select?.name ?? "Medium";
                const status = task.properties.Status?.status?.name ?? "Not started";

                const priorityColors = PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS];
                const statusColors = STATUS_COLORS[status as keyof typeof STATUS_COLORS];

                return (
                  <div
                    key={task.id}
                    className="px-6 py-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors group"
                  >
                    {editTaskId === task.id ? (
                      <div className="w-full space-y-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            value={editTaskName}
                            onChange={(e) => setEditTaskName(e.target.value)}
                            className="flex-grow text-lg bg-transparent text-gray-900 outline-none border-b border-transparent focus:border-blue-500"
                            autoFocus
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateTask(task.id, editTaskName, editTaskDueDate, editTaskPriority, editTaskStatus)}
                              className="text-green-500 hover:text-green-600"
                            >
                              <CheckCircle2 size={20} />
                            </button>
                            <button
                              onClick={() => setEditTaskId(null)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <XCircle size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm text-gray-500 mb-1">Due Date</label>
                            <DateInput value={editTaskDueDate} onChange={(e) => setEditTaskDueDate(e.target.value)} />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm text-gray-500 mb-1">Priority</label>
                            <Select value={editTaskPriority} onChange={(e) => setEditTaskPriority(e.target.value)} options={PRIORITY_OPTIONS} />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm text-gray-500 mb-1">Status</label>
                            <Select value={editTaskStatus} onChange={(e) => setEditTaskStatus(e.target.value)} options={STATUS_OPTIONS} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
  <div className="flex-grow flex items-center space-x-3">
    <div className={`w-2 h-2 rounded-full ${priorityColors.dot}`}></div>
    <div className="flex w-full items-center justify-between">
      <div className="text-gray-900 font-medium">{name}</div>
      <div className="flex items-center space-x-6 text-sm text-gray-500 mt-1">
        <span className={`px-2 py-0.5 rounded-md text-xs ${priorityColors.bg} ${priorityColors.text}`}>
          {priority}
        </span>
        <span className={`px-2 py-0.5 rounded-md text-xs ${statusColors.bg} ${statusColors.text}`}>
          {status}
        </span>
        <span>Due: {dueDate}</span>
      </div>
    </div>
  </div>
  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
    <button
      onClick={() => {
        setEditTaskId(task.id);
        setEditTaskName(name);
        setEditTaskDueDate(dueDate);
        setEditTaskPriority(priority);
        setEditTaskStatus(status);
      }}
      className="text-gray-400 hover:text-blue-500 transition-colors"
      title="Edit"
    >
      <Edit2 size={16} />
    </button>
    <button
      onClick={() => deleteTask(task.id)}
      className="text-gray-400 hover:text-red-500 transition-colors"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  </div>
</>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}