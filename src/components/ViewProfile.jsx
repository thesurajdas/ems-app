"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { UserStatus } from "./TableRow";
import { dateFormat } from "@/app/hooks/dateformat";

export default function ViewProfile({ id }) {
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([]);
    const getCourse = async (id) => {
        const response = await fetch(`/api/courses/${id}`, { cache: 'no-store' })
        const data = await response.json()
        setCourse(data.course.degree)
    }
    useEffect(() => {
        const getUser = async (id) => {
            const response = await fetch(`/api/users/${id}`, { cache: 'no-store' })
            const data = await response.json()
            setProfile(data.user)
            setLoading(true)
            getCourse(data.user.course);
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
                    <h2 className="text-3xl">Course: {course}</h2>
                    <div className="text-2xl font-light">Email: {profile.email}</div>
                    <div className="text-2xl font-light items-center">Status: <UserStatus data={profile.status} /></div>
                    <div className="text-2xl font-light">User Role: {profile.role}</div>
                    <div className="text-2xl font-light">Registration Number: {profile._id}</div>
                    <div className="text-2xl font-light">Mobile Number: {profile.mobile}</div>
                    <div className="text-2xl font-light">Gender: {profile.gender}</div>
                    <div className="text-2xl font-light">Date of Birth: {dateFormat(profile.dob)}</div>
                    <div className="text-2xl font-light">Address: {profile.street + ", " + profile.state + ", " + profile.country}</div>
                </div>
            )
            }
        </>
    )
}
