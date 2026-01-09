import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task, TaskFilterRequest, CreateTaskRequest, UpdateTaskRequest } from '../api/taskService';
import { taskService } from '../api/taskService';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import FilterSortBar from '../components/FilterSortBar';
import { AlertCircle, CheckCircle, LogOut, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<TaskFilterRequest>({});

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await taskService.getAllTasks(filters);
      setTasks(response.data);
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please log in again.');
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to load tasks');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: CreateTaskRequest | UpdateTaskRequest) => {
    setError('');
    setSuccess('');

    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, data as UpdateTaskRequest);
        setSuccess('Task updated successfully');
      } else {
        await taskService.createTask(data as CreateTaskRequest);
        setSuccess('Task created successfully');
      }
      setShowForm(false);
      setEditingTask(undefined);
      fetchTasks();
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please log in again.');
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to save task');
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    setError('');
    setSuccess('');

    try {
      await taskService.deleteTask(id);
      setSuccess('Task deleted successfully');
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleMarkAsDone = async (task: Task) => {
    setError('');
    setSuccess('');

    try {
      await taskService.updateTask(task.id, {
        taskDescription: task.taskDescription,
        priority: task.priority,
        status: 'DONE',
        deadline: task.deadline,
      });
      setSuccess('Task marked as done!');
      fetchTasks();
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please log in again.');
        logout();
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to update task');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">To-Do List</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
            <CheckCircle size={20} />
            {success}
          </div>
        )}

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <Plus size={20} />
            Add New Task
          </button>
        )}

        {showForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleCreateTask}
            onCancel={handleCancelForm}
          />
        )}

        <FilterSortBar filters={filters} onFiltersChange={setFilters} />

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading tasks...</p>
          </div>
        )}

        {!loading && tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tasks found. Create one to get started!</p>
          </div>
        )}

        {!loading && tasks.length > 0 && (
          <div>
            <p className="text-gray-600 mb-4">Total Tasks: {tasks.length}</p>
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onMarkAsDone={handleMarkAsDone}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
