'use client'
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";

import '../../public/css/util.css'
import '../../public/css/main.css'


export default function Layout({ children }) {
  return (
    <>
   <Header/>
 <Navbar/>
    <main>{children}</main>
   <Footer/>
   
    </>
  )
}