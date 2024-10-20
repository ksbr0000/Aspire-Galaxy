import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {/* Profile Card Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Avatar and Info */}
                    <div className="flex items-center gap-6">
                        <Avatar className="h-28 w-28">
                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                        </Avatar>
                        <div>
                            <h1 className="font-bold text-2xl text-gray-900">{user?.fullname}</h1>
                            <p className="text-gray-600 mt-2">{user?.profile?.bio || "Bio not available"}</p>
                        </div>
                    </div>
                    {/* Edit Button */}
                    <Button onClick={() => setOpen(true)} className="h-10 w-10 p-2 rounded-full border">
                        <Pen className="h-5 w-5 text-gray-600" />
                    </Button>
                </div>

                {/* Contact Section */}
                <div className="my-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Mail className="h-5 w-5" />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                            <Contact className="h-5 w-5" />
                            <span>{user?.phoneNumber || "Phone number not available"}</span>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-6">
                    <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills.length ? (
                            user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-500">No skills available</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="my-6">
                    <Label className="text-md font-semibold text-gray-800">Resume</Label>
                    {isResume ? (
                        <a
                            href={user?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline flex items-center gap-2 mt-2"
                        >
                            <FileText className="h-5 w-5" />
                            <span>{user?.profile?.resumeOriginalName || "Download Resume"}</span>
                        </a>
                    ) : (
                        <span className="text-gray-500">No resume uploaded</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 shadow-md">
                <h1 className="font-bold text-lg text-gray-900 mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Update Profile Dialog */}
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
