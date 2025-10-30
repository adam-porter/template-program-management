import React, { useState } from 'react';
import PageHeader from './PageHeader';
import DataWidget from './DataWidget';
import TableToolbar from './TableToolbar';
import RegistrantsTable from './RegistrantsTable';
import Toast from './Toast';
import UniformButton from './UniformButton';

/**
 * RegistrationOverview Component - Individual registration detail page
 * Reuses program overview components without tab bar
 */
const RegistrationOverview = ({ 
  registration,
  onBack = () => {},
  onRegistrantClick = () => {},
  onRegistrantClickFromHere = () => {},
  onToggleChange = () => {},
  breadcrumbText = "Programs",
  widgets = [],
  registrants = [],
  widgetData = null
}) => {
  const [toastMessage, setToastMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('All');

  const handleToggleChange = () => {
    onToggleChange();
    
    // Show toast with singular message (this is a single registration)
    const newValue = !registration.enabled;
    setToastMessage(`${registration.title} registration ${newValue ? 'opened' : 'closed'}`);
  };

  // Check if a registrant has overdue payments
  const isOverdue = (registrant) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
    
    return registrant.payments.some(payment => {
      if (payment.status === 'Scheduled') {
        const paymentDate = new Date(payment.date);
        return paymentDate < today;
      }
      return false;
    });
  };

  // Update registrant status to Overdue if they have past-due payments
  const updateOverdueStatuses = (registrants) => {
    return registrants.map(registrant => {
      if (isOverdue(registrant) && registrant.status === 'Current') {
        return { ...registrant, status: 'Overdue' };
      }
      return registrant;
    });
  };

  // Filter registrants by status
  const filterByStatus = (registrants, filter) => {
    if (filter === 'All') {
      return registrants;
    }
    
    return registrants.filter(registrant => {
      switch (filter) {
        case 'Current':
          return registrant.status === 'Current';
        case 'Overdue':
          return registrant.status === 'Overdue';
        case 'Refunded':
          // Show anyone with refunds > $0, regardless of status
          // This includes Refunded, Partially Refunded, AND Cancelled registrants with refunds
          const refundAmount = parseFloat((registrant.refunded || '$0.00').replace(/[$,]/g, ''));
          return refundAmount > 0;
        case 'Cancelled':
          return registrant.status === 'Cancelled';
        default:
          return true;
      }
    });
  };

  // Filter registrants based on search query
  const filterBySearch = (registrants, query) => {
    if (!query || query.trim() === '') {
      return registrants;
    }
    
    const lowerQuery = query.toLowerCase().trim();
    
    return registrants.filter(registrant => {
      // Split athlete name into parts (first name, last name)
      const athleteParts = registrant.athlete.toLowerCase().split(' ');
      
      // Split primary contact name into parts (first name, last name)
      const contactParts = registrant.primaryContact.toLowerCase().split(' ');
      
      // Check if any part of athlete name matches
      const athleteMatch = athleteParts.some(part => part.includes(lowerQuery));
      
      // Check if any part of primary contact name matches
      const contactMatch = contactParts.some(part => part.includes(lowerQuery));
      
      return athleteMatch || contactMatch;
    });
  };

  // Apply overdue status updates first
  const registrantsWithOverdue = updateOverdueStatuses(registrants);

  // Apply status filter, then search filter
  const statusFiltered = filterByStatus(registrantsWithOverdue, filterValue);
  const filteredRegistrants = filterBySearch(statusFiltered, searchQuery);

  // Build widgets using widgetData if provided
  const displayWidgets = widgetData ? [
    {
      label: "Registrants",
      value: widgetData.count.toString(),
      size: "medium",
      avatar: null,
      subheader: null,
      rows: [
        { label: "Overdue", value: "0", hasButton: false, showCopyButton: false },
        { label: "Overdue Amount", value: "$0.00", hasButton: false, showCopyButton: false },
        { label: "Paused", value: "0", hasButton: false, showCopyButton: false }
      ]
    },
    {
      label: "Total Fees",
      // Net balance = Total Paid to Date - Refunded
      value: `$${(widgetData.totalPaid - widgetData.totalRefunded).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      size: "medium",
      avatar: null,
      subheader: null,
      rows: [
        { label: "Total Paid to Date", value: `$${widgetData.totalPaid.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, hasButton: false, showCopyButton: false },
        { label: "Outstanding", value: `$${widgetData.totalOutstanding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, hasButton: false, showCopyButton: false },
        { label: "Refunded", value: `-$${widgetData.totalRefunded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, hasButton: false, showCopyButton: false }
      ]
    }
  ] : widgets;

  return (
    <>
      <style>
        {`
          .registration-overview-main {
            background-color: white;
            padding: 28px 64px;
            display: flex;
            flex-direction: column;
            gap: var(--u-space-two, 32px);
          }


          .registration-overview-widgets {
            display: flex;
            gap: var(--u-space-three, 48px);
          }

          @media (max-width: 767px) {
            .registration-overview-main {
              padding: 16px;
            }

            .registration-overview-widgets {
              flex-direction: column;
              gap: var(--u-space-one-half, 24px);
            }
          }
        `}
      </style>
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'white', minHeight: '100vh' }}>
        <main className="registration-overview-main">
          {/* Page Header */}
          <PageHeader 
            title={registration.title}
            subtitle={registration.subtitle}
            showBreadcrumbs={true}
            showTabs={true}
            tabs={['overview', 'teams']}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            showToggle={true}
            showShare={false}
            breadcrumbText={breadcrumbText}
            toggleLabel="Open Registration"
            toggleTooltip="Open/Close this registration"
            toggleValue={registration.enabled}
            onToggleChange={handleToggleChange}
            onMore={() => console.log('More clicked')}
            onBack={onBack}
          />

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <>
              {/* Data Widgets */}
              <div className="registration-overview-widgets">
                {displayWidgets.map((widget, index) => (
                  <DataWidget
                    key={index}
                    label={widget.label}
                    value={widget.value}
                    size={widget.size}
                    avatar={widget.avatar}
                    subheader={widget.subheader}
                    rows={widget.rows}
                  />
                ))}
              </div>

              {/* Registrants Section */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half, 8px)' }}>
                <TableToolbar
                  title="Registrants"
                  filterValue={filterValue}
                  onFilterChange={setFilterValue}
                  onSearch={(value) => setSearchQuery(value)}
                  onDownload={() => console.log('Download clicked')}
                />
                <RegistrantsTable 
                  registrants={filteredRegistrants}
                  onRegistrantClick={onRegistrantClickFromHere || onRegistrantClick}
                />
              </div>
            </>
          )}

          {activeTab === 'teams' && (
            <>
              {registration.invitedTeams && registration.invitedTeams.length > 0 ? (
                <>
                  <style>
                    {`
                      .teams-table-container {
                        width: 100%;
                        background-color: var(--u-color-background-container, #fefefe);
                        overflow: hidden;
                      }
                      
                      .teams-table {
                        width: 100%;
                        border-collapse: collapse;
                        font-family: var(--u-font-body);
                      }

                      .teams-table th:nth-child(1),
                      .teams-table td:nth-child(1) {
                        width: auto;
                      }

                      .teams-table th:nth-child(2),
                      .teams-table td:nth-child(2) {
                        width: 12%;
                      }
                      
                      .teams-table thead tr {
                        background-color: transparent !important;
                      }
                      
                      .teams-table thead tr:hover {
                        background-color: transparent !important;
                      }
                      
                      .teams-table th {
                        padding: var(--u-space-three-quarter, 12px) var(--u-space-one, 16px);
                        text-align: left;
                        font-weight: var(--u-font-weight-bold, 700);
                        font-size: var(--u-font-size-small, 14px);
                        color: var(--u-color-base-foreground, #36485c);
                        letter-spacing: var(--u-letter-spacing-default, 0px);
                        line-height: 1.4;
                        white-space: nowrap;
                        background-color: transparent;
                      }
                      
                      .teams-table tbody tr {
                        height: 48px;
                      }
                      
                      .teams-table tbody tr:not(:last-child) {
                        border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
                      }
                      
                      .teams-table tbody tr:hover {
                        background-color: transparent;
                        cursor: default;
                      }
                      
                      .teams-table tbody td {
                        padding: var(--u-space-half, 8px) var(--u-space-one, 16px);
                        font-family: var(--u-font-body);
                        font-weight: var(--u-font-weight-medium, 500);
                        font-size: var(--u-font-size-small, 14px);
                        color: var(--u-color-base-foreground-contrast, #071c31);
                        letter-spacing: var(--u-letter-spacing-default, 0px);
                        line-height: 1.4;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      }
                      
                      .teams-table tbody td.team-name {
                        font-weight: var(--u-font-weight-bold, 700);
                      }
                      
                      .teams-table th.align-right,
                      .teams-table td.align-right {
                        text-align: right;
                      }
                    `}
                  </style>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half, 8px)' }}>
                    <TableToolbar
                      title=""
                      showFilter={false}
                      showSearch={false}
                      actionButton={
                        <UniformButton
                          buttonStyle="standard"
                          buttonType="primary"
                          size="medium"
                          onClick={() => console.log('Manage teams clicked')}
                        >
                          Manage Teams
                        </UniformButton>
                      }
                    />
                    
                    <div className="teams-table-container">
                      <table className="teams-table">
                        <thead>
                          <tr>
                            <th>Team Name</th>
                            <th className="align-right">Rostered</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registration.invitedTeams.map((team, index) => {
                            // Calculate number of athletes assigned to this team
                            const teamAthletes = registrants ? registrants.filter(r => r.team === team).length : 0;
                            const teamCapacity = 16;
                            
                            return (
                              <tr key={index}>
                                <td className="team-name">{team}</td>
                                <td className="align-right">{teamAthletes}/{teamCapacity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--u-space-four, 64px) var(--u-space-two, 32px)',
                  textAlign: 'center',
                  color: 'var(--u-color-base-foreground, #36485c)',
                  minHeight: '400px'
                }}>
                  <h3 style={{ 
                    fontFamily: 'var(--u-font-body)',
                    fontSize: 'var(--u-font-size-xlarge, 20px)',
                    fontWeight: 'var(--u-font-weight-semibold, 600)',
                    marginBottom: 'var(--u-space-half, 8px)',
                    color: 'var(--u-color-base-foreground-contrast, #071c31)'
                  }}>
                    No Teams Linked Yet
                  </h3>
                  <p style={{ 
                    fontFamily: 'var(--u-font-body)',
                    fontSize: 'var(--u-font-size-medium, 16px)',
                    lineHeight: '1.5',
                    marginBottom: 'var(--u-space-one-and-half, 24px)',
                    color: 'var(--u-color-base-foreground, #36485c)',
                    maxWidth: '480px'
                  }}>
                    Link teams to this registration to invite all their athletes at once. Athletes from linked teams will be able to register directly.
                  </p>
                  <UniformButton
                    buttonStyle="standard"
                    buttonType="primary"
                    size="medium"
                    onClick={() => console.log('Link teams clicked')}
                  >
                    Link Teams
                  </UniformButton>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      
      {/* Toast Notification */}
      {toastMessage && (
        <Toast 
          message={toastMessage}
          onClose={() => setToastMessage(null)}
          duration={3000}
        />
      )}
    </>
  );
};

export default RegistrationOverview;

