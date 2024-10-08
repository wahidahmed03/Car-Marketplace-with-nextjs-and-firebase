import React from 'react'

function MainButton({title}) {
  return (
    <div className='mx-2'>
        <div className=" h-[20px]  group overflow-hidden ">
            <div className=" h-[20px]  group-hover:-mt-7 transition-all duration-500 cursor-pointer">
                <p >{title}</p>
                <p >{title}</p>
            </div>
        </div>
    </div>
  )
}

export default MainButton