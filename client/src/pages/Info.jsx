import banner from "../assets/infoImage.jpg";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillMail,
} from "react-icons/ai";

export default function info() {
  return (
    <div className='h-full px-5 2xl:px-52 xl:px-52 lg:px-32 md:px-5 sm:px-5 flex flex-col items-center gap-8'>
      <img
        className='rounded-sm w-full mt-10 h-52 opacity-90 object-cover'
        src={banner}
        alt={banner}
      />
      <div className='flex w-full flex-col gap-2'>
        <h1 className='text-3xl'>Hakkımızda</h1>
        <p className='text-lg text-black/80'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum aut eius atque
          cumque est praesentium. Vero exercitationem sed architecto id dolorum impedit
          quo, laudantium recusandae modi saepe, minus ducimus temporibus. Repellat
          necessitatibus mollitia laboriosam sint dolore recusandae molestias laudantium,
          totam numquam! Temporibus ex quaerat hic? Recusandae cupiditate amet quis
          consequuntur?
        </p>
      </div>
      <div className='grid grid-cols-2 mt-10 gap-3 w-full items-start 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2'>
        <a
          href='/'
          className='inline-flex bg-black/90 text-white px-1.5 py-0.5 rounded-sm items-center gap-1.5'>
          <AiFillMail className='text-xl' />
          <span>info@mern.com</span>
        </a>
        <a
          href='/'
          className='inline-flex bg-black/90 text-white px-1.5 py-0.5 rounded-sm items-center gap-1.5'>
          <AiFillInstagram className='text-xl' />
          <span>mern.com</span>
        </a>{" "}
        <a
          href='/'
          className='inline-flex bg-black/90 text-white px-1.5 py-0.5 rounded-sm items-center gap-1.5'>
          <AiFillFacebook className='text-xl' />
          <span>mernofficial</span>
        </a>
        <a
          href='/'
          className='inline-flex bg-black/90 text-white px-1.5 py-0.5 rounded-sm items-center gap-1.5'>
          <AiFillTwitterCircle className='text-xl' />
          <span>mernofficial</span>
        </a>
      </div>
    </div>
  );
}
