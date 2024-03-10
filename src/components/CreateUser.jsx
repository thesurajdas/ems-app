import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("")
  const createUser = async (e) => {
    e.preventDefault();
    alert('Creating user: ' + name);
  }
  return (
    <>
      <form onSubmit={createUser}>
        <div className="container w-full mx-auto grid grid-cols-3 gap-4 rounded py-4">
          <label htmlFor="name">Name:
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </label>
          <label htmlFor="email">Email:
            <input type="email" id="email" placeholder="Email" />
          </label>
          <label htmlFor="password">Password:
            <input type="password" id="password" placeholder="Password" />
          </label>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-7 rounded-3xl">Create</button>
      </form>
    </>
  )
}
