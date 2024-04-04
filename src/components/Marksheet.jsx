"use client";
import html2pdf from 'html2pdf.js';
import Image from 'next/image';
import { useEffect } from 'react';
import { LuDownload } from 'react-icons/lu';

export default function MarkSheet({ data }) {
    const printAdmitCard = async () => {
        const element = document.getElementById("admit-card");
        const options = {
            margin: 0,
            filename: 'admit-card.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
        };
        html2pdf().from(element).set(options).save();
    }
    useEffect(() => {
        console.log(data)
    }, [])
    return (
        <>
            <div className="flex items-center justify-between my-4">
                <div className="text-gray-400">This is your marksheet.</div>
                <button onClick={printAdmitCard} className="bg-green-500 hover:bg-green-600 flex items-center py-2 px-4 rounded-full gap-1"> <LuDownload /> Download Marksheet</button>
            </div>
            <div id="mark-sheet" className="bg-slate-200 dark:bg-slate-700 rounded-lg shadow-lg p-8 max-w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20">
                            <Image src="/vercel.svg" layout="fill" objectFit="contain" alt="logo" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">University of Nigeria</h1>
                            <p className="text-sm text-gray-400">Motto: To restore the dignity</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
