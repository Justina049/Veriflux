import React from 'react'
import RecipientDashboard from './RegularView';

const Dashboard = () => {
    // const user = useAuth(); // Or pull from context/state/backend
  
    return (
      <section className="dashboard">
        <h2>Welcome Justy</h2>
        <RecipientDashboard />
        {/* <h2>Welcome, {user.name}</h2> */}
  
        {/* {user.role === 'admin' && <AdminView />}
        {user.role === 'issuer' && <IssuerView plan={user.plan} />}
        {user.role === 'verifier' && <VerifierView />}
        {user.role === 'user' && <RegularView />} */}
      </section>
    );
  };

export default Dashboard