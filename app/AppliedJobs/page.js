'use client';
import React from 'react';
import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase"


const Applied = () => {

  const [jobs, setJobs] = useState([])
  const [statusColor, setStatusColor] = useState("text-black");
  const [phoneNo, setPhoneNo] = useState("")
  const [inputDisplay, setInputDisplay] = useState("block")

  let j;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNo !== '') {
      console.log(phoneNo)
      const q = query(collection(db, "appliedJobs"));
      const result = await getDocs(q)
      const res = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      j = res.filter(res => res.phoneNo === phoneNo)
      console.log(j)
      console.log("Fetched data")
      setJobs(j)
      if (j.length < 1) {
        alert("Invalid Phone Number.")
      } else {
        setInputDisplay("none")
      }
    }
    else {
      alert('Please enter a valid Phone Number!');
    }

  }

  return (
    <>
      <h1 className="text-center p-5 mb-5 text-3xl bg-orange-100 rounded-b-lg uppercase">Applied Jobs</h1>
      {
        (jobs.length) === 0
          ?
          <form onSubmit={(e) => handleSubmit(e)} className={inputDisplay}>
            <div className='flex flex-col items-center'>
              <input type='number' placeholder='Phone Number' value={phoneNo} className='m-2 p-2 px-4 border-2 border-orange-400 text-center rounded-lg text-black' onChange={(e) => setPhoneNo(e.target.value)} />
              <button type='submit' className='m-2 p-2 px-4 border-2 border-orange-300 rounded-lg'>Get Data</button>
            </div>
          </form>
          :
          <div className='flex flex-col items-center'>
            <ul className='flex flex-col justify-center w-4/5 rounded-lg'>

              {
                jobs.map((job, index) => (
                  <li key={index} className='flex flex-col rounded-xl p-5 m-5 border-t-2 border-l-2 border-orange-100 justify-center items-center  shadow-xl shadow-orange-100'>
                    {/* {
                  (job.status) !== "Pending" ?
                    (job.status) === "Approved!" ? setStatusColor('text-red-500') : setStatusColor('text-green-600') :
                    setStatusColor("text-black")
                } */}
                    {
                      job.selectedJobs.map((j, i) => (
                        <div key={i} className='flex flex-col items-center'>
                          <div className='text-xl font-semibold'>{j.company}</div>
                          <div>{j.location}</div>
                          <div>{j.pay}</div>
                          <div>{j.title}</div>
                        </div>
                      ))
                    }
                    <h3 className='text-xl m-4 font-semibold'><span className={statusColor}>{job.status}</span></h3>
                    {
                      (job.status) === "Pending" || (job.status) === "Rejected." ?
                        <button className='border-2 rounded-lg p-2 m-4 bg-orange-100 border-black'>Withdraw/Delete Application</button>
                        : <></>
                    }
                  </li>
                ))
              }
            </ul>
          </div>
      }
    </>
  )
}

export default Applied;