import React from "react";
const PaymentPopup = ({
  onClose,
  onConfirm,
  onThirdButtonClick,
  onCardPayment,
}) => {
  return (
    <div className="payment-popup">
      <div className="payment-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <p>결제방식</p>
        <button onClick={onConfirm}>무통장 입금</button>
        <button onClick={onCardPayment}>카드 결제</button>
        <button onClick={onThirdButtonClick}>카카오 페이</button>
      </div>
    </div>
  );
};
export default PaymentPopup;
