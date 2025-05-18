import React from 'react';
import './Plan.scss';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaRocket, FaCrown, FaGem } from 'react-icons/fa';

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["1 certificate/month", "Basic dashboard", "Email support"],
    highlight: "Your Current Plan",
    icon: <FaLeaf className="plan-icon" />,
  },
  {
    name: "Basic",
    price: 5,
    features: ["50 certificates/month", "Basic analytics", "Support chat"],
    icon: <FaRocket className="plan-icon" />,
  },
  {
    name: "Standard",
    price: 15,
    features: ["500 certificates/month", "Advanced analytics", "Bulk uploads", "Priority support"],
    highlight: "Popular",
    icon: <FaCrown className="plan-icon" />,
  },
  {
    name: "Premium",
    price: 29,
    features: ["Unlimited certificates", "Custom branding", "Smart contract API", "24/7 support"],
    icon: <FaGem className="plan-icon" />,
  },
];

const Plan = () => {
  const navigate = useNavigate();

  const handleUpgrade = (planName) => {
    // Optionally send selected plan to payment page
    navigate('/payment', { state: { plan: planName } });
  };

  return (
    <section className="pricing-section">
      <div className="pricing-header">
        <h2 className="title">Pricing Plans</h2>
        <p className="subtitle">
          Choose the right Veriflux plan for your certificate needs.
        </p>
      </div>

      <div className="plan-grid">
        {plans.map((plan) => (
          <div className={`plan-card ${plan.highlight ? "highlight" : ""}`} key={plan.name}>
            {plan.highlight && <span className="badge">{plan.highlight}</span>}
            <div className="icon-container">{plan.icon}</div>
            <h3>{plan.name}</h3>
            <p className="plan-price">
              ${plan.price}<span className="per">/month</span>
            </p>
            <ul className="features">
              {plan.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>
            <button
              className={`btn ${plan.highlight === "Your Current Plan" ? "disabled" : "active"}`}
              onClick={() => handleUpgrade(plan.name)}
              disabled={plan.highlight === "Your Current Plan"}
            >
              {plan.highlight === "Your Current Plan" ? plan.highlight : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Plan;
