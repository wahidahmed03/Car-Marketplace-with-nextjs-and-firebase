import React from 'react'

function DashBordProfile({userdata}) {
  return (
    <>
    <div className=" w-full h-full flex flex-col items-center justify-center ">
        <div className=" flex flex-col items-center justify-center gap-5 ">
            <div className="w-[180px] h-[180px] bg-red-500 rounded-full flex items-center justify-center">
              <img src={userdata.ProfilePic} alt="profile" className='w-[180px] h-[180px] rounded-full'  />
            </div>
            <div className=" font-semibold">
                <p className='text-3xl '>{userdata.name}</p>
                <p>{userdata.name}</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default DashBordProfile