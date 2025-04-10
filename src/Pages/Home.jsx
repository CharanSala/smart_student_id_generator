import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Home = ({toggleTheme, theme}) => {

    const imageSrc = theme === 'dark' ? 'white_stu.jpeg' : '/student1.jpg';

    const navigate = useNavigate();
    return (
        <div className="flex flex-col flex-grow bg-white text-black dark:bg-black dark:text-white relative" >

          

            {/* Top Section: Title and Button */}
            <div className="flex flex-col items-center justify-center flex-grow p-6">
                <h1 className='text-xl pb-5 font-bold'>Smart Student ID Generator</h1>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                    A COMPANION FROM DAY ONE TO GRADUATION DAY
                </h1>
                
                <div
                    onClick={() => navigate("/dataform")}
                    className="cursor-pointer bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-xl text-lg shadow-md hover:shadow-xl transition pointer-events-auto z-10"
                >
                    + Create
                </div>
            </div>

            {/* Bottom Section: Images */}
            <div className="w-full h-auto flex justify-center">
                <img
                     src={imageSrc}
                    alt="Student"
                    className="max-w-full h-40 md:h-60 object-fill rounded-lg"
                />
                <img
                     src={imageSrc}
                    alt="Student"
                    className="hidden md:block max-w-full h-60 object-contain rounded-lg"
                />
            </div>

            {/* Overlay: Now ignores pointer events */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 pointer-events-none"></div>
        </div>
    );
};

export default Home;
