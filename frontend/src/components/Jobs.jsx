import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Footer from './shared/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedIndustry, setSelectedIndustry] = useState(null);
    const [selectedSalaryRange, setSelectedSalaryRange] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false); // State to manage filter dropdown visibility

    const handleFilterChange = ({ selectedSalaryRange, selectedLocation, selectedIndustry }) => {
        setSelectedSalaryRange(selectedSalaryRange);
        setSelectedLocation(selectedLocation);
        setSelectedIndustry(selectedIndustry);
    };

    useEffect(() => {
        console.log("All Jobs: ", allJobs);
        console.log("Selected Location: ", selectedLocation);
        console.log("Selected Industry: ", selectedIndustry);
        console.log("Selected Salary Range: ", selectedSalaryRange);
    
        let filteredJobs = allJobs;
    
        // Filter by search query
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter(job => 
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
        }
    
        // Filter by location
        if (selectedLocation) {
            filteredJobs = filteredJobs.filter(job => 
                job.location && job.location.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }
    
        // Filter by industry
        if (selectedIndustry) {
            filteredJobs = filteredJobs.filter(job => 
                job.title && job.title.toLowerCase().includes(selectedIndustry.toLowerCase())
            );
        }
    
        // Filter by salary range
        if (selectedSalaryRange) {
            filteredJobs = filteredJobs.filter(job => {
                const salary = job.salary; // Assuming salary is a number
                if (selectedSalaryRange.length === 1) {
                    return salary >= selectedSalaryRange[0]; // For "Above" case
                } else if (selectedSalaryRange.length === 2) {
                    return salary >= selectedSalaryRange[0] && salary <= selectedSalaryRange[1]; // For range case
                }
                return true; // If no valid range, show all jobs
            });
        }
    
        setFilterJobs(filteredJobs);
    }, [allJobs, searchedQuery, selectedLocation, selectedIndustry, selectedSalaryRange]);
    

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-full md:w-1/5'>
                        {/* Button to toggle filters on mobile only */}
                        <button 
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md md:hidden" 
                            onClick={() => setIsFilterOpen(!isFilterOpen)}>
                            Filters
                        </button>
                        {/* Dropdown Filters for Mobile and always shown Filters for Desktop */}
                        <div className={`md:block ${isFilterOpen ? 'block' : 'hidden'} md:visible`}>
                            <FilterCard
                                onFilterChange={handleFilterChange}
                                selectedFilters={{
                                    selectedSalaryRange,
                                    selectedLocation,
                                    selectedIndustry
                                }}
                            />
                        </div>
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Jobs;
