'use client';
import React, { useEffect, useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase'
import Jobs from '../../../models/Jobs'


const Addjob = () => {

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("")
    const [pay, setPay] = useState("")
    const [location, setLocation] = useState("")


    const addJob = async (e) => {
        e.preventDefault();
        if (title !== "" && company !== "" && pay !== "" && location !== "") {
            const newJob = new Jobs(title, company, pay, location)
            try {
                const docRef = await addDoc(collection(db, "jobs"), {
                    title: newJob.title,
                    company: newJob.company,
                    pay: newJob.pay,
                    location: newJob.location,
                })
                console.log('Document written with ID: ', docRef.id);
                setTitle("")
                setCompany("")
                setPay("")
                setLocation("")
            } catch (e) {
                console.error(e);
            }
        }
        else {
            alert("Please enter all fields");
            console.log("Enter all fields");
        }
    }

    return (
        <div>
            <div className=' p-4 bg-sky-600 flex justify-center items-center'>
                <img src='/assets/deuslogo.png' className='h-10 pr-3' />
                <h1 className='text-center text-3xl uppercase text-white'>add jobs</h1>
            </div>
            <div className='grid place-items-center p-4 m-3 rounded-lg bg-sky-800'>
                <form
                    className="w-[700px] flex flex-row"
                    onSubmit={addJob}
                >
                    <div className='w-[90%]'>
                        <select
                            id="jobTitles"
                            name="jobTitles"
                            onChange={(e) => setTitle(e.target.value)}
                            className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full'
                            required
                        >
                            <option value="">SELECT JOB TITLE</option>
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
                            <option value="Other">Other</option>
                        </select>
                        <input type='text'
                            value={company} onChange={(e) => setCompany(e.target.value)}
                            placeholder='Company' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                        <input type='number'
                            value={pay} onChange={(e) => setPay(e.target.value)}
                            placeholder='Pay' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                        <input type='text'
                            value={location} onChange={(e) => setLocation(e.target.value)}
                            placeholder='Remote/Specify Location' className='block p-4 m-3 border-2 border-violet-950 rounded-lg w-full' />
                    </div>
                    <button type='submit' className='bg-slate-500 w-max p-4 m-4 px-6 mx-6 h-min rounded-full relative top-[100px] transform transition duration-900 hover:scale-110 text-2xl'>+</button>
                </form>
            </div>
            <a href='/Admin' className='absolute top-6 right-5 capitalize text-white pl-3 font-bold border-l-2 border-white'>Back to Admin dashboard</a>
        </div>
    )
}

export default Addjob