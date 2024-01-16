import { PlusIcon } from "../common/PlusIcon";

import React, { useMemo, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import { useFormik } from "formik";
import axios from "axios";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

  const [value, setValue] = useState('');
  const colors= [
    "Red",
    "Royal Blue",
    "Green",
    "Yellow",
    "Pink",
    "Purple",
    "Turquoise",
    "Orange",
    "Maroon",
    "Teal",
    "Peach",
    "Gold",
    "Silver",
    "Cream",
    "Navy Blue",
    "Lavender",
    "Wine",
    "Beige",
    "Mustard",
    "Aqua Blue",
    "Emerald Green",
    "Magenta",
    "Rust",
    "Sky Blue",
    "Coral",
    "Indigo",
    "Lilac",
    "Rose Pink",
    "Mint Green",
    "Charcoal Gray",
    "Tangerine",
    "Olive Green",
    "Mauve",
    "Coffee Brown",
    "Orchid",
    "Slate Gray",
    "Ivory",
    "Turmeric Yellow",
    "Blush Pink",
    "Cobalt Blue",
    "Sea Green",
    "Burgundy",
    "Peacock Blue",
    "Chocolate Brown",
    "Salmon Pink",
    "Copper",
    "Brick Red",
    "Pearl White",
    "Electric Blue",
    "Dusty Rose"
  ];

  const categorySubcategoryMap = {
    "Georgette Sarees": ["Silver Zari", "Water Zari", "Meenakari Work", "Antique Zari", "Gold Zari", "Chikankari", "Bandhani"],
    "Katan Silk Sarees": ["Jaal Work", "Kadua Motifs", "Kadua Jangla"],
    "Tussar Silk Sarees": ["Tussar Silk Sarees"],
    "Kora Silk Sarees": ["Kora Silk Sarees"],
    "Organza Sarees": ["Organza Sarees"],
    "Chiffon Sarees": ["Chiffon Sarees"],
    "Dupion Silk Saree": ["Dupion Silk Saree"],
    "Tissue Sarees": ["Tissue Sarees"]
  };

  const [selectedCategory, setSelectedCategory] = useState("Georgette Sarees");
  const [selectedSubcategory, setSelectedSubcategory] = useState(categorySubcategoryMap["Georgette Sarees"][0]);
  
  const [selectedColor,setSelectedColor]=useState("Uncategorized")
  
  const [images, setImages] = useState([]);


  const registerDataChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }};
      reader.readAsDataURL(file);
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      discount: "",
      stock: "",
      desc: "",
      category:"",
      subCategory:"",
      color:""

    },
    onSubmit: (values) => {

      values['category']=selectedCategory;
      values['subCategory']=selectedSubcategory;
      values['color']=selectedColor;
      values['images']=images;
      values['desc']=value;

      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      // const token = getCookie("token");

      axios.post('/api/admin/product', values)
        .then(function (response) {
console.log(response)
          alert("Product Added Succesfully")
           location.href = "/admin/products";


        })
        .catch(function (error) {
          console.log(error)
          alert("Product Not Added")
          console.log(error)
        });

    },
  });



  return (
    <div>
      <Button className="bg-[#3C0504] text-white" endContent={<PlusIcon />} onPress={onOpen}>
        Add New
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={"inside"}
        isDismissable={false}
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Product
              </ModalHeader>
              <ModalBody>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data" method="POST">
                  {/* Grid */}
                  <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                    <div className="sm:col-span-3">
                      <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                        Product photo
                      </label>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <div className="flex">

                        <div className="flex gap-x-2">
                          <div>

                            <input className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border border-gray-300 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              accept='image/*'
                              name="avatar"
                              onChange={registerDataChange}
                              type="file" 
                              multiple="true"
                              required
                              />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* End Col */}

                    {/* End Col */}

                    {/* End Col */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="af-account-email"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Title (Unique)
                      </label>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <input
                        id="af-account-email"
                        type="text"
                        className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        placeholder=""
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        required
                      />
                    </div>
                    {/* End Col */}

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="af-account-email"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Price
                      </label>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <input
                        id="af-account-email"
                        type="number"
                        className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        name="price"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.price}
                      />
                    </div>
                    {/* End Col */}

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="af-account-email"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Discount in %
                      </label>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <input
                        id="af-account-email"
                        type="number"
                        className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        name="discount"
                        onChange={formik.handleChange}
                        value={formik.values.discount}
                      />
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="af-account-email"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Stock
                      </label>
                    </div>



                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <input
                        id="af-account-email"
                        type="number"
                        className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                          name="stock"
                          onChange={formik.handleChange}
                          value={formik.values.stock}
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <div className="inline-block">
                        <label
                          htmlFor="af-account-phone"
                          className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                        >
                          Color
                        </label>

                      </div>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <div className="sm:flex">
                        <select onChange={(e) => setSelectedColor(e.target.value)}
                         className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        >
                          <option defaultValue >Uncategorized</option>
                         {colors.map((clr)=>{
                          return(
                            <option>{clr}</option>
                          )
                         })}
                        </select>


                      </div>

                    </div>


                    {/* End Col */}
                    <div className="sm:col-span-3">
                      <div className="inline-block">
                        <label
                          htmlFor="af-account-phone"
                          className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                        >
                          Category
                        </label>

                      </div>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <div className="sm:flex">
                        <select className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          defaultValue={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                          {Object.keys(categorySubcategoryMap).map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>


                      </div>

                    </div>


                    <div className="sm:col-span-3">
                      <div className="inline-block">
                        <label
                          htmlFor="af-account-phone"
                          className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                        >
                          Sub Category
                        </label>

                      </div>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                      <div className="sm:flex">
                        <select className="py-2 px-3 pe-11 block w-full border border-gray-300 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          defaultValue={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                          {categorySubcategoryMap[selectedCategory].map((subcategory) => (
                            <option key={subcategory} value={subcategory}>{subcategory}</option>
                          ))}
                        </select>


                      </div>

                    </div>



                    {/* End Col */}
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="af-account-bio"
                        className="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200"
                      >
                        Description
                      </label>
                    </div>
                    {/* End Col */}
                    <div className="sm:col-span-9">
                    <ReactQuill theme="snow" value={value} onChange={setValue}  className="w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"/>
                    </div>
                    {/* "*/}
                  </div>
                  {/* End Grid */}
                  <div className="mt-5 flex justify-center gap-x-2">

                    <button
                      type="submit"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-[#3C0504] text-white hover:[#3C0504] disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      Add Product
                    </button>
                  </div>
                </form>



              </ModalBody>
              <ModalFooter>
                <div className="flex justify-center items-center">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>

                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
