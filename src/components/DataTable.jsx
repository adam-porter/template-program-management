import React, { useState } from 'react';

/**
 * DataTable Component - Data table with search and filtering
 * Uses Uniform Web Storybook font styles (Barlow)
 */
const DataTable = ({ 
  columns = [], 
  data = [], 
  searchable = true,
  filterable = true,
  downloadable = true,
  onSearch = () => {},
  onFilter = () => {},
  onDownload = () => {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('All');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilter(value);
  };

  const handleDownload = () => {
    onDownload(data);
  };

  return (
    <div style={{ 
      border: '1px solid #e0e0e0', 
      borderRadius: '8px',
      backgroundColor: 'white'
    }}>
      {/* Table Toolbar */}
      <div style={{ 
        padding: '16px 24px', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {filterable && (
            <select 
              value={filterValue}
              onChange={handleFilter}
              style={{ 
                padding: '8px 12px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                backgroundColor: 'white'
              }}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {searchable && (
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search for..." 
                value={searchTerm}
                onChange={handleSearch}
                style={{ 
                  padding: '8px 12px 8px 36px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px',
                  width: '200px'
                }}
              />
              <span style={{ 
                position: 'absolute', 
                left: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#666'
              }}>
                🔍
              </span>
            </div>
          )}
          {downloadable && (
            <button 
              onClick={handleDownload}
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              Download ↓
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              {columns.map((column, index) => (
                <th key={index} style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  fontWeight: 'bold',
                  color: '#666',
                  borderBottom: '1px solid #e0e0e0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {column.label} ↕
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px dashed #f0f0f0' }}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={{ padding: '12px 16px' }}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
