import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative bg-gradient-to-br from-[#e0f7fa] to-[#ffffff] py-20 lg:py-28">
            <div className="text-center max-w-5xl mx-auto px-6">
                {/* Badge */}
                <span className="mx-auto px-6 py-2 mb-6 inline-block bg-[#F83002] text-white font-medium text-sm md:text-base rounded-full tracking-wider">
                    No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 mb-6">
                    Find, Apply & <br />
                    <span className="text-[#29b2fe]">Secure Your Dream Job</span>
                </h1>

                {/* Subheading */}
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-10">
                    Discover thousands of job opportunities, apply with ease, and take the next step in your career journey.
                </p>

                {/* Search bar */}
                <div className="flex justify-center items-center w-full max-w-3xl mx-auto">
                    <div className="flex w-full shadow-lg border border-gray-300 rounded-full overflow-hidden items-center bg-white">
                        <input
                            type="text"
                            placeholder="Search jobs, companies, or browse categories..."
                            onChange={(e) => setQuery(e.target.value)}
                            className="outline-none border-none w-full text-sm md:text-lg p-4 pl-6 bg-transparent"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="bg-[#29b2fe] text-white hover:bg-[#1a8fcb] h-full px-6 py-4 flex items-center justify-center transition-all"
                        >
                            <Search className="h-6 w-6" />
                        </Button>
                    </div>
                </div>

                {/* Decorative Background Circles */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-[#29b2fe] opacity-20 rounded-full filter blur-3xl z-0"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#F83002] opacity-10 rounded-full filter blur-3xl z-0"></div>
            </div>
        </div>
    );
}

export default HeroSection;
