import { useEffect } from 'react';
import { setUser, clearAuth, setToken } from '@/redux/auth/auth.slice';
import { RootState, useAppDispatch, useAppSelector,AppDispatch } from '@/redux/store';
import { useToast } from "@/components/ui/use-toast"


const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { toast } = useToast()
  
  const token = localStorage.getItem('token');
  useEffect(() => {
    
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
          toast({
            title: 'Error:',
            description: "Please check your internet connection and try again.",
          })
          console.error('Error fetching user data:', error);
          dispatch(clearAuth());
        });
    }
  }, [ dispatch,token]);

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(clearAuth());
    toast({
      title: 'Logged out',
      description: "You have been successfully logged out",
    })
  };

  return { user, logoutUser };
};

export default useAuthSession;