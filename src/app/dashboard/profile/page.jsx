"use client"
import ViewProfile from '@/components/ViewProfile'
import { useSession } from "next-auth/react";

function ProfilePAge() {
    const { data: session } = useSession();
    return (
        <>
            <ViewProfile id={session?.user?._id} />
        </>
    )
}

export default ProfilePAge