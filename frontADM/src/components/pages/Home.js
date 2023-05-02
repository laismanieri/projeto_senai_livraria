import { useState, useEffect } from "react";
import React from 'react';
import Button from '../layout/Button';
import Tabela from '../layout/Tabela';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import axios from "axios";

function Home() {

    return (
        <>
        <NavBar/>

                <Button />
                <Tabela />

        <Footer/>
        </>
    );
}

export default Home;