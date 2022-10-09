import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../axios";
import { activeCreatePost } from "../store/postSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState(false);

  useEffect(() => {
    if (!user.id) {
    } else {
      getUserData(user.id)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className='flex flex-1 overflow-auto'>
      <div className='inline-flex items-center w-full gap-2 bg-blue-500/20 p-2 rounded-sm 2xl:w-auto xl:w-auto lg:w-auto md:w-full sm:w-full 2xl:flex-col xl:flex-col lg:flex-col md:flex-row sm:flex-row'>
        <img
          className='2xl:h-32 2xl:w-32 xl:h-32 xl:w-32 lg:h-32 lg:w-32 md:h-24 md:w-24 sm:h-24 sm:w-24 h-24 w-24 object-cover rounded-sm'
          src='https://picsum.photos/200/200'
          alt='https://picsum.photos/200/200'
        />
        <div className='flex flex-col w-full'>
          <span className='font-semibold text-xl 2xl:text-base xl:text-base lg:text-base md:text-xl sm:text-xl'>
            {user?.fullname ?? "Default Name"}
          </span>
          <span className='text-xl 2xl:text-sm xl:text-sm lg:text-sm md:text-base sm:text-base text-black/70'>
            {user?.email ?? "default@gmail.com"}
          </span>
        </div>
      </div>
      <div className='flex-1 flex flex-col gap-2 w-full 2xl:w-auto xl:w-auto lg:w-auto md:w-full sm:w-full '>
        <div>
          <div className='flex justify-between bg-blue-500 p-2 rounded-sm items-center'>
            <h1 className='font-semibold text-white'>Postlarım</h1>
            <button
              onClick={() => dispatch(activeCreatePost())}
              className='bg-white hover:bg-white/90 text-blue-500 font-semibold rounded-sm px-2 py-1 text-sm'>
              Yeni post
            </button>
          </div>
        </div>
        <ul className='grid grid-cols-2 gap-5 overflow-auto'>
          {data && (
            <>
              {data.map((item, index) => (
                <li className='flex flex-col' key={index}>
                  <span className='bg-red-500/50 flex text-ellipsis overflow-hidden'>
                    {item.title}
                  </span>
                  <span className=' flex text-ellipsis overflow-hidden'>{item.text}</span>
                </li>
              ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
