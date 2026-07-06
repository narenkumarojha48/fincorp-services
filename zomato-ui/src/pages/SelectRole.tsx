import { useState } from "react";
import axios from "axios";
import api from "../hooks/axiosInterceptor";
import { type Role } from "../types";
import {  useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext";

const SelectRole = () => {
  const [role, setRole] = useState<Role>(null);
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const roles: Role[] = ["customer", "admin", "rider", "seller"];
  const addRole = async () => {
    try {
      const res = await api.put(
        `/auth/addrole`,
        { roles: role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      navigate("/");
    } catch (error) {
      alert("Something went wrong.");
    }
  };
  return (
    <div className="flex min-h-screen justify-center items-center bg-white">
      <div>
        <h4 className="text-center text-2xl font-bold"> Choose your role</h4>
        {<p>{role}</p>}
        <div className="space-y-4">
          {roles.map((rol) => (
            <button
              className={`border w-full rounded-xl px-4 py-3 text-sm font-medium capitalize transition ${rol===role?"bg-[#E23744] text-white":"border-gray-300  hover:bg-gray-50 text-gray-700"}`}
              onClick={() => setRole(rol)}
            >
              Continue as {rol}
            </button>
          ))}
          <button disabled={!role} className={`border w-full rounded-xl text-sm font-semibold px-4 py-3 transition ${!role? "cursor-not-allowed":"bg-[#E23566] cursor-pointer"}
          `} onClick={addRole}>Next</button>
        </div>
        
      </div>
    </div>
  );
};

export default SelectRole;
