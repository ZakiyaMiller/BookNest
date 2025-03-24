import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Genres from "../components/Genres";
import Footer from "../components/Footer";
import Popular from "../components/Popular";

function Home() {
    return (
        <>
            <Navbar />
            <Banner />
            <Freebook />
            <Genres />
            <Popular />
            <Footer />
        </>
    );
}

export default Home;