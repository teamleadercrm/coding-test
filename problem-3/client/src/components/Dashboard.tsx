import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to={'/orders'}>Orders</Link>
    </>
  );
};

export default Dashboard;