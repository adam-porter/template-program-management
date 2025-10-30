import React from 'react';

/**
 * RegistrantsTable Component - Displays registrant data with athlete details
 * Uses Uniform Web Storybook design tokens and Barlow font
 */
const RegistrantsTable = ({
  registrants = [],
  onRegistrantClick = () => {}
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
          .registrants-data-table-container {
            width: 100%;
            background-color: var(--u-color-background-container, #fefefe);
            overflow: hidden;
          }

          .registrants-data-table {
            width: 100%;
            border-collapse: collapse;
            font-family: var(--u-font-body);
          }

          .registrants-data-table th:nth-child(1),
          .registrants-data-table td:nth-child(1) {
            width: 20%;
          }

          .registrants-data-table th:nth-child(2),
          .registrants-data-table td:nth-child(2) {
            width: 6%;
          }

          .registrants-data-table th:nth-child(3),
          .registrants-data-table td:nth-child(3),
          .registrants-data-table th:nth-child(4),
          .registrants-data-table td:nth-child(4) {
            width: 11%;
          }

          .registrants-data-table th:nth-child(5),
          .registrants-data-table td:nth-child(5) {
            width: 9%;
          }

          .registrants-data-table th:nth-child(6),
          .registrants-data-table td:nth-child(6) {
            width: 7%;
          }

          .registrants-data-table th:nth-child(7),
          .registrants-data-table td:nth-child(7),
          .registrants-data-table th:nth-child(8),
          .registrants-data-table td:nth-child(8) {
            width: 8%;
          }

          .registrants-data-table th:nth-child(9),
          .registrants-data-table td:nth-child(9) {
            width: 7%;
          }

          .registrants-data-table th:nth-child(10),
          .registrants-data-table td:nth-child(10) {
            width: 13%;
          }

          .registrants-data-table thead {
            background-color: transparent;
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
          }

          .registrants-data-table thead tr {
            background-color: transparent !important;
          }

          .registrants-data-table thead tr:hover {
            background-color: transparent !important;
          }

          .registrants-data-table th {
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

          .registrants-data-table th.align-right {
            text-align: right;
          }

          .registrants-data-table tbody tr {
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
            height: 48px;
          }

          .registrants-data-table tbody tr:last-child {
            border-bottom: none;
          }

          .registrants-data-table tbody tr {
            cursor: pointer;
          }

          .registrants-data-table tbody tr:hover {
            background-color: var(--u-color-background-subtle, #f5f6f7);
          }

          .registrants-data-table td {
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

          .registrants-data-table td.align-right {
            text-align: right;
          }

          .registrants-data-table td.athlete-name {
            font-weight: var(--u-font-weight-bold, 700);
          }

          .registrants-data-table td.refunded-column {
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrants-data-table-status {
            display: inline-flex;
            align-items: center;
            gap: var(--u-space-quarter, 4px);
            padding: 4px var(--u-space-half, 8px);
            border-radius: var(--u-border-radius-medium, 4px);
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-x-small, 12px);
            font-weight: var(--u-font-weight-medium, 500);
            letter-spacing: 0.02em;
          }

          .registrants-data-table-status.paid {
            background-color: transparent;
            color: var(--u-color-success-foreground, #2e7d32);
          }

          .registrants-data-table-status.current {
            background-color: rgba(167, 174, 181, 0.2);
            color: var(--u-color-base-foreground, #36485c);
          }

          .registrants-data-table-status.refunded {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrants-data-table-status.partially-refunded {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrants-data-table-status.cancelled {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrants-data-table-status.overdue {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrants-data-table-status-icon {
            width: 12px;
            height: 12px;
          }

          .registrants-data-table-empty-state {
            padding: var(--u-space-three, 48px) var(--u-space-one, 16px);
            text-align: center;
            background-color: var(--u-color-background-container, #fefefe);
            border: 1px solid var(--u-color-line-subtle, #c4c6c8);
            border-top: none;
          }

          .registrants-data-table-empty-icon {
            width: 64px;
            height: 64px;
            margin: 0 auto var(--u-space-one, 16px);
            color: var(--u-color-base-foreground-subtle, #607081);
          }

          .registrants-data-table-empty-title {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-large, 18px);
            font-weight: var(--u-font-weight-bold, 700);
            color: var(--u-color-base-foreground-contrast, #071c31);
            margin: 0 0 var(--u-space-half, 8px) 0;
          }

          .registrants-data-table-empty-description {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-medium, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground, #36485c);
            margin: 0;
          }
        `}
      </style>
      <div className="registrants-data-table-container">
        <table className="registrants-data-table">
          <thead>
            <tr>
              <th>Athlete</th>
              <th>Gender</th>
              <th>Primary Contact</th>
              <th>Registration</th>
              <th>Team</th>
              <th>Registration Date</th>
              <th className="align-right">Total Paid to Date</th>
              <th className="align-right">Refunded</th>
              <th className="align-right">Outstanding</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {registrants.length > 0 ? (
              registrants.map((registrant, index) => (
                <tr key={index} onClick={() => onRegistrantClick(registrant)}>
                  <td className="athlete-name">{registrant.athlete}</td>
                  <td>{registrant.gender}</td>
                  <td>{registrant.primaryContact}</td>
                  <td>{registrant.registration}</td>
                  <td>{registrant.team}</td>
                  <td>{registrant.registrationDate}</td>
                  <td className="align-right">{registrant.totalPaid}</td>
                  <td className="align-right refunded-column">{formatRefund(registrant.refunded)}</td>
                  <td className="align-right">{registrant.outstanding}</td>
                  <td>
                    <span className={`registrants-data-table-status ${registrant.status.toLowerCase().replace(/ /g, '-')}`}>
                      {registrant.status === 'Paid' && (
                        <svg className="registrants-data-table-status-icon" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {registrant.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ padding: 0, border: 'none' }}>
                  <div className="registrants-data-table-empty-state">
                    <svg className="registrants-data-table-empty-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="32" cy="32" r="30" />
                      <path d="M32 20v16M32 44v0.1" strokeLinecap="round" />
                    </svg>
                    <h3 className="registrants-data-table-empty-title">No registrants found</h3>
                    <p className="registrants-data-table-empty-description">
                      Try adjusting your filters or search to see results.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RegistrantsTable;

