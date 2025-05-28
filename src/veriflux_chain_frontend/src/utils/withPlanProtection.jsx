import React from 'react';
// import { useUser, PLAN_LEVELS } from '../utils/UserContext';
import { Navigate } from 'react-router-dom';

export function withPlanProtection(WrappedComponent, requiredPlan = "basic") {
  return function ProtectedComponent(props) {
    const { user } = useUser();

    const userLevel = PLAN_LEVELS.indexOf(user.plan);
    const requiredLevel = PLAN_LEVELS.indexOf(requiredPlan);

    if (userLevel < requiredLevel) {
      alert(`Access denied. Upgrade to at least '${requiredPlan}' plan.`);
      return <Navigate to="/dashboard" replace />;
    }

    return <WrappedComponent {...props} />;
  };
}
