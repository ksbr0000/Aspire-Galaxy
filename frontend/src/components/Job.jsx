import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [showFullDescription, setShowFullDescription] = useState(false);
    const maxDescriptionLength = 100; // Limit for the description

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const handleMoreClick = () => {
        navigate(`/description/${job?._id}`);
    };

    return (
        <div className='p-5 rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between h-full max-h-[500px]'>
            <div>
                <div className='flex items-center justify-between mb-4'>
                    <p className='text-sm text-gray-500'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button variant="outline" className="rounded-full p-1 hover:bg-gray-100" size="icon">
                        <Bookmark className="text-gray-700" />
                    </Button>
                </div>

                <div className='flex items-center gap-3 mb-3'>
                    <Avatar className="border border-gray-300 rounded-full overflow-hidden">
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-lg text-gray-800'>{job?.company?.name}</h1>
                        <p className='text-sm text-gray-500'>Location: India</p>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-xl text-gray-900 my-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 mb-4'>
                        {job?.description.length > maxDescriptionLength && !showFullDescription
                            ? `${job?.description.substring(0, maxDescriptionLength)}...`
                            : job?.description}
                        {job?.description.length > maxDescriptionLength && (
                            <button
                                onClick={handleMoreClick}
                                className='text-[#29b2fe] ml-1 hover:text-[#1a8fcb]'>
                                More
                            </button>
                        )}
                    </p>
                </div>

                <div className='flex flex-wrap items-center gap-3 mt-2'>
                    <Badge className='text-blue-700 font-semibold' variant="ghost">{job?.position} Positions</Badge>
                    <Badge className='text-[#F83002] font-semibold' variant="ghost">{job?.jobType}</Badge>
                    <Badge className='text-[#7209b7] font-semibold' variant="ghost">{job?.salary} LPA</Badge>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-auto pt-4'>
                <Button onClick={handleMoreClick} variant="outline" className='flex-1'>
                    View Details
                </Button>
                <Button className="bg-[#29b2fe] text-white hover:bg-[#1a8fcb] flex-1">
                    Save for Later
                </Button>
            </div>
        </div>
    );
};

export default Job;
