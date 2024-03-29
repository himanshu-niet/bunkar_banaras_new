"use client"
import  transporter  from '@/utils/sendMail'
import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'

const page = () => {


  const formik=useFormik({
    initialValues:{
      email:"",
      message:""
    },
    onSubmit:(values)=>{
      axios.post("/api/contact",
        values,
        {
          method:"POST"
        }
      ).then((res)=>{

        alert("Form Submited Succesfully")

      }).catch((error)=>{
        console.log("Form Not Submited")
      })
    },
  })

  return (
    <>
  {/* Title page */}
  
  {/* Content page */}
  <section className="bg0 pt-20 lg:pt-24 p-b-116">
    <div className="container">
      <div className="flex-w flex-tr">
        <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
          <form onSubmit={formik.handleSubmit}>
            <h4 className="mtext-105 cl2 txt-center p-b-30">
              Send Us A Message
            </h4>
            <div className="bor8 m-b-20 how-pos4-parent">
              <input
                className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Your Email Address"
                required
              />
              <img
                className="how-pos4 pointer-none"
                src="images/icons/icon-email.png"
                alt="ICON"
              />
            </div>
            <div className="bor8 m-b-30">
              <textarea
                className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                name="message"
                placeholder="How Can We Help?"
                value={formik.values.message}
                onChange={formik.handleChange}
              />
            </div>
            <button type='submit' className="flex-c-m stext-101  size-121 btn-m-lm p-lr-15 trans-04 pointer">
              Submit
            </button>
          </form>
        </div>
        <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
          <div className="flex-w w-full p-b-42">
            <span className="fs-18 cl5 txt-center size-211">
              <span className="lnr lnr-map-marker" />
            </span>
            <div className="size-212 p-t-2">
              <span className="mtext-110 cl2">Address</span>
              <p className="stext-115 cl1 size-213 p-t-18">
           Shop No. 947 Walidpur Market Road, Mau, Mohinuddinpur, Uttar Pradesh 276405
              </p>
            </div>
          </div>
          <div className="flex-w w-full p-b-42">
            <span className="fs-18 cl5 txt-center size-211">
              <span className="lnr lnr-phone-handset" />
            </span>
            <div className="size-212 p-t-2">
              <span className="mtext-110 cl2">Lets Talk</span>
              <p className="stext-115 cl1 size-213 p-t-18">+91 998 4858 991</p>
            </div>
          </div>
          <div className="flex-w w-full">
            <span className="fs-18 cl5 txt-center size-211">
              <span className="lnr lnr-envelope" />
            </span>
            <div className="size-212 p-t-2">
              <span className="mtext-110 cl2">Sale Support</span>
              <p className="stext-115 cl1 size-213 p-t-18">
              bunkarbanaras@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default page