import React, { useState ,useEffect} from 'react';
// FIREBASE
import app from "@/app/firebase"
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { doc,getDoc,getFirestore  } from "firebase/firestore"; 
import { collection, query, where, getDocs } from "firebase/firestore";
const db = getFirestore(app);



const  FilterSearchComponents = ({GetFilterCarsData}) => {

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000000]);
  const [bodyType, setBodyType] = useState('');
  
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceRange([0, value]);
  };
  
  
  
    const [UserCarsData, setUserCarsData] = useState(null); 
  
  
    useEffect(() => {
        UserAllInformationData()
     }, [make,model,year,bodyType])
     
     const UserAllInformationData  = async ()=>{
      if(!make || !model || !year || !bodyType){

        try {
          const querySnapshot = await getDocs(collection(db, "/CarMarketplaceUser/cars/carsdata/"));
    
          const carsDataArray = [];
          querySnapshot.forEach((doc) => {
            carsDataArray.push(doc.data());
          });
      console.log(carsDataArray)
          setUserCarsData(carsDataArray);
        } catch (error) {
          console.error("Error fetching user car data:", error);
        }

      }else{




      try {
        let collectionRef = collection(db, "/CarMarketplaceUser/cars/carsdata/");
        let q = query(collectionRef);
        // Apply filters
        if (make) {
          q = query(q, where("make", "==", make));
        }
        if (model) {
          q = query(q, where("model", "==", model));
        }
        if (year) {
          q = query(q, where("year", "==", year));
        }
        if (bodyType) {
          q = query(q, where("bodyType", "==", bodyType));
        }
        q = query(q, where("price", ">=", priceRange[0]), where("price", "<=", priceRange[1]));

        const querySnapshot = await getDocs(q);
        const carsDataArray = [];
        querySnapshot.forEach((doc) => {
          carsDataArray.push(doc.data());
        });
        setUserCarsData(carsDataArray);
      } catch (error) {
      }

    }
     }

     GetFilterCarsData(UserCarsData)

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
      <h2 className="text-lg font-semibold mb-4">Filter Cars</h2>

      {/* Make */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Make</label>
        <select value={make}  onChange={(e) => setMake(e.target.value)} className="w-full px-2 py-1 border rounded-md bg-gray-200 dark:bg-gray-700  text-gray-700 dark:text-gray-50">
          <option value="">Select Make</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="Tesla">Tesla</option>
        </select>
      </div>

      {/* Model */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Model</label>
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full px-2 py-1 border rounded-md bg-gray-200 dark:bg-gray-700  text-gray-700 dark:text-gray-50"
          placeholder="Enter Model"
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Year</label>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-2 py-1 border rounded-md bg-gray-200 dark:bg-gray-700  text-gray-700 dark:text-gray-50"
        >
          <option value="">Select Year</option>
          {Array.from({ length: 23 }, (_, i) => 2023 - i).map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Price Range</label>
        <input
          type="range"
          min="0"
          max="50000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Body Type */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium">Body Type</label>
        <select
          value={bodyType}
          onChange={(e) => setBodyType(e.target.value)}
          className="w-full px-2 py-1 border rounded-md bg-gray-200 dark:bg-gray-700  text-gray-700 dark:text-gray-50"
        >
          <option value="">Select Body Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
          <option value="Coupe">Coupe</option>
        </select>
      </div>

      <button
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => console.log({ make, model, year, priceRange, bodyType })}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSearchComponents;