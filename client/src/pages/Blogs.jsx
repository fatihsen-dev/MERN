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
    <div className='h-full flex overflow-auto px-2 justify-center items-start'>
      {blogData ? (
        <ul className='grid flex-1 grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-2 '>
          {blogData.map((blog, index) => (
            <li
              className='flex flex-col gap-1 border p-3 rounded-sm w-full overflow-hidden text-ellipsis'
              key={index}>
              <h2 className='font-bold text-xl w-full overflow-hidden text-ellipsis'>
                {blog.title}
              </h2>
              <h4 className='whitespace-nowrap text-ellipsis overflow-hidden'>
                {blog.explanation}
              </h4>
              <span className='whitespace-nowrap text-ellipsis overflow-hidden'>
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
