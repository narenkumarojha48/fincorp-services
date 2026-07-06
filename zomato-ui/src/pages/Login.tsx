import useOnlineStatus from "../hooks/useOnline";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppContext } from "../contexts/appContext";
import api from "../hooks/axiosInterceptor";
import { toast } from 'react-hot-toast';

import axios from "axios";


const Login = () => {
  // const isOnlineStatus = useOnlineStatus();
  const { user, setUser } = useAppContext();
  const handleSocialLogin =  async(provider: string) => {
    console.log("Login with ", provider);
       if (provider === "google") {
      await googleLogin();
    } else if (provider === "facebook") {
    } else if (provider === "twitter") {
    }
  };
  // const googleLogin = async()=>{
  //   try {
  //       const res = await api.post(
  //         `${import.meta.env.VITE_API_URL}/auth/login`,
  //         {
  //           code: 1234567,
  //           roles: "admin",
  //         },
  //       );
  //       setUser(res.data.user);
  //     } catch (error) {
        
       
  //       console.log(JSON.stringify(error));
  //     }
  // }
  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await api.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          {
            code: codeResponse.code,
            roles: "admin",
          },
        );
        if(res.status===200){
          setUser(res.data);
          toast.success(res.data.message ||"Something went wrong")
        }else{
          toast.error(res.data.message)
        }
        
        console.log(JSON.stringify(res))
      } catch (error) {
        //  if(error?.response){
        //     toast.error(error?.response?.data?.message)
        //  }
        //  toast.error("Something went wrong")
        // throw error;
        // console.log(JSON.stringify(error));
         console.log(error?.message);      // "Request failed with status code 404"
         console.log(error?.response.data); // The actual JSON body from the server
         console.log(error?.response.status); 
      }
    },
    onError: (error) => {
      console.log("google error", JSON.stringify(error));
      // toast.error("Something went wrong")
    },
    flow: "auth-code",
  });
  return (
    <div>
      Login
      {/* <div>isOnlineStatus:{isOnlineStatus}</div> */}
      <div>User :{JSON.stringify(user)}</div>
      <div className="flex flex-col justify-center p-5">
        <button
          className="bg-amber-200 hover:bg-gray-50 cursor-pointer"
          onClick={() => handleSocialLogin("google")}
        >
          Login with Google
        </button>
        <button
          className="hover:bg-gray-50"
          onClick={() => handleSocialLogin("facebook")}
        >
          Login with Facebook
        </button>
        <button
          className="hover:bg-gray-50"
          onClick={() => handleSocialLogin("twitter")}
        >
          Login with Twitter
        </button>
      </div>
    </div>
  );
};

export default Login;
