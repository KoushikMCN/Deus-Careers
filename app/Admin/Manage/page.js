"use client";
import React, { useState, useEffect } from 'react'
import { collection, addDoc, query, querySnapshot, onSnapshot, doc, upateDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase"
import Header from '@/components/Header';

const page = () => {

    const [jobs, setJobs] = useState([]);
    const [statusColor, setStatusColor] = useState("text-black");

    useEffect(() => {
        const q = query(collection(db, 'appliedJobs'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = []
            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id })
            })
            setJobs(itemsArr);
        })
    }, [])

    useEffect(() => {
      console.log(statusColor)
    }, [statusColor])
    

    const approve = async(job) => {
        const docRef = doc(db,  'appliedJobs', job.id);
        const updatedData = {...job, status:"Approved!"}
        await updateDoc(docRef, updatedData)
        setStatusColor("text-green-500")
    }

    const reject = async(job) => {
        const docRef = doc(db,  'appliedJobs', job.id);
        const updatedData = {...job, status:"Rejected."}
        await updateDoc(docRef, updatedData)
        setStatusColor("text-red-500")
    }

    return (
        <div> 
        <Header/>
            {
                (jobs.length) > 0 ?
                    <div>{
                        jobs.map((job, index) => (
                            <div key={index} className='p-4 m-8 border-2 rounded-lg flex flex-col items-center'>
                                <div> Experience: {job.experience} years</div>
                                <div> Phone No: {job.phoneNo} </div>
                                <div className={statusColor} > {job.status} </div>
                                <a href={job.resumeURL} target='_koushik'>RESUME</a>
                                {jobs[index].selectedJobs.map((det, index) => (
                                    <div className='flex flex-col items-center font-semibold text-lg'>
                                        <h2>{det.company}</h2>
                                        <div>{det.title}</div>
                                        <div>{det.pay}</div>
                                    </div>
                                ))}
                                { (job.status)==="Pending" ?
                                <div className='flex'>
                                <button onClick={() => approve(job)} className='border-2 m-4 p-2 px-4 rounded-lg bg-green-400/30'>Approve</button>
                                <button onClick={() => reject(job)} className='border-2 m-4 p-2 px-4 rounded-lg bg-red-400/30'>Reject</button>
                                </div>: <></>
                                }
                            </div>
                        )
                        )
                    }
                    </div>
                    : <></>
            }
        </div>
    )
}

export default page