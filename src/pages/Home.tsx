import { useDispatch, useSelector } from 'react-redux';
import { logoutWithGoogle } from '../service/firebase';
import { selectLoginDetails, setLogOut } from './login/loginSlice';
import { useNavigate } from 'react-router-dom';
import Authorize from '../components/Authorize';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetail = useSelector(selectLoginDetails);
  return (
    <>
      <h1>
        Hey {userDetail.displayName} Welcome to Home...You are logged in
        successfully
      </h1>
      <button
        onClick={async () => {
          const isLoggedOut = await logoutWithGoogle();
          if (isLoggedOut) {
            dispatch(setLogOut());
            localStorage.clear();
            navigate('/');
          }
        }}
      >
        Logout
      </button>
    </>
  );
};

// export default Authorize(Home);

export default Home;
