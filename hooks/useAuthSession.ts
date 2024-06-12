"use client";
import { useEffect } from 'react';
import { setUser, clearAuth, setToken } from '@/redux/auth/auth.slice';
import { RootState, useAppDispatch, useAppSelector,AppDispatch } from '@/redux/store';
import { useToast } from "@/components/ui/use-toast"

const useAuthSession = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { toast } = useToast()
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: 'POST'
          });
          const userData = await response.json();
          console.log(userData);
          
          
          dispatch(setUser(userData));
        } catch (error) {
          toast({
            title: 'Error:',
            description: "Please check your internet connection and try again.",
          })
          console.error('Error fetching user data:', error);
          dispatch(clearAuth());
        }
      }
    };
    fetchUserData();
  }, [dispatch,toast]);

  const logoutUser = async() => {
    dispatch(clearAuth());
    localStorage.removeItem('token');
    toast({
      title: 'Logged out',
      description: "You have been successfully logged out",
    }) 
  };

  return { user, logoutUser };
};

export default useAuthSession;