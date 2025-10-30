import React, { useState } from 'react';
import PageHeader from './PageHeader';
import DataWidget from './DataWidget';
import UniformButton from './UniformButton';
import TableToolbar from './TableToolbar';
import RefundModal from './RefundModal';
import CancelModal from './CancelModal';
import CancelPlanModal from './CancelPlanModal';
import { IconCopy, IconCheck, IconMore } from './UniformIcons';

/**
 * RegistrantDetails Component - Individual registrant detail page
 * Shows registrant information, fees, and payment history
 * Reuses PageHeader and DataWidget components
 */
const RegistrantDetails = ({ 
  registrant,
  onBack = () => {},
  breadcrumbText = "Programs",
  onRefund = () => {},
  onCancel = () => {},
  onCancelPlan = () => {}
}) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCancelPlanModal, setShowCancelPlanModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentPlanMenuOpen, setPaymentPlanMenuOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(registrant.email).then(() => {
      setEmailCopied(true);
      // Reset the checkmark after 2 seconds
      setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    });
  };

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleRefund = (payment, index) => {
    setSelectedPayment(payment);
    setShowRefundModal(true);
    setOpenMenuIndex(null);
  };

  const handleRefundSubmit = (refundData) => {
    onRefund(refundData);
  };

  const handleCancel = (payment, index) => {
    setSelectedPayment(payment);
    setShowCancelModal(true);
    setOpenMenuIndex(null);
  };

  const handleCancelSubmit = (cancelData) => {
    onCancel(cancelData);
  };

  const handleEdit = (payment, index) => {
    console.log('Edit clicked for payment:', payment);
    setOpenMenuIndex(null);
  };

  const handlePaymentPlanMenuToggle = () => {
    setPaymentPlanMenuOpen(!paymentPlanMenuOpen);
  };

  const handleCancelPlan = () => {
    setShowCancelPlanModal(true);
    setPaymentPlanMenuOpen(false);
  };

  const handleCancelPlanSubmit = ({ selectedPayments, note }) => {
    onCancelPlan({ registrant, scheduledPayments: selectedPayments, note });
  };


  // Calculate payment plan details
  const scheduledPayments = registrant.payments.filter(p => p.status === 'Scheduled');
  const hasActivePaymentPlan = registrant.paymentPlan !== 'Full Payment' && scheduledPayments.length > 0;
  const paymentPlanStatus = scheduledPayments.length > 0 ? 'Active' : 'Cancelled';
  
  let nextPayment = null;
  if (scheduledPayments.length > 0) {
    // Find the earliest scheduled payment
    const sortedPayments = [...scheduledPayments].sort((a, b) => new Date(a.date) - new Date(b.date));
    const next = sortedPayments[0];
    nextPayment = `${next.date} for ${next.amount}`;
  }

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.payment-action-menu-container') && 
          !event.target.closest('.payment-plan-action-menu-container')) {
        setOpenMenuIndex(null);
        setPaymentPlanMenuOpen(false);
      }
    };

    if (openMenuIndex !== null || paymentPlanMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openMenuIndex, paymentPlanMenuOpen]);

  return (
    <>
      <style>
        {`
          .registrant-details-main {
            background-color: white;
            padding: 28px 64px;
            display: flex;
            flex-direction: column;
            gap: var(--u-space-two, 32px);
          }

          .registrant-details-widgets {
            display: flex;
            gap: var(--u-space-three, 48px);
          }

          .registrant-details-payment-plan-table th:nth-child(1),
          .registrant-details-payment-plan-table td:nth-child(1) {
            width: 20%;
          }

          .registrant-details-payment-plan-table th:nth-child(2),
          .registrant-details-payment-plan-table td:nth-child(2) {
            width: auto;
          }

          .registrant-details-payment-plan-table th:nth-child(3),
          .registrant-details-payment-plan-table td:nth-child(3) {
            width: 10%;
          }

          .registrant-details-payment-plan-table th:nth-child(4),
          .registrant-details-payment-plan-table td:nth-child(4) {
            width: 13%;
          }

          .registrant-details-payment-plan-table th:nth-child(5),
          .registrant-details-payment-plan-table td:nth-child(5) {
            width: 7%;
          }

          .registrant-details-payment-plan-table td.payment-plan-col {
            font-weight: var(--u-font-weight-bold, 700);
          }

          .registrant-details-payment-plan-table tbody tr:hover {
            background-color: transparent;
            cursor: default;
          }

          .payment-plan-status-badge {
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

          .payment-plan-status-badge.active {
            background-color: var(--u-color-background-positive-subtle, #ebf5ff);
            color: var(--u-color-emphasis-background-contrast, #0273e3);
          }

          .payment-plan-status-badge.cancelled {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrant-details-table-container {
            width: 100%;
            background-color: var(--u-color-background-container, #fefefe);
          }

          .registrant-details-table {
            width: 100%;
            border-collapse: collapse;
            font-family: var(--u-font-body);
          }

          .registrant-details-table th:nth-child(1),
          .registrant-details-table td:nth-child(1) {
            width: 20%;
          }

          .registrant-details-table th:nth-child(2),
          .registrant-details-table td:nth-child(2) {
            width: 10%;
          }

          .registrant-details-table th:nth-child(3),
          .registrant-details-table td:nth-child(3) {
            width: 10%;
          }

          .registrant-details-table th:nth-child(4),
          .registrant-details-table td:nth-child(4) {
            width: 10%;
          }

          .registrant-details-table th:nth-child(5),
          .registrant-details-table td:nth-child(5) {
            width: 10%;
          }

          .registrant-details-table th:nth-child(6),
          .registrant-details-table td:nth-child(6) {
            width: 10%;
          }

          .registrant-details-table th:nth-child(7),
          .registrant-details-table td:nth-child(7) {
            width: 10%;
          }

          .registrant-details-table th:nth-child(8),
          .registrant-details-table td:nth-child(8) {
            width: 10%;
          }

          .registrant-details-table thead {
            background-color: transparent;
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
          }

          .registrant-details-table thead tr {
            background-color: transparent !important;
          }

          .registrant-details-table thead tr:hover {
            background-color: transparent !important;
          }

          .registrant-details-table th {
            padding: var(--u-space-three-quarter, 12px) var(--u-space-one, 16px);
            text-align: left;
            font-weight: var(--u-font-weight-bold, 700);
            font-size: var(--u-font-size-small, 14px);
            color: var(--u-color-base-foreground, #36485c);
            letter-spacing: var(--u-letter-spacing-default, 0px);
            line-height: 1.4;
            background-color: transparent;
          }

          .registrant-details-table th.align-right {
            text-align: right;
          }

          .registrant-details-table tbody tr {
            border-bottom: 1px solid var(--u-color-line-subtle, #c4c6c8);
            height: 48px;
          }

          .registrant-details-table tbody tr:last-child {
            border-bottom: none;
          }

          .registrant-details-table tbody tr:hover {
            background-color: transparent;
            cursor: default;
          }

          .registrant-details-table td {
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

          .registrant-details-table td:last-child {
            overflow: visible;
          }

          .registrant-details-table td.align-right {
            text-align: right;
          }

          .registrant-details-table td.description-col {
            font-weight: var(--u-font-weight-bold, 700);
          }

          .registrant-details-table td.refunded-column {
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrant-details-status-badge {
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

          .registrant-details-status-badge.paid {
            background-color: transparent;
            color: var(--u-color-success-foreground, #2e7d32);
          }

          .registrant-details-status-badge.scheduled {
            background-color: rgba(167, 174, 181, 0.2);
            color: var(--u-color-base-foreground, #36485c);
          }

          .registrant-details-status-badge.refunded {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrant-details-status-badge.partially-refunded {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .registrant-details-status-badge.cancelled {
            background-color: var(--u-color-alert-background, #fef0ee);
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .payment-action-menu-container {
            position: relative;
            display: flex;
            justify-content: flex-end;
            width: 100%;
          }

          .payment-action-menu {
            position: absolute;
            right: 0;
            top: 100%;
            margin-top: var(--u-space-quarter, 4px);
            background-color: white;
            border: 1px solid var(--u-color-line-subtle, #c4c6c8);
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            min-width: 160px;
            z-index: 1000;
            overflow: hidden;
          }

          .payment-action-menu-item {
            display: block;
            width: 100%;
            padding: var(--u-space-three-quarter, 12px) var(--u-space-one, 16px);
            border: none;
            background: none;
            text-align: left;
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-small, 14px);
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground-contrast, #071c31);
            cursor: pointer;
            transition: background-color 0.15s ease;
          }

          .payment-action-menu-item:hover {
            background-color: var(--u-color-background-subtle, #f5f6f7);
          }

          .payment-action-menu-item:active {
            background-color: var(--u-color-background-default, #e8eaec);
          }

          .registrant-details-table tbody td:last-child {
            text-align: right;
          }

          @media (max-width: 767px) {
            .registrant-details-main {
              padding: 16px;
            }

            .registrant-details-widgets {
              flex-direction: column;
              gap: var(--u-space-one-half, 24px);
            }
          }
        `}
      </style>
      <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: 'white', minHeight: '100vh' }}>
        <main className="registrant-details-main">
          {/* Page Header */}
          <PageHeader 
            title="Registration Details"
            subtitle={`Registration Date: ${registrant.registrationDate} · Order ID: ${registrant.orderId}`}
            showBreadcrumbs={true}
            showTabs={false}
            showToggle={false}
            showShare={false}
            breadcrumbText={breadcrumbText}
            onMore={() => console.log('More clicked')}
            onBack={onBack}
          />

          {/* Data Widgets */}
          <div className="registrant-details-widgets">
            <DataWidget
              label="Registrant"
              value={registrant.athlete}
              size="small"
              subheader={`${registrant.dob} · ${registrant.gender}`}
              rows={[
                { label: "Primary Contact", value: registrant.primaryContact },
                { 
                  label: "Primary Contact Email", 
                  value: registrant.email,
                  showCopyButton: true
                },
                { label: "Team", value: registrant.team }
              ]}
            />
            
            <DataWidget
              label="Total Fees"
              value={(() => {
                // Calculate net balance: Total Paid to Date - Refunded
                const totalPaid = parseFloat(registrant.totalPaid.replace(/[$,]/g, ''));
                const refunded = parseFloat(registrant.refunded.replace(/[$,]/g, ''));
                const netBalance = totalPaid - refunded;
                return `$${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              })()}
              size="small"
              subheader={`List Price: ${registrant.listPrice}`}
              rows={[
                { label: "Total Paid to Date", value: registrant.totalPaid },
                { label: "Outstanding", value: registrant.outstanding },
                { label: "Refunded", value: registrant.refunded && registrant.refunded !== '$0.00' ? `-${registrant.refunded}` : registrant.refunded }
              ]}
            />
          </div>

          {/* Payment Plan Section - Only show if user is on a payment plan */}
          {registrant.paymentPlan !== 'Full Payment' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half, 8px)' }}>
              <TableToolbar
                title="Payment Plan"
                showFilter={false}
                showSearch={false}
                showDownload={false}
              />
              
              <div className="registrant-details-table-container">
                <table className="registrant-details-table registrant-details-payment-plan-table">
                  <thead>
                    <tr>
                      <th>Payment Plan</th>
                      <th>Next Payment</th>
                      <th>Frequency</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="payment-plan-col">Deposit + {scheduledPayments.length > 0 ? scheduledPayments.length : registrant.payments.filter(p => p.status === 'Cancelled').length} Installments</td>
                      <td>{nextPayment || '—'}</td>
                      <td>Monthly</td>
                      <td>
                        <span className={`payment-plan-status-badge ${paymentPlanStatus.toLowerCase()}`}>
                          {paymentPlanStatus}
                        </span>
                      </td>
                      <td>
                        <div className="payment-plan-action-menu-container" style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                          <UniformButton
                            buttonStyle="ghost"
                            buttonType="subtle"
                            size="small"
                            icon={<IconMore />}
                            onClick={handlePaymentPlanMenuToggle}
                            disabled={!hasActivePaymentPlan}
                          />
                          {hasActivePaymentPlan && paymentPlanMenuOpen && (
                            <div className="payment-action-menu">
                              <button
                                className="payment-action-menu-item"
                                onClick={handleCancelPlan}
                              >
                                Cancel Plan
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payments Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--u-space-half, 8px)' }}>
            <TableToolbar
              title="Payments"
              showFilter={false}
              showSearch={false}
              showDownload={false}
            />
            
            {/* Payments Table */}
            <div className="registrant-details-table-container">
              <table className="registrant-details-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Date</th>
                  <th className="align-right">Amount</th>
                  <th className="align-right">Fees</th>
                  <th className="align-right">Refunded</th>
                  <th className="align-right">Transaction ID</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {registrant.payments.map((payment, index) => (
                  <tr key={index}>
                    <td className="description-col">{payment.description}</td>
                    <td>{payment.date}</td>
                    <td className="align-right">{payment.amount}</td>
                    <td className="align-right">{payment.fees}</td>
                    <td className="align-right refunded-column">{payment.refunded && payment.refunded !== '$0.00' ? payment.refunded : ''}</td>
                    <td className="align-right">{payment.transactionId}</td>
                    <td>
                      <span className={`registrant-details-status-badge ${payment.status.toLowerCase().replace(/ /g, '-')}`}>
                        {payment.status === 'Paid' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {payment.status}
                      </span>
                    </td>
                    <td>
                      <div className="payment-action-menu-container">
                        {payment.status !== 'Refunded' && payment.status !== 'Cancelled' ? (
                          <>
                            <UniformButton
                              buttonStyle="ghost"
                              buttonType="subtle"
                              size="small"
                              icon={<IconMore />}
                              onClick={() => handleMenuToggle(index)}
                            />
                            {openMenuIndex === index && (
                              <div className="payment-action-menu">
                                {payment.status === 'Paid' || payment.status === 'Partially Refunded' ? (
                                  // Paid or partially refunded payments show Refund
                                  <button
                                    className="payment-action-menu-item"
                                    onClick={() => handleRefund(payment, index)}
                                  >
                                    Refund
                                  </button>
                                ) : (
                                  // Scheduled/future payments show Cancel and Edit
                                  <>
                                    <button
                                      className="payment-action-menu-item"
                                      onClick={() => handleCancel(payment, index)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="payment-action-menu-item"
                                      onClick={() => handleEdit(payment, index)}
                                    >
                                      Edit
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </>
                        ) : (
                          // Fully refunded or cancelled - no actions available
                          <UniformButton
                            buttonStyle="ghost"
                            buttonType="subtle"
                            size="small"
                            icon={<IconMore />}
                            disabled={true}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </main>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <RefundModal
          payment={selectedPayment}
          onClose={() => setShowRefundModal(false)}
          onRefund={handleRefundSubmit}
        />
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <CancelModal
          payment={selectedPayment}
          onClose={() => setShowCancelModal(false)}
          onCancel={handleCancelSubmit}
        />
      )}

      {/* Cancel Plan Modal */}
      {showCancelPlanModal && (
        <CancelPlanModal
          scheduledPayments={scheduledPayments}
          onClose={() => setShowCancelPlanModal(false)}
          onCancel={handleCancelPlanSubmit}
        />
      )}
    </>
  );
};

export default RegistrantDetails;

