export default function Duyurular() {
  return (
    <div className='grid grid-cols-1 mx-3 px-1 gap-2 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 2xl:mx-0 xl:mx-0 lg:mx-0 md:mx-3 sm:mx-3 h-full overflow-auto content-start'>
      <div className='flex flex-col p-3 border rounded-sm gap-0.5 first:border-blue-300 shadow-sm shadow-blue-200'>
        <h4 className='font-medium'>Lorem, ipsum dolor.</h4>
        <div className='text-black/80'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo saepe vero,
          cupiditate nam quos facilis.
        </div>
        <div className='flex justify-end mt-4'>
          <span className='text-xs'>12/05/2022</span>
        </div>
      </div>
      <div className='flex flex-col p-3 border rounded-sm gap-0.5 first:border-red-500'>
        <h4 className='font-medium'>Lorem, ipsum dolor.</h4>
        <div className='text-black/80'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo saepe vero,
          cupiditate nam quos facilis.
        </div>
        <div className='flex justify-end mt-4'>
          <span className='text-xs'>9/05/2021</span>
        </div>
      </div>
      <div className='flex flex-col p-3 border rounded-sm gap-0.5 first:border-red-500'>
        <h4 className='font-medium'>Lorem, ipsum dolor.</h4>
        <div className='text-black/80'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo saepe vero,
          cupiditate nam quos facilis.
        </div>
        <div className='flex justify-end mt-4'>
          <span className='text-xs'>14/03/2021</span>
        </div>
      </div>
      <div className='flex flex-col p-3 border rounded-sm gap-0.5 first:border-red-500'>
        <h4 className='font-medium'>Lorem, ipsum dolor.</h4>
        <div className='text-black/80'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo saepe vero,
          cupiditate nam quos facilis.
        </div>
        <div className='flex justify-end mt-4'>
          <span className='text-xs'>28/01/2021</span>
        </div>
      </div>
      <div className='flex flex-col p-3 border rounded-sm gap-0.5 first:border-red-500'>
        <h4 className='font-medium'>Lorem, ipsum dolor.</h4>
        <div className='text-black/80'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo saepe vero,
          cupiditate nam quos facilis.
        </div>
        <div className='flex justify-end mt-4'>
          <span className='text-xs'>05/01/2021</span>
        </div>
      </div>
    </div>
  );
}
