"use client";

import React from "react";
import { 
  CheckCircle2,
  XCircle,
  Calendar,
  AlertTriangle,
  Clock,
  Edit2,
  Trash2
} from "lucide-react";
import Tooltip from "./Tooltip";
import { DateInput, Select } from "./Inputs";
import { Task } from "../page";

const PRIORITY_COLORS = {
  High: { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-500" },
  Medium: { bg: "bg-yellow-50", text: "text-yellow-600", dot: "bg-yellow-500" },
  Low: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
};

const STATUS_COLORS = {
  "Not started": { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" },
  "In progress": { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" },
  Done: { bg: "bg-green-50", text: "text-green-600", dot: "bg-green-500" },
};

const PRIORITY_OPTIONS = ["High", "Medium", "Low"];
const STATUS_OPTIONS = ["Not started", "In progress", "Done"];

interface TaskCardProps {
  task: Task;
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

const TaskCard: React.FC<TaskCardProps> = ({
  task,
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
  deleteTask,
}) => {
  const name = task.properties.Name.title[0]?.plain_text || "";
  const dueDate = task.properties["Due Date"]?.date?.start ?? "2024-12-31";
  const priority = task.properties.Priority?.select?.name ?? "Medium";
  const status = task.properties.Status?.status?.name ?? "Not started";

  const priorityColors = PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS];
  const statusColors = STATUS_COLORS[status as keyof typeof STATUS_COLORS];

  const isEditing = editTaskId === task.id;

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the task "${name}"?`
    );
    if (confirmed) {
      deleteTask(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="p-6 space-y-4 group hover:bg-gray-50 transition-colors duration-200">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={editTaskName}
            onChange={(e) => setEditTaskName(e.target.value)}
            className="flex-grow text-lg bg-transparent text-gray-900 outline-none 
              border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              onClick={() =>
                updateTask(
                  task.id,
                  editTaskName,
                  editTaskDueDate,
                  editTaskPriority,
                  editTaskStatus
                )
              }
              className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors duration-200"
            >
              <CheckCircle2 size={20} />
            </button>
            <button
              onClick={() => setEditTaskId(null)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <XCircle size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Due Date
            </label>
            <DateInput
              value={editTaskDueDate}
              onChange={(e) => setEditTaskDueDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Priority
            </label>
            <Select
              value={editTaskPriority}
              onChange={(e) => setEditTaskPriority(e.target.value)}
              options={PRIORITY_OPTIONS}
              icon={AlertTriangle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <Select
              value={editTaskStatus}
              onChange={(e) => setEditTaskStatus(e.target.value)}
              options={STATUS_OPTIONS}
              icon={Clock}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 flex items-center space-x-4 group hover:bg-gray-50 transition-colors duration-200">
      <div className="flex-grow">
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full ${priorityColors.dot}`} />
          <span className="text-gray-900 font-medium">{name}</span>
        </div>
        <div className="mt-2 flex items-center space-x-4 text-sm">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${priorityColors.bg} ${priorityColors.text}`}
          >
            {priority}
          </span>
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors.bg} ${statusColors.text}`}
          >
            {status}
          </span>
          <span className="text-gray-500 flex items-center space-x-1">
            <Calendar size={14} />
            <span>{dueDate}</span>
          </span>
        </div>
      </div>
      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Tooltip label="Edit Task">
          <button
            onClick={() => {
              setEditTaskId(task.id);
              setEditTaskName(name);
              setEditTaskDueDate(dueDate);
              setEditTaskPriority(priority);
              setEditTaskStatus(status);
            }}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 
              rounded-lg transition-all duration-200"
          >
            <Edit2 size={16} />
          </button>
        </Tooltip>
        <Tooltip label="Delete Task">
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 
              rounded-lg transition-all duration-200"
          >
            <Trash2 size={16} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TaskCard;