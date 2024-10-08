"use client"

import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";

function SearchCom() {
  const [CarQuality, setCarQuality] = useState('All');
  const [CarPriceRange, setCarPriceRange] = useState("");

  return (
    <form action="/explore" method="GET">

      <div className='w-[300px] md:flex md:w-[750px] h-[80px] bg-gray-50 dark:bg-gray-800 md:rounded-full shadow'>

        <div className="w-full md:w-[30%] h-[40px] md:h-full flex items-center justify-center">
          <select 
            value={CarQuality} 
            onChange={(e) => setCarQuality(e.target.value)} 
            name="quality" 
            className="bg-slate-50 dark:bg-gray-800 h-full w-full rounded-l-full outline-none px-5 text-lg"
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>

        <div className="w-full md:w-[30%] h-[40px] md:h-full">
          <select name="brand" className="bg-slate-50 dark:bg-gray-800 h-full w-full rounded-l-full outline-none px-5 text-lg">
            <option value="">Select Brand</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Tesla">Tesla</option>
          </select>
        </div>

        <div className="w-full md:w-[30%] h-[40px] md:h-full">
          <select 
            value={CarPriceRange} 
            onChange={(e) => setCarPriceRange(e.target.value)} 
            name="price" 
            className="bg-slate-50 dark:bg-gray-800 h-full w-full outline-none px-5 text-lg"
          >
            <option value="">All Prices</option>
            <option value="1000">1000</option>
            <option value="2000">2000</option>
            <option value="3000">3000</option>
            <option value="5000">5000</option>
            <option value="10000">10000</option>
            <option value="100000">100000</option>
          </select>
        </div>

        <div className="w-full bg-blue-600 md:bg-transparent md:p-2 h-[40px] md:w-[10%] md:h-full flex items-center justify-center">
          <button type="submit" className="md:w-[60px] md:h-[60px] bg-blue-600 rounded-full flex items-center justify-center text-white">
            <AiOutlineSearch size={27} />
          </button>
        </div>

      </div>
    </form>
  )
}

export default SearchCom;
