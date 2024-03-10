"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserStatus } from "./TableRow";

export default function ViewProfile({ id }) {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUser = async (id) => {
            const response = await fetch(`/api/users/${id}`, { cache: 'no-store' })
            const data = await response.json()
            setProfile(data.user)
            setLoading(true)
        }
        getUser(id);
    }, [id])
    return (
        <>
            {!loading ? Array(5).fill(0).map((e, id) => (
                <div key={id} className="transition animate-pulse">
                    <div key={id} className="p-2 bg-slate-300 m-2 w-96 h-10 rounded-full"></div>
                </div>
            )) : (
                <div className="space-y-4">
                    <h1 className="flex items-center">
                        <Image src={"/" + profile.avatar} alt={profile.name} width={50} height={50} className="rounded-full mr-3" />
                        {profile.name}
                    </h1>
                    <p className="text-2xl font-light">Email: {profile.email}</p>
                    <p className="text-2xl font-light items-center">Status: <UserStatus data={profile.status} /></p>
                    <p className="text-2xl font-light">Registration Number: {profile.role}</p>
                    <p className="text-2xl font-light">Registration Number: {profile.reg_no}</p>
                    <p className="text-2xl font-light">Roll Number: {profile.roll_no}</p>
                    <p className="text-2xl font-light">Mobile Number: {profile.mobile_no}</p>
                    <p className="text-2xl font-light">Gender: {profile.gender}</p>
                    <p className="text-2xl font-light">Date of Birth: {profile.date_of_birth}</p>
                    <p className="text-2xl font-light">Address: {profile.address.state + ", " + profile.address.country}</p>
                </div>
            )
            }
        </>
    )
}
