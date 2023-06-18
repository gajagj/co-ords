import { useNavigate } from 'react-router-dom';

const Authorize = ({ Component }: any) => {
  //   const navigate = useNavigate();
  const isLogin = localStorage.getItem('isUserLoggedIn');
  if (isLogin !== 'true') {
    // navigate('/');
    return <div />;
  }
  return <Component />;
};

export default Authorize;
