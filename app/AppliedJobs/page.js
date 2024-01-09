'use client';
import React from 'react';
import { useState, useEffect } from 'react'


const Applied = () => {
  useEffect(() => {
    fetch('/api/applied')
  
    return () => {
      
    }
  }, [])
  
  return (
    <>
        <h1 className="text-center p-5 mb-5 text-3xl bg-orange-100 rounded-b-lg uppercase">Applied Jobs</h1>
        <div className='flex flex-col items-center'>
          <ul className='flex flex-col justify-center w-4/5 rounded-lg shadow-xl border-black shadow-orange-100'>
            <li className='flex flex-col justify-center items-center'>
              <h3 className='text-xl m-4'>Company</h3>
              <p>Job Title</p>
              <button className='border-2 rounded-lg p-2 m-4 bg-orange-100 border-black'>Withdraw Application</button>
            </li>
          </ul>
        </div>
    </>
  )
}

export default Applied;