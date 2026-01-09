import React from 'react';
import { Priority, Status, TaskFilterRequest } from '../api/taskService';
import { Filter } from 'lucide-react';

interface FilterSortBarProps {
  filters: TaskFilterRequest;
  onFiltersChange: (filters: TaskFilterRequest) => void;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({ filters, onFiltersChange }) => {
  const handlePriorityChange = (priority: Priority | '') => {
    onFiltersChange({
      ...filters,
      priority: priority || undefined,
    });
  };

  const handleStatusChange = (status: Status | '') => {
    onFiltersChange({
      ...filters,
      status: status || undefined,
    });
  };

  const handleSortByChange = (sortBy: 'priority' | 'status' | 'deadline' | '') => {
    onFiltersChange({
      ...filters,
      sortBy: sortBy || undefined,
    });
  };

  const handleSortOrderChange = (sortOrder: 'asc' | 'desc' | '') => {
    onFiltersChange({
      ...filters,
      sortOrder: sortOrder || undefined,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Filter size={20} />
        Filters & Sort
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handlePriorityChange(e.target.value as Priority | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="NORMAL">Normal</option>
            <option value="LOW">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={filters.status || ''}
            onChange={(e) => handleStatusChange(e.target.value as Status | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Statuses</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            <option value="MISSED_DEADLINE">Missed Deadline</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={filters.sortBy || ''}
            onChange={(e) => handleSortByChange(e.target.value as 'priority' | 'status' | 'deadline' | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Default</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="deadline">Deadline</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <select
            value={filters.sortOrder || 'asc'}
            onChange={(e) => handleSortOrderChange(e.target.value as 'asc' | 'desc' | '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleClearFilters}
            className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSortBar;
