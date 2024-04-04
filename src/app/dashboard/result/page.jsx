"use client";
import { useState } from "react";
import Link from "next/link";

export default function ResultPage() {
    return (
        <>
            <h1 className="my-4">Result Page</h1>
            <Link href="/dashboard/result/create"><button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl">Add Results</button></Link>
        
        </>
    );
}
