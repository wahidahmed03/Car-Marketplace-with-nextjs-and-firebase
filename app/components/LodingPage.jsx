import React from 'react'

function LoadingPage() {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
        <div className="w-full h-full p-6  rounded-md shadow-md flex items-center  bg-gray-100 dark:bg-gray-900 justify-center">
          <img src="/loding.png" alt="Loading" width={100}height={100} className="animate-spin-custom"/>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
