import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="my-20">
            <h2 className="text-center text-3xl font-bold mb-6">Explore Job Categories</h2>
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="flex justify-center">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="rounded-full text-lg px-6 py-3 transition duration-300 hover:bg-[#29b2fe] hover:text-white"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="bg-gray-200 rounded-full p-2 hover:bg-gray-300" /> 
                <CarouselNext className="bg-gray-200 rounded-full p-2 hover:bg-gray-300" />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
