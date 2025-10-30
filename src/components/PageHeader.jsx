import React from 'react';
import UniformButton from './UniformButton';
import { IconArrowLeft, IconInformation, IconShare, IconMore, IconLock } from './UniformIcons';

/**
 * PageHeader Component - Based on Figma design from Org-Management-Components
 * Uses Uniform Web Storybook design tokens and Barlow font
 * Responsive design with mobile, tablet, and desktop breakpoints
 */
const PageHeader = ({ 
  title = "2024-2025 Club Dues",
  subtitle = "Team Dues · Jan 15, 2025 - Jul 15, 2025",
  showBreadcrumbs = true,
  showTabs = true,
  tabs = ['overview', 'registrations'],
  showToggle = true,
  showShare = true,
  shareDisabled = false,
  isPrivate = false,
  breadcrumbText = "Programs",
  toggleLabel = "Open Registration",
  toggleTooltip = "Open/Close registrations for this program",
  toggleValue = true,
  onToggleChange = () => {},
  onShare = () => {},
  onMore = () => {},
  onBack = () => {},
  activeTab = 'overview',
  onTabChange = () => {}
}) => {
  return (
    <>
      <style>
        {`
          .page-header {
            display: flex;
            flex-direction: column;
            width: 100%;
          }

          .page-header-info-icon-container {
            position: relative;
            display: inline-flex;
            align-items: center;
            cursor: help;
          }

          .page-header-lock-icon-container {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            cursor: help;
            margin-left: var(--u-space-three-quarter, 12px);
          }

          .page-header-info-icon-container:hover .page-header-tooltip,
          .page-header-lock-icon-container:hover .page-header-tooltip {
            visibility: visible;
            opacity: 1;
          }

          .page-header-tooltip {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
            padding: 8px 12px;
            background-color: var(--u-color-base-foreground-contrast, #071c31);
            color: var(--u-color-emphasis-foreground-reversed, #fefefe);
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-micro, 12px);
            font-weight: var(--u-font-weight-medium, 500);
            line-height: 1.4;
            border-radius: var(--u-border-radius-small, 2px);
            white-space: nowrap;
            transition: opacity 0.2s ease, visibility 0.2s ease;
            z-index: 1000;
          }

          .page-header-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: var(--u-color-base-foreground-contrast, #071c31);
          }

          .page-header-tooltip-left {
            left: -4px !important;
            transform: translateX(0) !important;
          }

          .page-header-tooltip-left::after {
            left: 12px;
            transform: translateX(0);
          }

          .page-header-tooltip-right {
            left: auto;
            right: 0;
            transform: translateX(0);
          }

          .page-header-tooltip-right::after {
            left: auto;
            right: 12px;
            transform: translateX(0);
          }
          
          .page-header-content {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-three-quarter, 12px);
            width: 100%;
          }
          
          .page-header-breadcrumbs {
            display: flex;
            gap: 8px;
            align-items: center;
            width: 100%;
          }
          
          .page-header-title-section {
            display: flex;
            gap: var(--u-space-three, 48px);
            align-items: flex-end;
            width: 100%;
            padding-bottom: var(--u-space-three-quarter, 12px);
          }
          
          .page-header-actions {
            display: flex;
            gap: var(--u-space-one, 16px);
            align-items: center;
          }
          
          .page-header-tabs {
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
          }
          
          .page-header-tab-list {
            display: flex;
            align-items: center;
            position: relative;
            z-index: 2;
          }
          
          .page-header-tab {
            display: flex;
            gap: var(--u-space-quarter, 4px);
            align-items: flex-start;
            justify-content: center;
            min-height: 50px;
            padding: var(--u-space-one, 16px);
            font-family: var(--u-font-body);
            font-weight: var(--u-font-weight-bold);
            font-size: var(--u-font-size-default, 16px);
            cursor: pointer;
          }
          
          .page-header-tab.active {
            border-bottom: 2px solid var(--u-color-emphasis-background-contrast, #0273e3);
            color: var(--u-color-base-foreground-contrast, #071c31);
          }
          
          .page-header-tab:not(.active) {
            color: var(--u-color-base-foreground, #36485c);
          }
          
          .page-header-tab-border {
            height: 1px;
            width: 100%;
            position: relative;
            z-index: 1;
            background-color: var(--u-color-line-subtle, #c4c6c8);
          }
          
          /* S breakpoint (288px - 767px) - Mobile/Small */
          @media (min-width: 288px) and (max-width: 767px) {
            .page-header {
              gap: var(--u-space-half, 8px);
            }
            
            .page-header-breadcrumbs {
              display: flex; /* Show breadcrumbs on small screens */
              justify-content: space-between;
              align-items: center;
              width: 100%;
            }
            
            .page-header-breadcrumb-left {
              display: flex;
              gap: var(--u-space-quarter, 4px);
              align-items: center;
            }
            
            .page-header-breadcrumb-right {
              display: flex;
              gap: var(--u-space-half, 8px);
              align-items: center;
            }
            
            .page-header-actions {
              display: none; /* Hide the main actions section on small screens */
            }
            
            .page-header-title-section {
              flex-direction: column;
              gap: var(--u-space-half, 8px);
              align-items: flex-start;
            }
            
            .page-header-actions {
              display: none; /* Hide the main actions section on small screens */
            }
            
            .page-header-tab {
              min-height: 40px;
              padding: var(--u-space-half, 8px);
              font-size: var(--u-font-size-small, 14px);
            }
            
            .page-header-subtitle {
              font-size: var(--u-font-size-small, 14px) !important;
              line-height: 1.4;
            }
          }
          
          /* M breakpoint (768px - 1365px) - Medium/Tablet */
          @media (min-width: 768px) and (max-width: 1365px) {
            .page-header {
              gap: var(--u-space-three-quarter, 12px);
            }
            
            .page-header-breadcrumbs {
              display: flex; /* Show breadcrumbs on larger screens */
            }
            
            .page-header-breadcrumb-right {
              display: none; /* Hide actions in breadcrumb on larger screens */
            }
            
            .page-header-actions {
              display: flex; /* Show the main actions section on larger screens */
            }
            
            .page-header-title-section {
              flex-direction: row;
              gap: var(--u-space-two, 32px);
              align-items: flex-end;
            }
            
            .page-header-actions {
              flex-direction: row;
              gap: var(--u-space-three-quarter, 12px);
              align-items: center;
              justify-content: flex-end;
            }
            
            .page-header-tab {
              min-height: 50px;
              padding: var(--u-space-one, 16px);
              font-size: var(--u-font-size-default, 16px);
            }
            
            .page-header-subtitle {
              font-size: var(--u-font-size-small, 14px) !important;
              line-height: 1.4;
            }
          }
          
          /* L breakpoint (1366px - 1919px) - Large */
          @media (min-width: 1366px) and (max-width: 1919px) {
            .page-header-breadcrumb-right {
              display: none; /* Hide actions in breadcrumb on larger screens */
            }
            
            .page-header-actions {
              display: flex; /* Show the main actions section on larger screens */
              gap: var(--u-space-one, 16px);
            }
            
            .page-header-title-section {
              gap: var(--u-space-three, 48px);
            }
          }
          
          /* XL breakpoint (1920px - 3200px) - Extra Large */
          @media (min-width: 1920px) {
            .page-header-breadcrumb-right {
              display: none; /* Hide actions in breadcrumb on larger screens */
            }
            
            .page-header-actions {
              display: flex; /* Show the main actions section on larger screens */
            }
          }
        `}
      </style>
      <div className="page-header">
        {/* Breadcrumb and Title Container */}
        <div className="page-header-content">
          {/* Breadcrumb Bar */}
          {showBreadcrumbs && (
            <div className="page-header-breadcrumbs">
            {/* Left side - Back button and Programs link */}
            <div className="page-header-breadcrumb-left">
              <div style={{ 
                display: 'flex', 
                gap: 'var(--u-space-quarter, 4px)', 
                alignItems: 'center'
              }}>
                {/* Back Button */}
                <UniformButton 
                  buttonStyle="minimal" 
                  buttonType="primary" 
                  size="xsmall"
                  icon={<IconArrowLeft />}
                  onClick={onBack}
                />

                {/* Programs Link */}
                <UniformButton 
                  buttonStyle="minimal" 
                  buttonType="primary" 
                  size="xsmall"
                  onClick={onBack}
                >
                  {breadcrumbText}
                </UniformButton>

                {/* Slash Separator */}
                <div style={{ width: '12px', height: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '12px', fontFamily: 'var(--u-font-body)', fontWeight: 'var(--u-font-weight-bold, 700)', color: 'var(--u-color-base-foreground, #36485c)' }}>/</span>
                </div>
              </div>
            </div>

            {/* Right side - Actions for small screens */}
            <div className="page-header-breadcrumb-right">
              {/* Registration Toggle */}
              {showToggle && (
                <div style={{ 
                  display: 'flex', 
                  gap: 'var(--u-space-quarter, 4px)', 
                  alignItems: 'center'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '4px', 
                    alignItems: 'center'
                  }}>
                    <div className="page-header-info-icon-container" style={{ width: '16px', height: '16px', color: 'var(--u-color-base-foreground, #36485c)', marginRight: '8px' }}>
                      <IconInformation />
                      <div className="page-header-tooltip">
                        {toggleTooltip}
                      </div>
                    </div>
                    <span style={{
                      fontFamily: 'var(--u-font-body)',
                      fontWeight: 'var(--u-font-weight-medium, 500)',
                      fontSize: 'var(--u-font-size-small, 14px)',
                      color: 'var(--u-color-base-foreground, #36485c)',
                      letterSpacing: '0px',
                      lineHeight: '1.4'
                    }}>Open Reg.</span>
                  </div>
                  
                  <button 
                    onClick={onToggleChange}
                    style={{ 
                      width: '32px',
                      height: '20px',
                      backgroundColor: toggleValue ? 'var(--u-color-emphasis-background-contrast, #0273e3)' : 'var(--u-color-base-background-contrast, #607081)',
                      borderRadius: '9999px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px',
                      justifyContent: toggleValue ? 'flex-end' : 'flex-start',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: 'var(--u-color-emphasis-foreground-reversed, #fefefe)',
                      borderRadius: '9999px'
                    }}></div>
                  </button>
                </div>
              )}

              {/* Divider - show if we have a toggle or actions */}
              {(showToggle || showShare) && (
                <div style={{
                  height: '24px',
                  width: '1px',
                  backgroundColor: 'var(--u-color-line-subtle, #c4c6c8)',
                  margin: '0 var(--u-space-half, 8px)'
                }}></div>
              )}

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                gap: 'var(--u-space-quarter, 4px)',
                alignItems: 'center'
              }}>
                {/* Share Button */}
                {showShare && (
                  <UniformButton
                    buttonStyle="standard"
                    buttonType="primary"
                    size="medium"
                    icon={<IconShare />}
                    onClick={onShare}
                    disabled={shareDisabled}
                  >
                    Share
                  </UniformButton>
                )}

                {/* More Actions Button */}
                <UniformButton
                  buttonStyle="standard"
                  buttonType="subtle"
                  size="medium"
                  icon={<IconMore />}
                  onClick={onMore}
                />
              </div>
              </div>
            </div>
          )}

          {/* Title and Actions Row */}
          <div className="page-header-title-section">
        
        {/* Title Section */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 'var(--u-space-quarter, 4px)',
          flex: '1'
        }}>
          <h1 style={{ 
            fontSize: 'var(--u-font-size-title-xxlarge, 32px)', 
            margin: '0', 
            fontWeight: 'var(--u-font-weight-bold)',
            fontFamily: 'var(--u-font-body)',
            color: 'var(--u-color-base-foreground-contrast, #071c31)',
            letterSpacing: '0.25px',
            lineHeight: '1.2'
          }}>
            {title}
          </h1>
          
            {subtitle && (
              <div className="page-header-subtitle" style={{
                display: 'flex',
                gap: 'var(--u-space-half, 8px)',
                alignItems: 'center',
                fontFamily: 'var(--u-font-body)',
                fontWeight: 'var(--u-font-weight-medium, 500)',
                fontSize: 'var(--u-font-size-small, 14px)',
                color: 'var(--u-color-base-foreground, #36485c)',
                letterSpacing: '0px',
                lineHeight: '1.4'
              }}>
              {isPrivate && (
                <>
                  <style>
                    {`
                      .page-header-lock-tooltip {
                        visibility: hidden;
                        opacity: 0;
                        position: absolute;
                        bottom: 100%;
                        left: -8px;
                        transform: translateX(0);
                        margin-bottom: 8px;
                        padding: 8px 12px;
                        background-color: var(--u-color-base-foreground-contrast, #071c31);
                        color: var(--u-color-emphasis-foreground-reversed, #fefefe);
                        font-family: var(--u-font-body);
                        font-size: var(--u-font-size-micro, 12px);
                        font-weight: var(--u-font-weight-medium, 500);
                        line-height: 1.4;
                        border-radius: var(--u-border-radius-small, 2px);
                        white-space: nowrap;
                        transition: opacity 0.2s ease, visibility 0.2s ease;
                        z-index: 1000;
                      }
                      
                      .page-header-lock-tooltip::after {
                        content: '';
                        position: absolute;
                        top: 100%;
                        left: 12px;
                        transform: translateX(0);
                        border: 4px solid transparent;
                        border-top-color: var(--u-color-base-foreground-contrast, #071c31);
                      }
                      
                      .page-header-lock-icon-container:hover .page-header-lock-tooltip {
                        visibility: visible;
                        opacity: 1;
                      }
                    `}
                  </style>
                  <div className="page-header-lock-icon-container" style={{ 
                    width: '16px', 
                    height: '16px', 
                    color: 'var(--u-color-base-foreground, #36485c)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '0',
                    marginRight: '0px'
                  }}>
                    <IconLock />
                    <div className="page-header-lock-tooltip">
                      This is a private program
                    </div>
                  </div>
                </>
              )}
              {subtitle.includes(' · ') ? (
                <>
                  <span>{subtitle.split(' · ')[0]}</span>
                  <span>·</span>
                  <span>{subtitle.split(' · ')[1]}</span>
                </>
              ) : (
                <span>{subtitle}</span>
              )}
            </div>
          )}
        </div>

              {/* Page Actions */}
              <div className="page-header-actions">
            {/* Registration Toggle */}
            {showToggle && (
              <div className="page-header-toggle" style={{ 
                display: 'flex', 
                gap: 'var(--u-space-half, 8px)', 
                alignItems: 'center'
              }}>
              <div style={{ 
                display: 'flex', 
                gap: '4px', 
                alignItems: 'center'
              }}>
                    <div className="page-header-info-icon-container" style={{ width: '16px', height: '16px', color: 'var(--u-color-base-foreground, #36485c)', marginRight: '4px' }}>
                      <IconInformation />
                      <div className="page-header-tooltip">
                        {toggleTooltip}
                      </div>
                    </div>
                    <span className="page-header-toggle-label" style={{
                  fontFamily: 'var(--u-font-body)',
                  fontWeight: 'var(--u-font-weight-medium, 500)',
                  fontSize: 'var(--u-font-size-small, 14px)',
                  color: 'var(--u-color-base-foreground, #36485c)',
                  letterSpacing: '0px',
                  lineHeight: '1.4'
                }}>{toggleLabel}</span>
              </div>
              
              <button 
                onClick={onToggleChange}
                style={{ 
                  width: '32px', 
                  height: '20px', 
                  backgroundColor: toggleValue ? 'var(--u-color-emphasis-background-contrast, #0273e3)' : 'var(--u-color-base-background-contrast, #607081)', 
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  justifyContent: toggleValue ? 'flex-end' : 'flex-start',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: 'var(--u-color-emphasis-foreground-reversed, #fefefe)', 
                  borderRadius: '9999px'
                }}></div>
              </button>
            </div>
          )}

          {/* Divider - show if we have a toggle or actions */}
          {(showToggle || showShare) && (
            <div style={{
              height: '24px',
              width: '1px',
              backgroundColor: 'var(--u-color-line-subtle, #c4c6c8)',
              margin: '0 var(--u-space-half, 8px)'
            }}></div>
          )}

          {/* Action Buttons */}
          <div className="page-header-action-buttons" style={{
              display: 'flex',
              gap: 'var(--u-space-half, 8px)',
              alignItems: 'center'
            }}>
            {/* Share Button */}
            {showShare && (
              <UniformButton
                buttonStyle="standard"
                buttonType="primary"
                size="medium"
                icon={<IconShare />}
                onClick={onShare}
                disabled={shareDisabled}
              >
                Share
              </UniformButton>
            )}

            {/* More Actions Button */}
            <UniformButton
              buttonStyle="standard"
              buttonType="subtle"
              size="medium"
              icon={<IconMore />}
              onClick={onMore}
            />
            </div>
          </div>
        </div>
        </div>

        {/* Tab Bar */}
        {showTabs && (
              <div className="page-header-tabs">
                <div className="page-header-tab-list">
                  {tabs.map((tab) => (
                    <div 
                      key={tab}
                      className={`page-header-tab ${activeTab === tab ? 'active' : ''}`}
                      onClick={() => onTabChange(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </div>
                  ))}
                </div>
          
                {/* Tab Border */}
                <div className="page-header-tab-border"></div>
              </div>
            )}
          </div>
        </>
      );
    };

export default PageHeader;
