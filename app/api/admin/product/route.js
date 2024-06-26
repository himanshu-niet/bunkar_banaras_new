import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "@/env";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
const cloudinary = require("cloudinary");
export const dynamic='force-dynamic'

cloudinary.config({ 
    cloud_name: CLOUDINARY_NAME, 
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export async function POST(request){
try {
    const {
      title,
        desc,
        price,
        discount,
        category,
        subCategory,
        color,
        stock,
        images,
        main
    }=await request.json();

    if (!title,
        !desc,
        !price,
        !discount,
        !category,
        !subCategory,
        !color,
        !stock,
        !images,
        !main) {
        return NextResponse.json({
            success: false,
            error:"Bad Request"
        }, {
            status: 400,
        });
    }

   
    let imagesLinksM;
    if (main != undefined ) {
        const result = await cloudinary.v2.uploader.upload(main, {
            folder: "products-test",
          });
          imagesLinksM=result.secure_url;
      }


    let imagesArr = [];
    let imagesLinks=[];
    if (typeof images === "string") {
        imagesArr.push(images);
    } else {
        imagesArr = images;
    }
    if (imagesArr !== undefined) {
        for (let i = 0; i < imagesArr.length; i++) {
          const result = await cloudinary.v2.uploader.upload(imagesArr[i], {
            folder: "products-test",
          });
          imagesLinks.push(result.secure_url);
        
        }
      }
      

    const product= await prisma.product.create({
        data:{
            title,
            desc,
            price:String(price),
            discount:String(discount),
            category,
            subCategory,
            color,
            stock:String(stock),
            mainImage:imagesLinksM,
            images: {
                create: imagesLinks.map((url) => ({ url })),
              },
            },
            include: {
                images: true,
              }
            
    })

    return NextResponse.json({
        success: true,
        data: product
    }, {
        status: 201,
    });

   
} catch (error) {
    console.log(error)
return NextResponse.json({
    success: false,
    error: error.message
}, {
    status: 501,
});}}


export async function GET(request){
    try {
        const products=await prisma.product.findMany({
            include: {
                images: {
                    select: { url: true }, // Include only title
                  },
              }
        });
        
        return NextResponse.json({
            success:true,
            data:products
        },{
            status:200
        })
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {
            status: 501,
        });
          
    }
}


export async function DELETE(request){
    try {
        const url = new URL(request.nextUrl.href);
        const id = url.searchParams.get('id');

    
        const products=await prisma.product.delete({
            where: {
                id,
              },
        });
        
        return NextResponse.json({
            success:true,
            data:products
        },{
            status:200
        })
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {
            status: 501,
        });
          
    }
}


export async function PUT(request){
    try {
        const {
          title,
            desc,
            price,
            discount,
            category,
            subCategory,
            color,
            stock,
            images,
            main
        }=await request.json();

        const url = new URL(request.nextUrl.href);
        const id = url.searchParams.get('id');

    
        if (!title,
            !desc,
            !price,
            !discount,
            !category,
            !subCategory,
            !color,
            !stock,
            !id) {
            return NextResponse.json({
                success: false,
                error:"Bad Request"
            }, {
                status: 400,
            });
        }
    
        let imagesLinksM;
         if (main != undefined) {
             const result = await cloudinary.v2.uploader.upload(main, {
                 folder: "products-test",
               });
               imagesLinksM=result.secure_url;
           }
           
    
        let imagesArr = [];
        let imagesLinks=[];
        if (typeof images === "string") {
            imagesArr.push(images);
        } else {
            imagesArr = images;
        }
        if (imagesArr !== undefined) {
            for (let i = 0; i < imagesArr.length; i++) {
              const result = await cloudinary.v2.uploader.upload(imagesArr[i], {
                folder: "products-test",
              });
              imagesLinks.push(result.secure_url);
            }
          }


          
          const updateProduct = await prisma.product.update({
            where: {
              id
            },
            data: {
                title,
                desc,
                price:String(price),
                discount:String(discount),
                category,
                subCategory,
                color,
                stock:String(stock),
                ...(imagesLinksM? { mainImage:imagesLinksM}: {}),


                ...(imagesLinks.length>0? { images: {
                    deleteMany: {},
                    create: imagesLinks.map((url) => ({ url })),
                  }}: {})
                }
          })
    
        return NextResponse.json({
            success: true,
            data: updateProduct
        }, {
            status: 201,
        });
    
       
    } catch (error) {
        console.log(error)
    return NextResponse.json({
        success: false,
        error: error.message
    }, {
        status: 501,
    });}}


