import React from 'react'
// import AppliedJobs from 'AppliedJobs'

const Body = () => {
    return (
        <>
            <img src='/assets/banner.jpg' className='h-[360px] w-full object-cover' />
            <div className='flex justify-center items-center'>
                <div className='p-16 m-10 bg-sky-300/20 border-2 rounded-xl w-2/5 flex border-pink-700 justify-center items-center flex-col'>
                    <h2 className='text-center text-2xl font-semibold mb-5'>Find Jobs</h2>
                    <span>Find and apply for jobs posted by various companies.</span> <br />
                    <a href='/FindJobs' className='m-auto text-center w-max'>Click here</a>
                </div>
                <div className='p-16 m-10 border-2 bg-sky-300/20 rounded-xl w-2/5 flex border-pink-700 justify-center items-center flex-col'>
                    <h2 className='text-center text-2xl font-semibold mb-5'>Applied Jobs</h2>
                    <span>Have a look at the jobs you have applied for:</span> <br />
                    <a href='/AppliedJobs' className='m-auto text-center w-max'>Click here</a>
                </div>
            </div>
            <div className='h-[400px] bg-slate-300/50 flex flex-col justify-center items-center'>
                <h2 className='text-3xl font-extrabold text-sky-700 text-center'>About Us</h2>
                <p className='p-4 m-4 text-center'>Welcome to Deus Careers, where we're dedicated to guiding you towards a fulfilling career path. Our platform offers comprehensive job search functionalities, personalized career guidance, professional development resources, and a supportive community to empower you on your journey to success. Join us today and take the first step towards a rewarding career!</p>
            </div>
            <div className='flex justify-center items-center m-10'>
                <a href='mailto:deuscareers@gmail.com' className='border-2 bg-blue-500 text-white capitalize p-4 rounded-xl'>Contact us</a>
            </div>
        </>
    )
}

export default Body