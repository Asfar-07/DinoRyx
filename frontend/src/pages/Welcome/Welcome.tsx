import { StarsBackground } from '@/components/animate-ui/components/backgrounds/stars'

function displayAnimation() {
  return (
    <main className='z-10 absolute top-0 flex flex-col justify-center items-center left-0 w-full h-full'>
      <h1 className=' text-5xl z-10 font-bold text-white uppercase'>Welcome to the DinoRyx</h1>
      <p className='text-lg text-white z-10 mt-4'>Thank you for joining our community!</p>
      <button className='bg-(--symbol-color) my-4 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded cursor-pointer'>
        Get Started
      </button>
    </main>
  );
}

export default function Welcome() {
  return (
    <div className='w-full h-screen relative overflow-hidden'>
      <StarsBackground className='z-5 fixed top-0 left-0' Component={displayAnimation}/>
    </div>
  )
}
