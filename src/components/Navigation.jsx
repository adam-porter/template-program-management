import React from 'react';

/**
 * Navigation Component - Secondary navigation bar
 * This represents a component that would come from your Uniform Web Storybook
 */
const Navigation = ({ organization, activeTab, tabs }) => {
  return (
    <nav style={{ 
      backgroundColor: '#e0e0e0', 
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          backgroundColor: '#666', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px'
        }}>
          SSA
        </div>
        <span style={{ fontWeight: 'bold' }}>{organization || 'Supernova Soccer Acad...'}</span>
        <span>▼</span>
      </div>
      <div style={{ display: 'flex', gap: '24px' }}>
        {tabs?.map((tab, index) => (
          <a 
            key={index}
            href="#" 
            style={{ 
              color: tab === activeTab ? '#007acc' : '#666', 
              textDecoration: 'none', 
              fontWeight: tab === activeTab ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {tab} {tab === activeTab && '▼'}
          </a>
        )) || (
          <>
            <a href="#" style={{ 
              color: '#007acc', 
              textDecoration: 'none', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Programs ▼
            </a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Ticketing</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Edit Profile</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Settings</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
