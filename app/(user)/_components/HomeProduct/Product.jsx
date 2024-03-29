import { getOfferPrice, indianRs } from '@/utils/fetuers'
import Link from 'next/link'
import React from 'react'

const Product = ({item}) => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
    {/* Block2 */}
    <div className="block2">
      <div className="block2-pic hov-img0">
        <img src={item.mainImage} alt="IMG-PRODUCT" />
        <Link
        href={`productdetail/${item.id}`}
          className="block2-btn flex-c-m stext-103  size-102 btn-m-lm p-lr-15 trans-04 js-show-modal1"
        >
          Buy Now
        </Link>
      </div>
      <div className="block2-txt flex-w flex-t p-t-14">
        <div className="block2-txt-child1 flex-col-l ">
          <span
         
            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
          >
            {item.title}
          </span>
          {item.discount > 0 ? <span className="stext-105 cl2"><del className='mr-2 text-gray-500'>Rs.{indianRs(item.price)}</del>Rs.{indianRs(getOfferPrice(item.price, item.discount))}</span>
                    : <span className="stext-105 cl2">Rs.{indianRs(getOfferPrice(item.price, item.discount))}</span>}
        </div>
       
      </div>
    </div>
  </div>
  )
}

export default Product