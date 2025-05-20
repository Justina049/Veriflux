// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './Payment.scss';

// const plans = {
//   Free: 0,
//   Basic: 5,
//   Standard: 15,
//   Premium: 29,
// };

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const plan = location.state?.plan;

//   const [paymentMethod, setPaymentMethod] = useState('card');

//   if (!plan || !plans.hasOwnProperty(plan)) {
//     return <div className="payment-error">No plan selected. Please go back and choose a plan.</div>;
//   }

//   const amount = plans[plan];

//   const updateUserPlan = (selectedPlan) => {
//     alert(`Your plan has been upgraded to: ${selectedPlan}`);
//     navigate('/dashboard');
//   };

//   const handleCardPayment = async () => {
//     alert(`Paid $${amount} for ${plan} plan via card.`);
//     updateUserPlan(plan);
//   };

//   const handleICPTokenPayment = async () => {
//     const amountInE8s = amount * 100_000_000;
//     const recipient = "YOUR_RECEIVER_PRINCIPAL_ID"; // 👈 Replace with your receiver/canister Principal ID
//     const whitelist = ["YOUR_CANISTER_ID"]; // 👈 Replace with your canister ID

//     if (!(window.ic && window.ic.plug)) {
//       alert("Plug wallet not found. Please install and connect it.");
//       return;
//     }

//     try {
//       await window.ic.plug.requestConnect({ whitelist });

//       const result = await window.ic.plug.requestTransfer({
//         to: recipient,
//         amount: amountInE8s,
//       });

//       console.log("ICP Transfer Result:", result);
//       alert("ICP Payment successful!");
//       updateUserPlan(plan);
//     } catch (err) {
//       console.error("ICP Payment Error:", err);
//       alert("ICP payment failed.");
//     }
//   };

//   const handlePayment = () => {
//     if (paymentMethod === 'card') return handleCardPayment();
//     if (paymentMethod === 'icp') return handleICPTokenPayment();
//     alert('Selected payment method is not supported yet.');
//   };

//   return (
//     <div className="checkout-container">
//       <div className="checkout-left">
//         <h2>Checkout</h2>
//         <p>All plans include 40+ advanced tools and features to boost your product.</p>

//         <div className="payment-methods">
//           <label className={paymentMethod === 'card' ? 'selected' : ''}>
//             <input type="radio" name="method" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
//             <span className="method-label">💳 Credit Card</span>
//           </label>
//           <label className={paymentMethod === 'paypal' ? 'selected' : ''}>
//             <input type="radio" name="method" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} />
//             <span className="method-label">🅿️ Paypal</span>
//           </label>
//           <label className={paymentMethod === 'plug' ? 'selected' : ''}>
//             <input type="radio" name="method" checked={paymentMethod === 'icp'} onChange={() => setPaymentMethod('icp')} />
//             <span className="method-label">🌐 ICP (Plug Wallet)</span>
//           </label>
//         </div>

//         {paymentMethod === 'card' && (
//           <>
//             <div className="billing-details">
//               <h3>Billing Details</h3>
//               <input type="email" placeholder="Email Address" />
//               <input type="password" placeholder="Password" />
//               <select>
//                 <option>Select Country</option>
//                 <option>Nigeria</option>
//                 <option>USA</option>
//               </select>
//               <input type="text" placeholder="Billing Zip / Postal Code" />
//             </div>

//             <div className="credit-card-info">
//               <h3>Credit Card Info</h3>
//               <input type="text" placeholder="Card Number" />
//               <input type="text" placeholder="Name" />
//               <div className="card-subfields">
//                 <input type="text" placeholder="MM/YY" />
//                 <input type="text" placeholder="CVV" />
//               </div>
//             </div>
//           </>
//         )}

//         {paymentMethod === 'plug' && (
//           <>
//             {!isPlugConnected ? (
//               <button onClick={connectPlugWallet} className="wallet-btn">🔌 Connect Plug Wallet</button>
//             ) : (
//               <>
//                 <p className="wallet-address">Wallet: {principal}</p>
//                 <button className="payment-btn" onClick={handleICPTokenPayment}>
//                   Pay {amount} ICP
//                 </button>
//               </>
//             )}
//           </>
//         )}

//         {paymentMethod === 'paypal' && (
//           <button className="payment-btn" onClick={handlePayPal}>
//             Pay with PayPal
//           </button>
//         )}


//       </div>

//       <div className="checkout-right">
//         <h3>Order Summary</h3>
//         <div className="summary-box">
//           <p className="summary-plan">{plan} Plan</p>
//           <h2>${amount}.00 <span>/month</span></h2>
//           <button className="change-plan-btn">Change Plan</button>
//         </div>
//         <div className="summary-totals">
//           <div className="row">
//             <span>Subtotal</span>
//             <span>${(amount + 25).toFixed(2)}</span>
//           </div>
//           <div className="row">
//             <span>Tax</span>
//             <span>$4.99</span>
//           </div>
//           <div className="row total">
//             <span>Total</span>
//             <span>${(amount + 25 + 4.99).toFixed(2)}</span>
//           </div>
//         </div>
//         <button className="payment-btn" onClick={handlePayment}>
//           Proceed with Payment
//         </button>
//         <p className="terms">
//           By continuing, you accept our Terms of Services and Privacy Policy. Payments are non-refundable.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Payment;






