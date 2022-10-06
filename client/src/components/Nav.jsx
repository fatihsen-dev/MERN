import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";
export default function Nav() {
  const [menu, setMenu] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className='bg-blue-500'>
      <nav className='container mx-auto flex items-center justify-between text-white font-medium px-3 2xl:px-0 xl:px-0 lg:px-0 md:px-0 sm:px-0 py-2 2xl:py-0 xl:py-0 lg:py-0 md:py-0.5 sm:py-0.5'>
        <h1 className='font-medium text-xl whitespace-nowrap'>
          <NavLink to='/'>Mern App</NavLink>
        </h1>
        <div className='flex items-center gap-3'>
          <ul className='hidden gap-1 2xl:flex xl:flex lg:flex md:flex sm:hidden'>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink className='hover:text-white/80 transition-colors z-10' to=''>
                Anasayfa
              </NavLink>
            </li>
            <li
              tabIndex={0}
              className='py-3 px-3 flex justify-center items-center relative cursor-pointer group'>
              <span
                className='group-hover:text-white/80 group-focus-within:text-white/80 flex items-center gap-1 transition-colors z-10'
                to='b'>
                Hakkımızda
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='fill-white group-focus-within:fill-white/80 group-hover:fill-white/80 flex group-focus-within:hidden'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z'></path>
                </svg>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  className='fill-white group-focus-within:fill-white/80 group-hover:fill-white/80 hidden group-focus-within:flex'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 8.28799L5.98999 14.298L7.40399 15.713L12.004 11.113L16.604 15.713L18.011 14.298L12 8.28799Z'></path>
                </svg>
              </span>
              <ul className='-left-4 absolute w-40 overflow-hidden rounded-sm bg-blue-400 top-11 flex flex-col pointer-events-none opacity-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 text-white'>
                <li className='flex hover:bg-blue-500/20'>
                  <NavLink className='flex py-1.5 w-full px-3' to='/'>
                    ACM Nedir
                  </NavLink>
                </li>
                <li className='flex hover:bg-blue-500/20'>
                  <NavLink className='flex py-1.5 w-full px-3' to='/'>
                    Neler Yapıyoruz
                  </NavLink>
                </li>
                <li className='flex hover:bg-blue-500/20'>
                  <NavLink className='flex py-1.5 w-full px-3' to='/'>
                    Ekibimiz
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink className='hover:text-white/80 transition-colors z-10' to='/'>
                Duyurular
              </NavLink>
            </li>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink className='hover:text-white/80 transition-colors z-10' to='/'>
                Blog
              </NavLink>
            </li>
            <li className='py-3 px-3 flex justify-center items-center relative cursor-pointer'>
              <NavLink className='hover:text-white/80 transition-colors z-10' to='/'>
                İletişim
              </NavLink>
            </li>
          </ul>
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/signin");
              }}
              className=' text-blue-500 bg-white px-5 py-1 rounded-sm hover:/90'>
              Çıkış
            </button>
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
              <NavLink to='/'>Anasayfa</NavLink>
            </li>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink to='/'>Hakkımızda</NavLink>
            </li>
            <li className='group cursor-pointer flex flex-col' tabIndex={0}>
              <span className='px-4 py-1.5 hover:bg-blue-600 flex'>
                Duyurular
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  fill='none'
                  className='fill-white group-focus:fill-white/80 flex group-focus:hidden'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z'></path>
                </svg>
                <svg
                  width='22'
                  height='22'
                  viewBox='0 0 24 24'
                  className='fill-white group-focus:fill-white/80 hidden group-focus:flex'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M12 8.28799L5.98999 14.298L7.40399 15.713L12.004 11.113L16.604 15.713L18.011 14.298L12 8.28799Z'></path>
                </svg>
              </span>
              <ul className='hidden group-focus-within:flex flex-col bg-blue-500 w-full'>
                <li className=''>
                  <NavLink
                    className='flex pl-8 px-2 py-1.5 hover:bg-blue-600 cursor-pointer'
                    to='/'>
                    ACM Nedir
                  </NavLink>
                </li>
                <li className=''>
                  <NavLink
                    className='flex pl-8 px-2 py-1.5 hover:bg-blue-600 cursor-pointer'
                    to='/'>
                    Neler Yapıyoruz
                  </NavLink>
                </li>
                <li className=''>
                  <NavLink
                    className='flex pl-8 px-2 py-1.5 hover:bg-blue-600 cursor-pointer'
                    to='/'>
                    Ekibimiz
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink to='/'>Blog</NavLink>
            </li>
            <li className='px-4 py-1.5 hover:bg-blue-600 cursor-pointer'>
              <NavLink to='/'>İletişim</NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
