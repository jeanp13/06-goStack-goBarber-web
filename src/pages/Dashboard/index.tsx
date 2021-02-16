import React from 'react';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <h1>Dashbord</h1>
      <Button onClick={() => auth.signOut()}>LogOut</Button>
    </>
  );
};

export default Dashboard;
