import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = (props: any) => {
  const { layout: Layout, component: Component, session, ...rest } = props;
  const loginStatus = Boolean(localStorage.getItem('isUserLoggedIn'));

  if (!loginStatus) {
    return <Navigate to="/" replace />;
  }
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default ProtectedRoute;
