import React, {useEffect, useState} from 'react';
import AccountsService from "../Service/AccountsService";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth} from "../Hooks/AuthContext";


function Signup() {
  const { setIsLoggedIn } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telephone, setTelephone] = useState('');
 const [landlord,setLandlord] = useState(false);

 useEffect(() =>{
   if (sessionStorage.getItem("model") === "landlord") {
     setLandlord(true)
   }
 })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (landlord) {
        await AccountsService.registerPlotOwner({name, email, password, telephone});
      } else {
        await AccountsService.registerClient({name, email, password});
      }
      toast.success('Registration Successful');
      setIsLoggedIn(false)
    } catch (err) {
      toast.error('Registration failed\n' + err.message);
    }
  };

  return (
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div className="font-semibold text-slate-400 text-wrap ">
              {landlord ? 'You are currently registering in as a landlord.' : 'You are currently registering in as a regular user.'}
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Full Name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                     className="w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                     autoComplete="off" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                     autoComplete="off" />

            </div>
            {landlord && (
                <div className="mb-4">
                  <label htmlFor="telephone" className="block text-gray-700 font-semibold mb-2">Telephone</label>
                  <input type="tel" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)}
                         className="w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                         autoComplete="off" />
                </div>
            )}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                     className="w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                     autoComplete="off" />
            </div>


            <div className="flex justify-center m-2">
              <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-sm"
              >
                Sign Up
              </button>
            </div>

          </form>

        </div>
      </div>
  );
}

export default Signup;
