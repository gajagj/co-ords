import { Navigate } from 'react-router-dom';

const PreventedRoute = (props: any) => {
  const { layout: Layout, component: Component, session, ...rest } = props;
  const loginStatus = Boolean(window.localStorage.getItem('isUserLoggedIn'));

  if (loginStatus) {
    return <Navigate to="/home" replace />;
  }

  if (!Layout) {
    return <Component {...props} />;
  }
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default PreventedRoute;
