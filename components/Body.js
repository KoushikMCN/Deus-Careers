import React from 'react'
// import AppliedJobs from 'AppliedJobs'

const Body = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='p-16 m-10 border-2 rounded-xl w-2/5 flex justify-center items-center flex-col'>
                <h2 className='text-center'>Find Jobs</h2>
                <span>Find and apply for jobs posted by various companies.</span> <br />
                <a href='/FindJobs' className='m-auto text-center w-max'>Click here</a>
            </div>
            <div className='p-16 m-10 border-2 rounded-xl w-2/5 flex justify-center items-center flex-col'>
                <h2 className='text-center'>Applied Jobs</h2>
                <span>Have a look at the jobs you have applied for:</span> <br />
                <a href='/AppliedJobs' className='m-auto text-center w-max'>Click here</a>
            </div>
        </div>
    )
}

export default Body