import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <h1 className='flex justify-center items-center h-full flex-col leading-3'>
      <div className='w-[200px] h-[180px] 2xl:w-[350px] 2xl:h-[350px] xl:w-[350px] xl:h-[350px] lg:w-[250px] lg:h-[250px]'>
        <Player
          autoplay
          loop
          src='https://assets9.lottiefiles.com/temp/lf20_0txt7u.json'
          style={{ height: "100%", width: "100%" }}></Player>
      </div>
      <span className='text-xl'>
        <NavLink className='text-blue-500 font-medium' to='/'>
          Home
        </NavLink>
      </span>
    </h1>
  );
}
