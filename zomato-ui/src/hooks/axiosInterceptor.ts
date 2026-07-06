import axios from "axios";
import { toast } from 'react-hot-toast';
// import { useAppContext } from "../contexts/appContext";
const api = axios.create({baseURL:`${import.meta.env.VITE_API_URL}`,withCredentials: true,})
// const {setIsOnline} = useAppContext()

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access_token");
//   if (true) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
let failedQue= []
let isRefreshing = false
const MAX_RETRIES = 3
function processQue(err){
  failedQue.forEach((prom)=>{
    if(!err){
      prom.resolve()
    }
    prom.reject(err)
  })
  failedQue = []
};

api.interceptors.response.use((response)=>{
    // setIsOnline(true)
    return response
},async(error)=>{
    if(!error.response){
        // setIsOnline(false)
    }else{
        // setIsOnline(true)
    }
   // 1. Check if it's a "Network Error" (request never reached server)
    if (error.message === "Network Error") {
      toast.error("Network Error: Please check your internet connection or CORS settings.", {
        className: 'bg-red-50 text-red-800 border-l-4 border-red-500 font-medium shadow-lg',
      });
    }
    let originalRequest = error.config
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // 2. Handle specific HTTP status codes
    if (error.response) {
      if(error.response?.status === 400){
        toast.error(error.response?.data?.message);
      }

      if (error.response.status === 401) {
        
          if( error.response.status === 401 && originalRequest._retryCount < MAX_RETRIES  ){
            if(isRefreshing){
              return new Promise((resolve,reject)=>{{
                failedQue.push({resolve,reject})
              }}).then(()=>api(originalRequest))
            }
            isRefreshing=true
            originalRequest._retryCount+=1
            try {
              console.log("Making api call originalRequest._retryCount",originalRequest._retryCount)
              let res = await api(`${import.meta.env.VITE_API_URL}/auth/refreshtoken`)
                processQue(null)
               return api(originalRequest)
            } catch (error) {
              processQue(error)
              if(originalRequest._retryCount>=MAX_RETRIES){
                window.location.href="/login"
              }
               return Promise.reject(error);
            }finally{
              isRefreshing=false
            }
            
          }
        toast.error("Session expired. Please log in again.");
        // Optional: redirect to login
      } else if (error.response.status === 500) {
        toast.error("Server-side error. Try again later.");
      }
    }
    return Promise.reject(error)
})
export default api