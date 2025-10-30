import React, { useState } from 'react';
import BaseModal from './BaseModal';
import UniformButton from './UniformButton';

const CancelPlanModal = ({ scheduledPayments, onClose, onCancel }) => {
  const [selectedPayments, setSelectedPayments] = useState([]);
  const [note, setNote] = useState('');

  const handleCheckboxChange = (paymentId) => {
    setSelectedPayments(prev => {
      if (prev.includes(paymentId)) {
        return prev.filter(id => id !== paymentId);
      } else {
        return [...prev, paymentId];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedPayments.length > 0) {
      onCancel({
        selectedPayments: scheduledPayments.filter((_, index) => selectedPayments.includes(index)),
        note
      });
      onClose();
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const isSubmitDisabled = selectedPayments.length === 0;

  return (
    <>
      <style>
        {`
          .cancel-plan-modal-divider {
            height: 1px;
            background-color: var(--u-color-line-subtle, #c4c6c8);
            width: 100%;
            margin: 0;
          }

          .cancel-plan-modal-description {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-medium, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            line-height: 1.5;
            color: var(--u-color-base-foreground, #36485c);
          }

          .cancel-plan-modal-section-title {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-medium, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground, #36485c);
            margin: 0 0 var(--u-space-three-quarter, 12px) 0;
          }

          .cancel-plan-modal-checkboxes {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-three-quarter, 12px);
          }

          .cancel-plan-modal-checkbox-item {
            display: flex;
            align-items: center;
            gap: var(--u-space-three-quarter, 12px);
          }

          .cancel-plan-modal-checkbox {
            width: 20px;
            height: 20px;
            border: 1px solid var(--u-color-line-subtle, #c4c6c8);
            border-radius: var(--u-border-radius-small, 2px);
            cursor: pointer;
            flex-shrink: 0;
          }

          .cancel-plan-modal-checkbox-label {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-medium, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground, #36485c);
          }

          .cancel-plan-modal-field {
            display: flex;
            flex-direction: column;
            gap: var(--u-space-quarter, 4px);
            width: 100%;
          }

          .cancel-plan-modal-label {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-medium, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground, #36485c);
            display: flex;
            gap: var(--u-space-eighth, 2px);
          }

          .cancel-plan-modal-required {
            color: var(--u-color-alert-foreground, #bb1700);
          }

          .cancel-plan-modal-textarea {
            width: 100%;
            min-height: 120px;
            padding: var(--u-space-three-quarter, 12px) var(--u-space-one, 16px);
            border: 1px solid var(--u-color-line-subtle, #c4c6c8);
            border-radius: var(--u-border-radius-small, 2px);
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-medium, 16px);
            font-weight: var(--u-font-weight-medium, 500);
            color: var(--u-color-base-foreground-contrast, #071c31);
            background-color: var(--u-color-background-container, #fefefe);
            resize: vertical;
            outline: none;
          }

          .cancel-plan-modal-textarea::placeholder {
            color: var(--u-color-base-foreground-subtle, #607081);
          }

          .cancel-plan-modal-textarea:focus {
            border-color: var(--u-color-emphasis-background-contrast, #0273e3);
          }

          .cancel-plan-modal-help-text {
            font-family: var(--u-font-body);
            font-size: var(--u-font-size-micro, 12px);
            font-weight: var(--u-font-weight-medium, 500);
            line-height: 1.4;
            color: var(--u-color-subtle, #506277);
            margin: 0;
            min-height: 17px;
            background: none;
            border: none;
            padding: 0;
            display: block;
          }

          .cancel-plan-modal-footer {
            display: flex;
            gap: var(--u-space-half, 8px);
            align-items: center;
            justify-content: flex-end;
            width: 100%;
          }
        `}
      </style>

      <BaseModal title="Cancel Payment Plan" onClose={onClose}>
        <div className="cancel-plan-modal-divider"></div>

        <p className="cancel-plan-modal-description">
          Canceling this payment plan will prevent all selected scheduled payments from being processed. This action cannot be undone.
        </p>

        <div>
          <p className="cancel-plan-modal-section-title">Select the payments you'd like to cancel</p>
          <div className="cancel-plan-modal-checkboxes">
            {scheduledPayments.map((payment, index) => (
              <label key={index} className="cancel-plan-modal-checkbox-item">
                <input
                  type="checkbox"
                  className="cancel-plan-modal-checkbox"
                  checked={selectedPayments.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
                <span className="cancel-plan-modal-checkbox-label">
                  {payment.description} for {payment.amount}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="cancel-plan-modal-field">
          <label className="cancel-plan-modal-label">
            Note
          </label>
          <textarea
            className="cancel-plan-modal-textarea"
            placeholder="Add a note about this cancellation..."
            value={note}
            onChange={handleNoteChange}
          />
          <p className="cancel-plan-modal-help-text">
            This note will not be visible to the customer.
          </p>
        </div>

        <div className="cancel-plan-modal-footer">
          <UniformButton
            buttonStyle="minimal"
            buttonType="subtle"
            size="medium"
            onClick={onClose}
          >
            Keep Plan
          </UniformButton>
          <UniformButton
            buttonStyle="standard"
            buttonType="destructive"
            size="medium"
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Cancel Plan
          </UniformButton>
        </div>
      </BaseModal>
    </>
  );
};

export default CancelPlanModal;
