import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    // Filter jobs based on the search term
    const filteredJobs = allJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle the search operation
    const handleSearch = () => {
        dispatch(setSearchedQuery(searchTerm)); // Store the search term in the redux state if necessary
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-2xl my-5'>Search Results ({filteredJobs.length})</h1>
                
                {/* Search Bar and Button */}
                <div className='flex flex-col md:flex-row md:items-center mb-5'>
                    <input 
                        type="text" 
                        placeholder="Search for jobs..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className='flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 md:mr-2'
                    />
                    
                </div>

                {/* Job Listings */}
                {filteredJobs.length === 0 ? (
                    <p className='text-center text-gray-500'>No jobs found matching your search criteria.</p>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
}

export default Browse;
