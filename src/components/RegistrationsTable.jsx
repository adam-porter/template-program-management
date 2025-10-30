import React from 'react';

/**
 * RegistrationsTable Component - Registrations data table with Uniform design
 * Displays registration data with toggles for enabling/disabling registrations
 * Uses Uniform Web Storybook design tokens and Barlow font
 */
const RegistrationsTable = ({
  registrations = [],
  onToggleRegistration = () => {},
  onRegistrationClick = () => {}
}) => {
  // Format refund amount as negative with commas
  const formatRefund = (refundString) => {
    if (!refundString || refundString === '$0.00') {
      return '';
    }
    // Remove $ and parse the number
    const amount = parseFloat(refundString.replace(/[$,]/g, ''));
    if (amount === 0) {
      return '';
    }
    // Format with comma and return as negative
    return `-$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      <style>
        {`
          .registrations-table-container {
            width: 100%;
            background-color: var(--u-color-background-container, #fefefe);
            overflow: hidden;
          }

          .registrations-table {
            width: 100%;
            border-collapse: collapse;
            font-family: var(--u-font-body);
          }

          .registrations-table th:nth-child(1),
          .registrations-table td:nth-child(1) {
            width: 20%;
          }

          .registrations-table th:nth-child(2),
          .registrations-table td:nth-child(2),
          .registrations-table th:nth-child(3),
          .registrations-table td:nth-child(3),
          .registrations-table th:nth-child(4),
          .registrations-table td:nth-child(4),
          .registrations-table th:nth-child(5),
          .registrations-table td:nth-child(5),
          .registrations-table th:nth-child(6),
          .registrations-table td:nth-child(6),
          .registrations-table th:nth-child(7),
          .registrations-table td:nth-child(7),
          .registrations-table th:nth-child(8),
          .registrations-table td:nth-child(8) {
            width: 9%;
          }

          .registrations-table th:nth-child(9),
          .registrations-table td:nth-child(9) {
            width: 8%;
          }

          .registrations-table thead {
            background-color: transparent;
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
          }

          .registrations-table thead tr {
            background-color: transparent !important;
          }

          .registrations-table thead tr:hover {
            background-color: transparent !important;
          }

          .registrations-table th {
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

          .registrations-table th.align-right,
          .registrations-table td.align-right {
            text-align: right;
          }

          .registrations-table th.align-center,
          .registrations-table td.align-center {
            text-align: center;
          }

          .registrations-table td.refunded-column {
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrations-table tbody tr {
            border-bottom: 1px dashed var(--u-color-line-subtle, #c4c6c8) !important;
          }

          .registrations-table tbody tr:last-child {
            border-bottom: none;
          }

          .registrations-table tbody tr:hover {
            background-color: var(--u-color-background-subtle, #f5f6f7);
          }

          .registrations-table tbody tr {
            height: 48px;
            cursor: pointer;
          }

          .registrations-table td {
            padding: var(--u-space-half, 8px) var(--u-space-one, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            font-size: var(--u-font-size-small, 14px);
            color: var(--u-color-base-foreground-contrast, #071c31);
            letter-spacing: var(--u-letter-spacing-default, 0px);
            line-height: 1.4;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .registrations-table-title-link {
            color: var(--u-color-base-foreground-contrast, #071c31);
            text-decoration: none;
            cursor: pointer;
            font-weight: var(--u-font-weight-bold, 700);
          }

          .registrations-toggle {
            width: 32px;
            height: 20px;
            background-color: var(--u-color-emphasis-background-contrast, #0273e3);
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 4px;
            justify-content: flex-end;
            transition: all 0.2s ease;
            margin: 0 auto;
          }

          .registrations-toggle.off {
            background-color: var(--u-color-base-background-contrast, #607081);
            justify-content: flex-start;
          }

          .registrations-toggle-knob {
            width: 12px;
            height: 12px;
            background-color: var(--u-color-emphasis-foreground-reversed, #fefefe);
            border-radius: 9999px;
          }
        `}
      </style>
      <div className="registrations-table-container">
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Registration Title</th>
              <th className="align-right">Registrants</th>
              <th className="align-right">Total Fees</th>
              <th className="align-right">Refunded</th>
              <th className="align-right">Outstanding</th>
              <th className="align-right">List Price</th>
              <th className="align-right">Capacity</th>
              <th className="align-right">Teams</th>
              <th className="align-center">Registration</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((registration, index) => (
              <tr 
                key={index}
                onClick={() => onRegistrationClick(registration)}
              >
                <td>
                  <span className="registrations-table-title-link">
                    {registration.title}
                  </span>
                </td>
                <td className="align-right">{registration.count}</td>
                <td className="align-right">{registration.totalCollected}</td>
                <td className="align-right refunded-column">{formatRefund(registration.refunded)}</td>
                <td className="align-right">{registration.outstanding}</td>
                <td className="align-right">{registration.listPrice}</td>
                <td className="align-right">
                  {typeof registration.capacity === 'object' 
                    ? `${registration.capacity.current}/${registration.capacity.max}`
                    : registration.capacity}
                </td>
                <td className="align-right">{registration.invitedTeams?.length || registration.teams || 0}</td>
                <td className="align-center">
                  <button
                    className={`registrations-toggle ${registration.enabled ? '' : 'off'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRegistration(registration, index);
                    }}
                    aria-label={`Toggle registration ${registration.enabled ? 'off' : 'on'}`}
                  >
                    <div className="registrations-toggle-knob"></div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegistrationsTable;

