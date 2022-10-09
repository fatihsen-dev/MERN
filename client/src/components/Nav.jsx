import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Avvvatars from "avvvatars-react";

export default function Nav() {
  const [menu, setMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='bg-blue-500'>
      <nav className='container mx-auto flex items-centerustify-between text-white font-medium px-3 2xl:px-0 xl:px-0 lg:px-0 md:px-0 sm:px-0 py-2 2xl:py-0 xl:py-0 lg:py-0 md:py-0.5 sm:py-0.5 justify-between'>
        <h1 className='flex items-center font-medium text-xl whitespace-nowrap'>
          <NavLink to='/'>Mern App</NavLink>
        </h1>
        <div className='flex items-center gap-3'>
          <ul className='hidden gap-1 2xl:flex xl:flex lg:flex md:flex sm:hidden'>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink className='hover:text-white/80 transition-colors z-10' to='/'>
                Anasayfa
              </NavLink>
            </li>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink
                className='hover:text-white/80 transition-colors z-10'
                to='/postlar'>
                Blog
              </NavLink>
            </li>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink
                className='hover:text-white/80 transition-colors z-10'
                to='/duyurular'>
                Duyurular
              </NavLink>
            </li>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink
                className='hover:text-white/80 transition-colors z-10'
                to='iletisim'>
                Hakkımızda & İletişim
              </NavLink>
            </li>
          </ul>
          {user ? (
            <div
              tabIndex={0}
              className='relative flex justify-center items-center h-full px-2 py-1 select-none group'>
              <span className='cursor-pointer flex items-center gap-1.5'>
                <Avvvatars style={`shape`} size='25' value={user?.fullname} />
                <span>{user?.fullname ?? "Default Name"}</span>
              </span>
              <ul className='z-10 absolute w-40 rounded-sm p-1 hidden text-sm flex-col gap-1 bg-[#eee] text-black top-11 group-focus-within:flex'>
                <li
                  onClick={() => {
                    dispatch(logout());
                    navigate("/signin");
                    toast.success("Çıkış yapılı.");
                  }}
                  className='cursor-pointer px-2 py-1 hover:bg-[#e0e0e0] rounded-sm'>
                  Çıkış
                </li>
                <NavLink
                  to='/profil'
                  className='cursor-pointer px-2 py-1 hover:bg-[#e0e0e0] rounded-sm'>
                  Profilim
                </NavLink>
              </ul>
            </div>
          ) : (
            <NavLink
              className=' text-blue-500 bg-white px-5 py-1 rounded-sm hover:/90'
              to='/signin'>
              Giriş
            </NavLink>
          )}

          <button
            className='fill-white rounded-sm transition-colors flex hover:fill-white/70 2xl:hidden xl:hidden lg:hidden md:hidden sm:flex'
            onClick={() => setMenu(!menu)}>
            <svg width='40' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path d='M21 18H3V16H21V18ZM21 13H3V11H21V13ZM21 8H3V6H21V8Z'></path>
            </svg>
          </button>
        </div>
      </nav>
      {menu && (
        <div className='w-full bg-blue-500 absolute z-20 top-0 flex 2xl:-top-full xl:-top-full lg:-top-full md:-top-full sm:top-0 transition-all flex-col'>
          <div className='flex items-center justify-between py-3 px-5'>
            <span className='text-white text-xl'>Menu</span>
            <button onClick={() => setMenu(!menu)}>
              <svg
                className='fill-white rounded-sm transition-colors hover:fill-white/70'
                width='40'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path d='M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z'></path>
              </svg>
            </button>
          </div>
          <ul className='flex flex-col text-white pb-3'>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink onClick={() => setMenu(false)} className='flex' to='/'>
                Anasayfa
              </NavLink>
            </li>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink onClick={() => setMenu(false)} className='flex' to='/postlar'>
                Blog
              </NavLink>
            </li>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink onClick={() => setMenu(false)} className='flex' to='/duyurular'>
                Duyurular
              </NavLink>
            </li>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink onClick={() => setMenu(false)} className='flex' to='/iletisim'>
                Hakkımızda & İletişim
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
