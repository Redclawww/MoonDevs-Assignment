import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearAuth } from '@/redux/auth/auth.slice';
import { RootState } from '@/redux/store';

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
        .then((userData) => {
          dispatch(setUser(userData));
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          dispatch(clearAuth());
        });
    }
  }, [dispatch]);

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(clearAuth());
  };

  return { user, logoutUser };
};

export default useAuthSession;