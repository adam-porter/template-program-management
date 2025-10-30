import React from 'react';

/**
 * StatsCard Component - Statistics display card
 * Uses Uniform Web Storybook font styles (Barlow)
 */
const StatsCard = ({ 
  label, 
  value, 
  subheader, 
  rows = [],
  color = 'default'
}) => {
  const colorMap = {
    default: { border: '#e0e0e0', background: 'white' },
    primary: { border: '#007acc', background: '#f0f8ff' },
    success: { border: '#28a745', background: '#f1f8e9' },
    warning: { border: '#ffc107', background: '#fffbf0' },
    danger: { border: '#dc3545', background: '#ffebee' }
  };

  const colors = colorMap[color] || colorMap.default;

  return (
    <div style={{ 
      border: `1px solid ${colors.border}`, 
      borderRadius: '8px', 
      padding: '24px',
      backgroundColor: colors.background
    }}>
      <h3 style={{ 
        margin: '0 0 16px 0', 
        color: '#666', 
        fontSize: '14px',
        fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>{label}</h3>
      <div style={{ 
        fontSize: '48px', 
        fontWeight: 'bold', 
        marginBottom: '8px',
        fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>{value}</div>
      {subheader && <p style={{ 
        margin: '0 0 16px 0', 
        color: '#666',
        fontFamily: "'Barlow', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}>{subheader}</p>}
      {rows.length > 0 && (
        <div>
          {rows.map((row, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsCard;
