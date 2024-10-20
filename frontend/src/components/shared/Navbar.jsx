import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="flex items-center justify-between ml-16 max-w-7xl h-16 px-4 lg:px-0">
        {/*logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-extrabold">
            Aspire<span className="text-[#29b2fe]"> Galaxy</span>
          </h1>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Links for desktop */}
        <div className="hidden lg:flex items-center gap-12 mx-auto">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="relative group">
                  <Link to="/admin/companies" className="hover:text-[#29b2fe]">
                    Companies
                  </Link>
                  <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#29b2fe] transition-all duration-300 group-hover:w-full group-hover:scale-x-100 transform -translate-x-1/2 origin-center"></span>
                </li>
                <li className="relative group">
                  <Link to="/admin/jobs" className="hover:text-[#29b2fe]">
                    Jobs
                  </Link>
                  <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#29b2fe] transition-all duration-300 group-hover:w-full group-hover:scale-x-100 transform -translate-x-1/2 origin-center"></span>
                </li>
              </>
            ) : (
              <>
                <li className="relative group">
                  <Link to="/" className="hover:text-[#29b2fe]">
                    Home
                  </Link>
                  <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#29b2fe] transition-all duration-300 group-hover:w-full group-hover:scale-x-100 transform -translate-x-1/2 origin-center"></span>
                </li>
                <li className="relative group">
                  <Link to="/jobs" className="hover:text-[#29b2fe]">
                    Jobs
                  </Link>
                  <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#29b2fe] transition-all duration-300 group-hover:w-full group-hover:scale-x-100 transform -translate-x-1/2 origin-center"></span>
                </li>
                <li className="relative group">
                  <Link to="/browse" className="hover:text-[#29b2fe]">
                    Browse
                  </Link>
                  <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-[#29b2fe] transition-all duration-300 group-hover:w-full group-hover:scale-x-100 transform -translate-x-1/2 origin-center"></span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Auth options */}
        <div className="hidden lg:flex items-center gap-2">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#29b2fe] hover:bg-[#1a8fcb]">Signup</Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === 'student' && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-10">
            <ul className="flex flex-col items-center font-medium gap-4 p-4">
              {user && user.role === 'recruiter' ? (
                <>
                  <li className="relative group">
                    <Link to="/admin/companies" className="hover:text-[#29b2fe]" onClick={toggleMenu}>
                      Companies
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link to="/admin/jobs" className="hover:text-[#29b2fe]" onClick={toggleMenu}>
                      Jobs
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="relative group">
                    <Link to="/" className="hover:text-[#29b2fe]" onClick={toggleMenu}>
                      Home
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link to="/jobs" className="hover:text-[#29b2fe]" onClick={toggleMenu}>
                      Jobs
                    </Link>
                  </li>
                  <li className="relative group">
                    <Link to="/browse" className="hover:text-[#29b2fe]" onClick={toggleMenu}>
                      Browse
                    </Link>
                  </li>
                </>
              )}

              {/* Auth links in mobile menu */}
              {!user ? (
                <div className="flex flex-col items-center gap-2">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="bg-[#29b2fe] hover:bg-[#1a8fcb]">Signup</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Link to="/profile" onClick={toggleMenu}>
                    <Button variant="link">View Profile</Button>
                  </Link>
                  <Button onClick={() => { logoutHandler(); toggleMenu(); }} variant="link">
                    Logout
                  </Button>
                </div>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
