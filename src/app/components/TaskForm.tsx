"use client";

import { PlusIcon, AlertTriangle, Clock } from "lucide-react";
import { DateInput, Select } from "./Inputs";

// Reuse the same constants from the original snippet or define them here
const PRIORITY_OPTIONS = ["High", "Medium", "Low"];
const STATUS_OPTIONS = ["Not started", "In progress", "Done"];

interface TaskFormProps {
  // The same states you previously used in page.tsx
  newTaskName: string;
  setNewTaskName: (value: string) => void;
  newTaskDueDate: string;
  setNewTaskDueDate: (value: string) => void;
  newTaskPriority: string;
  setNewTaskPriority: (value: string) => void;
  newTaskStatus: string;
  setNewTaskStatus: (value: string) => void;

  // The function to create a task
  createTask: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  newTaskName,
  setNewTaskName,
  newTaskDueDate,
  setNewTaskDueDate,
  newTaskPriority,
  setNewTaskPriority,
  newTaskStatus,
  setNewTaskStatus,
  createTask,
}) => {
  return (
    <div className="px-6 py-6 border-b border-gray-100 space-y-4 bg-white">
      <div className="flex items-center space-x-4">
        <div className="flex-grow relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400">
            <PlusIcon className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createTask()}
            className="w-full pl-7 pr-4 py-2 text-lg bg-transparent text-gray-900 
              placeholder-gray-400 border-b-2 border-gray-100 focus:border-blue-500 
              transition-colors duration-200 outline-none"
          />
        </div>
        {newTaskName.trim() && (
          <button
            onClick={createTask}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
              transition-colors duration-200 flex items-center space-x-2"
          >
            <PlusIcon size={16} />
            <span>Add Task</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Due Date
          </label>
          <DateInput
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Priority
          </label>
          <Select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            options={PRIORITY_OPTIONS}
            icon={AlertTriangle}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Status
          </label>
          <Select
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
            options={STATUS_OPTIONS}
            icon={Clock}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;