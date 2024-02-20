// PaymentModal.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const PaymentModal = ({ onClose }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    // 결제 로직 추가
    console.log(`Payment with ${selectedPaymentMethod}`);

    // 결제 후 모달을 닫습니다.
    onClose();
  };

  return (
    <div className="payment-modal">
      <div className="payment-container">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h1>Choose Payment Method</h1>

        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={selectedPaymentMethod === "creditCard"}
              onChange={() => handlePaymentMethodChange("creditCard")}
            />
            신용카드
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="debitCard"
              checked={selectedPaymentMethod === "debitCard"}
              onChange={() => handlePaymentMethodChange("debitCard")}
            />
            체크카드
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="kakaoPay"
              checked={selectedPaymentMethod === "kakaoPay"}
              onChange={() => handlePaymentMethodChange("kakaoPay")}
            />
            카카오페이
          </label>

          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="tossPay"
              checked={selectedPaymentMethod === "tossPay"}
              onChange={() => handlePaymentMethodChange("tossPay")}
            />
            토스페이
          </label>
        </div>

        <button className="payment-button" onClick={handlePayment}>
          결제하기
        </button>
        <br />
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default PaymentModal;
