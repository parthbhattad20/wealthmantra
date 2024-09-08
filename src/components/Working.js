import React from 'react';

function Working() {
  return (
    <div className='h-full' id="how-we-work-section">
      <div className="text-center pl-24 mx-auto pt-6 font-sans font-semibold text-white text-4xl rounded-md p-4">
        How we work
      </div>
      <div className='flex p-5'>
        <div className='flex-1'>
          <div className='pl-48'>
            <img src='./images/one.png' className='justify-center w-14' alt=''/>
          </div> 
          <div className='pl-24 p-4 text-left text-lg text-white'>Login to the Phishinstinct website and add users to send the email.</div>
        </div>
        <div className='flex-1'>
          <div className='pl-48'>
            <img src='./images/two.png' className='justify-center w-14' alt=''/>
          </div> 
          <div className='pl-24 p-4 text-left text-lg text-white'>Select a template for the email and create a campaign</div>
        </div>
        <div className='flex-1'>
          <div className='pl-48'>
            <img src='./images/three.png' className='justify-center items-center w-14' alt=''/> 
          </div>
          <div className='pl-24 p-4 text-left text-lg text-white'>Start the campaign at your desired time and get the analytics. Book a demo with us to know more !</div>
        </div>  
      </div>
      <div className='relative'>
        {/* Radial gradient from center */}
        {/* <div className='bg-teal-30 rounded-lg'> */}
        <img src='./images/Working.png' className='ml-32 rounded-lg   border-black border-1' alt='' style={{ height: '95vh', width: '186vh' }}/>
      </div> 
      {/* </div>  */}
    </div>
  )
}

export default Working;
