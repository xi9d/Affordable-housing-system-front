import React, { useState } from 'react';
import AccountsService from "../Service/AccountsService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from "../Hooks/AuthContext";
function Login() {
  const { setIsLoggedIn, setUserName } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLandlord, setIsLandlord] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AccountsService.authenticate({email, password, isLandlord});
      setUserName(sessionStorage.getItem("userName"));
      setIsLoggedIn(true);
      toast.success('Login was successful');
    } catch (err) {
      toast.error('Login Failed', err.message);
    }
  };

  return (
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Log In</h2>
          <ToastContainer />
          <form onSubmit={handleSubmit} autoComplete="off">
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
            <div className="flex justify-between items-center mb-4">
              <div className="w-full border-t border-gray-300"></div>
              <p className="mx-4 text-gray-700 text-lg">OR</p>
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="mb-4 flex justify-between items-center">
              <label className="text-gray-700 text-sm">Are you a landlord: </label>
              <label className="switch">
                <input type="checkbox" onChange={() => setIsLandlord(!isLandlord)} />
              </label>
            </div>
            <div className="flex justify-center">
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Login;
