import { useEffect, useRef, useState,useCallback } from "react";
import { type UseOnlineStatusOptions, type NetworkStatus } from "../types";

const useOnlineStatus = ({
  timeout = 3000,
  interval = 5000,
  retries = 3,
  backOffFactor = 1.5,
  urls = [
    "https://www.google.com/favicon.ico",
    "https://cloudflare.com/cdn-cgi/trace",
  ],
}: UseOnlineStatusOptions = {}): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>("checking");

  const retryCountRef = useRef(0);
  const intervalRef = useRef(interval);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCheckingRef = useRef(false); // ✅ prevent overlap

  const checkConnection = useCallback(async () => {
    
  

    // setStatus((prev) => (prev === "offline" ? "checking" : prev));

    for (const url of urls) {
      try {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        await fetch(url, {
          method: "GET",
          mode: "no-cors",
          cache: "no-cache",
          signal: controller.signal,
        });

        clearTimeout(id);

        retryCountRef.current = 0;
        intervalRef.current = interval;

        setStatus("online");
        isCheckingRef.current = false;
        return;
      } catch {
        // try next URL
      }
    }

    // all failed
    if (retryCountRef.current < retries) {
      retryCountRef.current++;

      intervalRef.current *= backOffFactor;

      timeoutRef.current = setTimeout(() => {
        
        checkConnection();
      }, intervalRef.current);
    } else {
      setStatus("offline");
      // isCheckingRef.current = false;
    }
  },[]);

  useEffect(()=>{
    checkConnection()
  },[])
  return status;
};

export default useOnlineStatus;