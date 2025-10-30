import React from 'react';

/**
 * Header Component - Global navigation header
 * This represents a component that would come from your Uniform Web Storybook
 */
const Header = ({ logo, title, user }) => {
  return (
    <header style={{ 
      backgroundColor: '#2c2c2c', 
      color: 'white', 
      padding: '12px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          backgroundColor: '#ff6b35', 
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {logo}
        </div>
        <nav style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Watch Now</a>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', backgroundColor: '#555', borderRadius: '4px' }}></div>
          <div style={{ width: '24px', height: '24px', backgroundColor: '#555', borderRadius: '4px' }}></div>
          <div style={{ width: '24px', height: '24px', backgroundColor: '#555', borderRadius: '4px' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            backgroundColor: '#4a90e2', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
          }}>
            {user?.initials || 'KW'}
          </div>
          <span>{user?.name || 'Kelly Williams'}</span>
          <span>▼</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
