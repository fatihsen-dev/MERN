import { useState } from "react";
import { useEffect } from "react";
import { getAllData } from "../axios";
import { GrFormClose } from "react-icons/gr";

export default function Blogs() {
  const [blogData, setBlogData] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState(false);

  useEffect(() => {
    getAllData()
      .then((res) => {
        res.data.blogs ? setBlogData(res.data.blogs) : setBlogData(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='h-full flex overflow-auto px-2 justify-center items-start'>
        {blogData ? (
          <ul className='grid flex-1 grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 '>
            {blogData.map((blog, index) => (
              <li
                className='flex flex-col gap-1 border p-3 rounded-sm w-full overflow-hidden text-ellipsis'
                key={index}>
                <h2
                  onClick={() => {
                    setViewData(blog);
                    setView(true);
                  }}
                  className='font-bold cursor-pointer text-blue-500 text-lg w-full overflow-hidden text-ellipsis'>
                  {blog.title}
                </h2>
                <h4 className='whitespace-nowrap text-ellipsis overflow-hidden'>
                  {blog.explanation}
                </h4>
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>

      {view && (
        <div className='absolute inset-0 w-full h-full bg-black/40 z-10 flex justify-center items-center'>
          <div className='bg-white flex flex-col shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4 w-[500px] gap-2'>
            <button
              onClick={() => {
                setView(false);
              }}>
              <GrFormClose className='text-3xl ml-auto mb-2' />
            </button>
            <div className='flex flex-col gap-1'>
              <span className='font-bold text-2xl'>{viewData.title}</span>
              <hr />
              <span className='text-lg opacity-80'>{viewData.explanation}</span>
              <hr />
              <span className=' opacity-60'>{viewData.text}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
