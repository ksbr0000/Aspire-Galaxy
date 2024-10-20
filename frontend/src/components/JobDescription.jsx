import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some((application) => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some((application) => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 px-4 py-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
                {/* Back Button */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-gray-700 hover:text-gray-900 font-semibold space-x-2"
                    >
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span>Back</span>
                    </button>
                </div>

                {/* Job Title and Apply Button */}
                <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0">
                    <div className="w-full md:w-auto">
                        <h1 className="text-2xl font-bold text-gray-900">{singleJob?.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-4">
                            <Badge className="text-blue-700 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className="text-red-500 font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className="text-purple-600 font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`mt-4 md:mt-0 w-full md:w-auto rounded-lg transition-all ${
                            isApplied
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#29b2fe] text-white hover:bg-[#1a8fcb]'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>

                {/* Job Description Section */}
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">Job Details</h2>
                    <div className="mt-4 space-y-4 text-gray-800">
                        <div className=" ">
                            <span className="font-bold w-40">Role:</span>
                            <span className="ml-2 ">{singleJob?.title}</span>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Location:</span>
                            <span className="ml-2">{singleJob?.location}</span>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Description:</span>
                            <p className="ml-2 text-gray-700">{singleJob?.description}</p>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Requirements:</span>
                            <ul className="ml-4 mt-2 list-disc text-gray-700">
                                {singleJob?.requirements?.map((requirement, index) => (
                                    <li key={index}>{requirement}</li>
                                ))}
                            </ul>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Experience Level:</span>
                            <span className="ml-2">{singleJob?.experienceLevel} years</span>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Salary:</span>
                            <span className="ml-2">{singleJob?.salary} LPA</span>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Total Applicants:</span>
                            <span className="ml-2">{singleJob?.applications?.length}</span>
                        </div>
                        <div className=" ">
                            <span className="font-bold w-40">Posted Date:</span>
                            <span className="ml-2">{singleJob?.createdAt?.split('T')[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobDescription;
