'use client';
import React from 'react'

let pay=10000;

const Find = () => {
    return (
        <div>
            <h1 className='text-3xl text-center p-5 mb-4 uppercase bg-gradient-to-b from-indigo-500 to-blue-500 rounded-b-lg'>Find Jobs you are interested in</h1>
            <div className='flex'>
                <div className='w-1/4 m-3 mr-0 border-r-2'>
                    <h3 className='text-2xl text-center text-blue-500'>FILTERS:</h3>
                    <div className='flex flex-col m-4 justify-center items-center'>
                    <select id="jobTitles" name="jobTitles" className='p-4 m-auto w-max border-2 rounded-lg border-slate-250'>
                        <option>SELECT JOB TITLE</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Marketing Coordinator">Marketing Coordinator</option>
                        <option value="Human Resources Specialist">Human Resources Specialist</option>
                        <option value="Graphic Designer">Graphic Designer</option>
                        <option value="Financial Analyst">Financial Analyst</option>
                        <option value="Registered Nurse">Registered Nurse</option>
                        <option value="Customer Service Representative">Customer Service Representative</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Sales Associate">Sales Associate</option>
                        <option value="Data Scientist">Data Scientist</option>
                    </select>
                    <button onClick={()=>{alert("Filtering feature coming soon.")}} className='p-4 m-4 border-2 border-slate-300 rounded-lg w-max'>Apply Filters</button>
                    </div>
                </div>
                <div className='flex flex-col m-3 w-3/4 mr-0 border-l-2'>
                    <h3 className='text-2xl text-center text-blue-500'>JOBS</h3>
                    <ul>
                        <li className='m-7 p-5 border-2 flex flex-col justify-center items-center border-slate-200 shadow-xl shadow-200 rounded-xl '>
                            <div className='text-xl'>Company</div>
                            <p>Job Title</p>
                            <p>Brief description </p>
                            <p>Pay:{pay}</p>
                            <button className='text-blue-500'>More Details</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Find