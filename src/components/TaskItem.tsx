import React from 'react';
import { Task } from '../api/taskService';
import { Trash2, Edit2, Calendar, Flag, CheckCircle2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onMarkAsDone: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onMarkAsDone }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'NORMAL':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'bg-gray-50 border-l-4 border-gray-400';
      case 'IN_PROGRESS':
        return 'bg-blue-50 border-l-4 border-blue-500';
      case 'DONE':
        return 'bg-green-50 border-l-4 border-green-500';
      case 'MISSED_DEADLINE':
        return 'bg-red-50 border-l-4 border-red-500';
      default:
        return 'bg-white border-l-4 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`rounded-lg shadow-sm p-4 mb-3 ${getStatusColor(task.status)}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.taskDescription}</h3>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
              <Flag size={14} className="inline mr-1" />
              {task.priority}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300">
              {task.status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Due: {formatDate(task.deadline)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          {task.status !== 'DONE' && (
            <button
              onClick={() => onMarkAsDone(task)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              title="Mark as done"
            >
              <CheckCircle2 size={18} />
            </button>
          )}
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
