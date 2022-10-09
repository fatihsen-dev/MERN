import { useState } from "react";
import { useEffect } from "react";
import { getAllData } from "../axios";

export default function Blogs() {
  const [blogData, setBlogData] = useState(false);

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
    <div className='h-full flex justify-center items-start pt-5'>
      {blogData ? (
        <ul className='grid grid-cols-1 px-3 gap-4 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 2xl:px-0 xl:px-0 lg:px-0 md:px-3 sm:px-3'>
          {blogData.map((blog, index) => (
            <li
              className='flex flex-col gap-1 border p-3 rounded-sm w-full overflow-hidden text-ellipsis'
              key={index}>
              <h2 className='font-bold text-xl w-full overflow-hidden text-ellipsis'>
                {blog.title}
              </h2>
              <h4>{blog.explanation}</h4>
              <span className='text-sm text-black/70 w-full overflow-hidden text-ellipsis'>
                {blog.text}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}
