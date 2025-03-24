import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";
function Course() {
    const [book, setBook] = useState([]);
    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await axios.get("http://localhost:4001/book");
                console.log(res.data);
                setBook(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getBook();
    }, []);
    return (
        <>
            <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
                <div className="mt-28 items-center justify-center text-center">
                    <h1 className="text-2xl  md:text-4xl">
                        We're delighted to have you{" "}
                        <span className="text-[#d75351]"> Here! :)</span>
                    </h1>

                    <Link to="/">
                        <button className="mt-6 bg-[#d75351] text-white px-4 py-2 rounded-md hover:bg-[#d75151] duration-300">
                            Back
                        </button>
                    </Link>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
                    {book.map((item) => (
                        <Cards key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Course;