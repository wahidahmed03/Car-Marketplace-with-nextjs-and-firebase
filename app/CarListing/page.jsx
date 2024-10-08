"use client"
import React, { useState ,useEffect} from "react";
import { useRouter } from 'next/navigation'

import idGenerator from './idGenerator'
import LoadingPage from "../components/LodingPage";


// FIREBASE
import app from '../firebase';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
const db = getFirestore(app);



const CarListingForm = () => {
  const[LogingUserEmail,setLogingUserEmail]= useState(null)
  const [LogingLoading, setLogingLoading] = useState(true);
  const [ IsPageLoading,setIsPageLoading ] =useState(true)
  const router = useRouter()
  
  useEffect(  () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(!user) router.push('/Singin')
    if(user){
      setLogingUserEmail(user.email)
      setLogingLoading(false)
      }
    });
  }, [])
  
  
  
  const [carData, setCarData] = useState({
    model: "",
    discription :"",
    carType: "",
    engine: "",
    transmission: "",
    horsepower: "",
    fuelEfficiency: { city: "", highway: "" },
    seatingCapacity: "",
    driveType: "",
    safetyRating: "",
    brand: "",
    condition: "",
    make: "",
    year: "",
    driveType: "",
    transmission: "",
    fuelType: "",
    engineSize: "",
    cylinder: "",
    color: "",
    door: "",
    price: "",
    features: "",
    image: "",
  });
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    SaveUserDataInFirebase()
  };



  
const SaveUserDataInFirebase = async() =>{
  setLogingLoading(true)
  const id = await idGenerator(carData.model)
  try {
     const docRef = await setDoc(doc(db, `/CarMarketplaceUser/cars/carsdata/`,id), {
    id:id,
     OwnerEmail: LogingUserEmail,
     model: carData.model,
    discription :carData.discription,
    carType: carData.carType,
    engine: carData.engine,
    transmission: carData.transmission,
    horsepower: carData.horsepower,
    fuelEfficiencyCity: carData.fuelEfficiency.city ,
    fuelEfficiencyhighway: carData.fuelEfficiency.highway,
    seatingCapacity:carData.seatingCapacity ,
    driveType: carData.driveType,
    safetyRating: carData.safetyRating,
    brand: carData.brand,
    condition:carData.condition,
    make: carData.make,
    year: carData.year,
    fuelType:carData.fuelType,
    engineSize: carData.engineSize,
    cylinder: carData.cylinder,
    color:carData.color,
    door:carData.door ,
    price: carData.price,
    features:carData.features,
    image:carData.image ,
     AccountCreateDate : new Date().toLocaleString()
     });  
     router.push('/Dashbord')
     
     } catch (e) {
    console.log(e)
  }
 }
 








  return (
    <>
    <div className=" w-full  py-10 px-1 md:px-10 lg:px-20 bg-gray-100 dark:bg-slate-900 text-gray-950  dark:text-gray-100">
<div className="mx-auto bg-white dark:bg-gray-800/40 p-6 rounded shadow ">
      <h1 className="text-2xl font-bold mb-6">Add Car Listing</h1>
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label className="block ">Model</label>
          <input type="text" name="model" value={carData.model} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block ">Discription</label>
          <input type="text" name="discription" value={carData.discription} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Car Type</label>
          <input type="text" name="carType" value={carData.carType}  onChange={handleChange}  className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block ">Engine</label>
          <input type="text" name="engine"  value={carData.engine}  onChange={handleChange}  className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Transmission</label>
          <input  type="text"  name="transmission"  value={carData.transmission} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800"/>
        </div>

        <div className="mb-4">
          <label className="block ">Horsepower</label>
          <input type="text" name="horsepower" value={carData.horsepower} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block ">Fuel Efficiency (City)</label>
          <input type="text" name="city" value={carData.fuelEfficiency.city}
            onChange={(e) =>
              setCarData((prev) => ({
                ...prev,
                fuelEfficiency: { ...prev.fuelEfficiency, city: e.target.value },
              }))
            }
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block">Fuel Efficiency (Highway)</label>
          <input  type="text"  name="highway"  value={carData.fuelEfficiency.highway}
          onChange={(e) =>
              setCarData((prev) => ({
                ...prev,
                fuelEfficiency: { ...prev.fuelEfficiency, highway: e.target.value },
              }))
            }
            className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800"
          />
        </div>

        <div className="mb-4">
          <label className="block ">Seating Capacity</label>
          <input type="number" name="seatingCapacity" value={carData.seatingCapacity} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block ">brand</label>
          <input type="text" name="brand" value={carData.brand} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Drive Type</label>
          <input type="text"  name="driveType" value={carData.driveType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Safety Rating</label>
          <input type="text"  name="safetyRating" value={carData.safetyRating} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800"   />
        </div>

        <div className="mb-4">
          <label className="block">Condition</label>
          <select name="condition" value={carData.condition} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" >
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block">Make</label>
          <input type="text" name="make" value={carData.make} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Year</label>
          <input type="number" name="year" value={carData.year} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 "/>
        </div>
        
        <div className="mb-4">
          <label className="block">fuelType</label>
          <input type="text" name="fuelType" value={carData.fuelType} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">engineSize</label>
          <input type="text" name="engineSize" value={carData.engineSize} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">cylinder</label>
          <input type="text" name="cylinder" value={carData.cylinder} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>
        {/*** ***********************************/}
        <div className="mb-4">
          <label className="block">color</label>
          <input type="text" name="color" value={carData.color} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">door</label>
          <input type="text" name="door" value={carData.door} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>


        <div className="mb-4">
          <label className="block">Price</label>
          <input type="number" name="price" value={carData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Features (comma separated)</label>
          <input type="text" name='features' value={carData.features} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="mb-4">
          <label className="block">Image URL</label>
          <input type="text" name="image" value={carData.image} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800" />
        </div>

        <div className="col-span-2">
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" >
            Add Car
          </button>
        </div>
      </form>
    </div>
    </div>
    {LogingLoading && (<LoadingPage />)}

    </>
  );
};

export default CarListingForm;
