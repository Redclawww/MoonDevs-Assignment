'use client';
import { setToken,setUser } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import { useForm, SubmitHandler } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"

type Inputs = {
  username: string
  password: string
}

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { user, logoutUser } = useAuthSession();
  const { toast } = useToast()
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const {username, password} = data;  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username,password }),
      });
      
      if (response.ok) {
        const { token,user } = await response.json();
        localStorage.setItem('token', token);
        dispatch(setToken(token));
        dispatch(setUser(user));
        toast({
          title: 'Logged in successfully',
          description: "",
          variant: "default"
        })
        
      } else {
        const error = await response.json();
        toast({
          title: error.message,
          description: "Please enter the correct username and password",
        })
      }
    } catch (error) {
      toast({
        title: 'Network error:',
        description: "Please check your internet connection and try again.",
      })
      
    }
  } 

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold text-black">Welcome, {user.username}</h2>
            <button onClick={logoutUser} className='"w-full px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded-md'>Logout</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              defaultValue="test" {...register("username", { required: true })}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            {errors.password && <span className='text-red-500'>This field is required</span>}
            <input
              type="password"
              {...register("password", { required: true })} 
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            {errors.password && <span className='text-red-500'>This field is required</span>}
            <input type="submit" value="Login" className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md" />
            </form>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">The hook should be usable like this: </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
