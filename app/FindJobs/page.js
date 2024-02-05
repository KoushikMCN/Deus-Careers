'use client';
import React, { useEffect, useState } from 'react'
import ApplyJobs from '@/models/ApplyJobs';
import { collection, addDoc, query, querySnapshot, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// let pay=10000;

const Find = () => {

    const [jobs, setJobs] = useState([]);
    const [selectedJobs, setSelectedJobs] = useState([{}]);
    const [experience, setExperience] = useState('');
    const [resume, setResume] = useState(null);
    const [resumeURL, setResumeUrl] = useState("");
    const [phoneNo, setPhoneNo] = useState('');
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        const q = query(collection(db, 'jobs'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = []
            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id })
            })
            setJobs(itemsArr);
        })
    }, [])

    useEffect(() => {
        console.log(resumeURL)
        addJob()
    }, [resumeURL])


    const addJob = async () => {
        if (selectedJobs.length < 3) {
            if (experience !== '' && phoneNo !== '' && selectedJobs.length > 1) {
                const newApplication = new ApplyJobs(selectedJobs, resumeURL, experience, phoneNo, status)
                try {
                    const docRef = await addDoc(collection(db, "appliedJobs"), {
                        selectedJobs: newApplication.selectedJobs,
                        resumeURL: newApplication.resumeURL,
                        experience: newApplication.experience,
                        phoneNo: newApplication.phoneNo,
                        status: newApplication.status,
                    })
                    setResume(null)
                    setSelectedJobs([{}])
                    setPhoneNo("")
                    setResumeUrl("")
                    alert("Applied Job!")
                } catch (e) {
                    console.log(`Error adding document: ${e.message}`);
                }
            } else {
                alert("Please enter all fields!")
            }
        } else {
            alert("Please select only 1 job!")
        }
    }

    const submitApplication = async () => {
        if (resume) {
            const fileRef = ref(storage, `resumes/${resume.name}`)
            await uploadBytes(fileRef, resume)
            const downloadURL = await getDownloadURL(fileRef);
            // await getDownloadURL(data.ref).then((url) => setResumeUrl(url))
            // .then(() =>
            setResumeUrl(downloadURL)
            // addJob()
            // )
        } else {
            alert("Please upload resume!")
        }
    }

    const selectJob = (job) => {
        setSelectedJobs((prevSelectedJobs) => [...prevSelectedJobs,
        {
            title: job.title,
            company: job.company,
            pay: job.pay,
            location: job.location
        }
        ])
    }


    return (
        <div>
            <h1 className='text-3xl text-center p-5 mb-4 uppercase bg-gradient-to-b from-indigo-500/75 to-blue-500/75 rounded-b-lg'>Find Jobs you are interested in</h1>
            <div className='flex '>
                <div className='sticky top-8 h-lvh w-1/5 m-3 mr-0'>
                    <h3 className='text-2xl text-center text-blue-500'>FILTERS</h3>
                    <div className='flex flex-col m-4 justify-center items-center'>
                        <select id="jobTitles" name="jobTitles" className='p-4 m-auto text-center w-[250px] border-2 rounded-lg border-slate-250'>
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
                        <button onClick={() => { alert("Filtering feature coming soon.") }} className='p-2 px-4 m-4 border-2 border-slate-300 rounded-lg w-max'>Apply Filters</button>
                    </div>
                </div>
                <div className='flex flex-col m-3 w-full mr-0 border-x-2'>
                    <h3 className='text-2xl text-center text-blue-500'>JOBS</h3>
                    <ul>
                        {
                            jobs.map((job, index) => (
                                <li key={index} className='relative m-7 p-5 border-2 flex flex-col justify-center items-center border-slate-200 shadow-xl shadow-200 rounded-xl '>
                                    <div className='text-xl'>{job.company}</div>
                                    <p>{job.title}</p>
                                    <p>Location: {job.location}</p>
                                    <p>Pay: {job.pay}</p>
                                    <a href='mailto:deuscareers@gmail.com' className='text-blue-500'>More Details<span className='text-sm'>(Contact Us)</span></a>
                                    <button className='absolute bottom-3 right-3 p-1 px-2 border-2 rounded-lg' onClick={() => selectJob(job)}>Add/Apply</button>
                                </li>))
                        }
                    </ul>
                </div>
                {
                    (selectedJobs.length) > 0 ?
                        <>
                            <div className='pl-4 sticky top-10 h-lvh flex flex-col items-center'>
                                <input type='number' value={experience} placeholder='Years Of Experience' className='border-2 border-slate-700 rounded-lg p-1 text-center mb-2' onChange={(e) => setExperience(e.target.value)} required />
                                <input type='number' value={phoneNo} placeholder='Phone Number' className='mb-2 border-2 border-slate-700 rounded-lg p-1 text-center' onChange={(e) => setPhoneNo(e.target.value)} required />
                                <p>Upload Resume here:</p><input type='file' onChange={(e) => setResume(e.target.files[0])} className='border-2 rounded-lg text-center' required />

                                {
                                    selectedJobs.map((sel, index) => (
                                        <div key={index} className='text-center uppercase'>{sel.company}-<span className='text-sm capitalize'>{sel.title}</span></div>
                                    ))
                                }
                                <button className='p-2 px-4 border-2 rounded-lg w-max mt-5' onClick={() => submitApplication()}>SUBMIT</button>
                            </div>
                        </> :
                        <></>
                }
            </div>
        </div>
    )
}

export default Find