import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.scss';

const plans = {
  Free: 0,
  Basic: 5,
  Standard: 15,
  Premium: 29,
};

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPlugConnected, setIsPlugConnected] = useState(false);
  const [principal, setPrincipal] = useState('');

  if (!plan || !plans.hasOwnProperty(plan)) {
    return <div className="payment-error">No plan selected. Please go back and choose a plan.</div>;
  }

  const amount = plans[plan];

  const updateUserPlan = (selectedPlan) => {
    alert(`Your plan has been upgraded to: ${selectedPlan}`);
    navigate('/dashboard');
  };

  const handleCardPayment = async () => {
    alert(`Paid $${amount} for ${plan} plan via card.`);
    updateUserPlan(plan);
  };

  const connectPlugWallet = async () => {
    const whitelist = ['YOUR_CANISTER_ID']; // 👈 Replace with your actual canister ID

    try {
      const connected = await window.ic.plug.requestConnect({ whitelist });
      if (connected) {
        const principalId = await window.ic.plug.getPrincipal();
        setPrincipal(principalId.toText());
        setIsPlugConnected(true);
      }
    } catch (e) {
      alert("Failed to connect to Plug wallet.");
      console.error(e);
    }
  };

  const handleICPTokenPayment = async () => {
    const amountInE8s = amount * 100_000_000;
    const recipient = 'YOUR_RECEIVER_PRINCIPAL_ID'; // 👈 Replace with your receiver/canister Principal ID

    if (!(window.ic && window.ic.plug)) {
      alert('Plug wallet not found. Please install and connect it.');
      return;
    }

    try {
      const result = await window.ic.plug.requestTransfer({
        to: recipient,
        amount: amountInE8s,
      });

      console.log('ICP Transfer Result:', result);
      alert('ICP Payment successful!');
      updateUserPlan(plan);
    } catch (err) {
      console.error('ICP Payment Error:', err);
      alert('ICP payment failed.');
    }
  };

  const handlePayPal = () => {
    alert(`PayPal integration is not implemented yet. Selected plan: ${plan}`);
  };

  const handlePayment = () => {
    if (paymentMethod === 'card') return handleCardPayment();
    if (paymentMethod === 'plug') return handleICPTokenPayment();
    if (paymentMethod === 'paypal') return handlePayPal();
    alert('Selected payment method is not supported yet.');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Checkout</h2>
        <p>All plans include 40+ advanced tools and features to boost your product.</p>

        <div className="payment-methods">
          <label className={paymentMethod === 'card' ? 'selected' : ''}>
            <input
              type="radio"
              name="method"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <span className="method-label">💳 Credit Card</span>
          </label>

          <label className={paymentMethod === 'paypal' ? 'selected' : ''}>
            <input
              type="radio"
              name="method"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
            />
            <span className="method-label">🅿️ PayPal</span>
          </label>

          <label className={paymentMethod === 'plug' ? 'selected' : ''}>
            <input
              type="radio"
              name="method"
              checked={paymentMethod === 'plug'}
              onChange={() => setPaymentMethod('plug')}
            />
            <span className="method-label">🌐 ICP (Plug Wallet)</span>
          </label>
        </div>

        {paymentMethod === 'card' && (
          <>
            <div className="billing-details">
              <h3>Billing Details</h3>
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <select>
                <option>Select Country</option>
                <option>Nigeria</option>
                <option>USA</option>
              </select>
              <input type="text" placeholder="Billing Zip / Postal Code" />
            </div>

            <div className="credit-card-info">
              <h3>Credit Card Info</h3>
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Name" />
              <div className="card-subfields">
                <input type="text" placeholder="MM/YY" />
                <input type="text" placeholder="CVV" />
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'plug' && (
          <>
            {!isPlugConnected ? (
              <button onClick={connectPlugWallet} className="wallet-btn">
                🔌 Connect Plug Wallet
              </button>
            ) : (
              <>
                <p className="wallet-address">Wallet: {principal}</p>
                <button className="payment-btn" onClick={handleICPTokenPayment}>
                  Pay {amount} ICP
                </button>
              </>
            )}
          </>
        )}

        {paymentMethod === 'paypal' && (
          <button className="payment-btn" onClick={handlePayPal}>
            Pay with PayPal
          </button>
        )}
      </div>

      <div className="checkout-right">
        <h3>Order Summary</h3>
        <div className="summary-box">
          <p className="summary-plan">{plan} Plan</p>
          <h2>${amount}.00 <span>/month</span></h2>
          <button className="change-plan-btn">Change Plan</button>
        </div>

        <div className="summary-totals">
          <div className="row">
            <span>Subtotal</span>
            <span>${(amount + 25).toFixed(2)}</span>
          </div>
          <div className="row">
            <span>Tax</span>
            <span>$4.99</span>
          </div>
          <div className="row total">
            <span>Total</span>
            <span>${(amount + 25 + 4.99).toFixed(2)}</span>
          </div>
        </div>

        <button
          className="payment-btn"
          onClick={handlePayment}
          disabled={paymentMethod === 'plug' && !isPlugConnected}
        >
          Proceed with Payment
        </button>

        <p className="terms">
          By continuing, you accept our Terms of Services and Privacy Policy. Payments are non-refundable.
        </p>
      </div>
    </div>
  );
};

export default Payment;
