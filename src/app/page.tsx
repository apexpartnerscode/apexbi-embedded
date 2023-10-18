'use client'
import Image from "next/image"
import axios from 'axios';
import React, { useState } from "react";

const clientId = '82bc3731-ad41-4b5d-883f-4e2a4049fff3';
const clientSecret = '9cp8Q~tVYoDSRhA1V_CMST2InZNXD3CCpsThMcXE';
const scope = 'https://analysis.windows.net/powerbi/api/.default'; // Scope for Power BI API

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');

  async function getAccessToken(e:any) {
    try {
      e.preventDefault();
        const response = await axios.post('https://login.microsoftonline.com/203bc81b-c25f-4cd3-a09b-6476c30bb289/oauth2/v2.0/token',
        `grant_type=password&client_id=${clientId}&client_secret=${clientSecret}&scope=${scope}&username=${username}&password=${password}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
      console.log('Access token:', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  }


  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-gray-200">
        <div className="flex justify-center items-center h-full">
          <Image src="/images/apx-azul-preto.svg" alt="Login" width={400} height={700} />
        </div>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-10">Gestão a vista</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">Email</label>
            <input 
              type="email" 
              id="username" 
              name="username" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">Senha</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={(e) => getAccessToken(e)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
