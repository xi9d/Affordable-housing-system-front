import React, {useEffect, useState} from 'react';
import AccountsService from "../Service/AccountsService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from "../Hooks/AuthContext";
import {useNavigate} from "react-router-dom";

function Login() {
  const { setIsLoggedIn, setUserName } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLandlord, setIsLandlord] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = sessionStorage.getItem("id");
      await AccountsService.authenticate({email, password, isLandlord});
      setUserName(sessionStorage.getItem("username"));
      setIsLoggedIn(true);
      toast.success('Login was successful');
      navigate(`/profile?id=${id}`);
    } catch (err) {
      toast.error('Login Failed', err.message);
    }
  };
useEffect(()=>{
  if (sessionStorage.getItem("model") === "landlord") {setIsLandlord(true)}
})
  return (
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log In</h2>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="font-semibold text-slate-400 text-wrap ">
              {isLandlord ? 'You are currently logging in as a landlord.' : 'You are currently logging in as a regular user.'}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="email" value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-3 py-2 text-slate-900 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input type="password" id="password" value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-3 py-2 text-slate-900  border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
            </div>

            <div className="flex justify-center m-2">
              <button
                  type="submit" className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-sm">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
