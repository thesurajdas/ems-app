"use client"
import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState("admin@mail.com");
  const [password, setPassword] = useState("12345");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("email-login", {
        email,
        password,
        redirect: false
      })
      if (res.error) {
        console.log(res.error)
        setError("Invaild Credentials");
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="my-40 bg-slate-300 dark:bg-slate-900 mx-[30%] px-5 py-3 border-t-4 border-t-blue-600 shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="font-bold text-xl my-4">Enter Details to Login</h1>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="Password" required />
          <button type='submit' className='bg-blue-600 py-4 text-white rounded-2xl mx-16 hover:bg-blue-700'>Login</button>
          {error && (
            <div className="bg-red-500 text-white text-sm w-fit py-1 px-3 mt-2 rounded-lg">{error}</div>
          )}
          <Link href={"/"} className='text-center underline'>Go to Home</Link>
        </form>
      </div>
    </>
  )
}