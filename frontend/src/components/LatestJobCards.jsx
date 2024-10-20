import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='flex flex-col h-full p-6 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transition-transform transform hover:scale-105'
        >
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button variant="outline" className="rounded-full" size="icon">Save</Button>
            </div>

            <div className='flex items-center gap-3 my-4'>
                <img src={job?.company?.logo} alt={`${job?.company?.name} logo`} className="w-12 h-12 rounded-full" />
                <div>
                    <h1 className='font-semibold text-xl text-[#29b2fe]'>{job?.company?.name}</h1>
                    
                </div>
            </div>

            <div className='flex-1'>
                <h1 className='font-bold text-lg text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-2 mt-4'>
                <Badge className='text-[#29b2fe] font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>

            <div className='flex items-center gap-4 mt-4 justify-between'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="flex-1 mr-2">Details</Button>
                <Button className="bg-[#29b2fe] hover:bg-[#1a8fcb] text-white flex-1">Save For Later</Button>
            </div>
        </div>
    );
}

export default LatestJobCards;
