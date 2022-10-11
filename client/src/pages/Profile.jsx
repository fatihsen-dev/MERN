import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, blogUpdate, createPost, blogRemove } from "../axios";
import { activeCreatePost } from "../store/postSlice";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import toast from "react-hot-toast";

export default function Profile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activePostPopup } = useSelector((state) => state.blog);
  const [data, setData] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [activePopup, setActivePopup] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    explanation: "",
    text: "",
    blogAuthor: "",
  });

  useEffect(() => {
    setFormData({ ...formData, blogAuthor: user.id });
  }, [user]);

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

  const updateSubmit = (e) => {
    e.preventDefault();

    blogUpdate(updateData._id, updateData)
      .then((res) => {
        toast.success(res.data.message);
        setActivePopup(false);

        getUserData(user.id)
          .then((res) => {
            setData(res.data.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.error(err.response.message);
      });
  };
  const formHandle = (e) => {
    e.preventDefault();
    createPost(formData)
      .then((res) => {
        toast.success("Post oluşturuldu");
        dispatch(activeCreatePost());

        getUserData(user.id)
          .then((res) => {
            setData(res.data.data);
          })
          .catch((err) => console.log(err));

        document.querySelector("#inputTitle").value = "";
        document.querySelector("#inputExplanation").value = "";
        document.querySelector("#inputTextarea").value = "";
      })
      .catch((err) => {
        toast.error("Gönderi oluşturulamadı");
      });
  };

  return (
    <>
      <div className='flex h-full flex-col gap-4 2xl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col px-3 2xl:px-0 xl:px-0 lg:px-0 md:px-3 sm:px-3'>
        <div className='inline-flex mb-auto items-center w-full gap-2 border p-2 rounded-sm 2xl:w-auto xl:w-auto lg:w-auto md:w-full sm:w-full 2xl:flex-col xl:flex-col lg:flex-col md:flex-row sm:flex-row'>
          <img
            className='2xl:h-32 2xl:w-32 xl:h-32 xl:w-32 lg:h-32 lg:w-32 md:h-16 md:w-16 sm:h-16 sm:w-16 h-16 w-16 object-cover rounded-sm'
            src='https://picsum.photos/200/200'
            alt='https://picsum.photos/200/200'
          />
          <div className='flex flex-col w-full'>
            <span className='font-semibold text-xl 2xl:text-base xl:text-base lg:text-base md:text-lg sm:text-lg'>
              {user?.fullname ?? "Default Name"}
            </span>
            <span className='text-xl 2xl:text-sm xl:text-sm lg:text-sm md:text-base sm:text-base text-black/70'>
              {user?.email ?? "default@gmail.com"}
            </span>
          </div>
        </div>
        <div className='flex-1 overflow-auto flex flex-col gap-2 w-full 2xl:w-auto xl:w-auto lg:w-auto md:w-full sm:w-full '>
          <div>
            <div className='flex justify-between bg-blue-500 p-2 rounded-sm items-center'>
              <h1 className='font-semibold text-white'>Postlarım</h1>
              <button
                onClick={() => dispatch(activeCreatePost())}
                className='bg-white hover:bg-white/90 text-blue-500 font-semibold rounded-sm px-2 py-1 text-sm'>
                Yeni Gönderi
              </button>
            </div>
          </div>
          <ul className='grid border p-2 gap-2 flex-1 overflow-auto content-start'>
            {data && (
              <>
                {data.map((item, index) => (
                  <li
                    className='profile-list-item flex justify-between items-center p-2 rounded-sm even:bg-[#eee] even:text-[#222] even:font-medium gap-4 odd:bg-[#222] odd:text-white'
                    key={index}>
                    <span className='flex whitespace-nowrap overflow-hidden text-ellipsis 2xl:w-auto xl:w-auto lg:w-[500px] md:w-[400px] sm:w-[300px] w-[200px]'>
                      {item.title}
                    </span>
                    <div className='flex gap-2 items-center text-base'>
                      <button
                        onClick={() => {
                          setActivePopup(!activePopup);
                          setView(true);
                          setViewData(index);
                        }}
                        className='p-1.5 rounded-sm'>
                        <AiFillEye />
                      </button>
                      <button
                        onClick={() => {
                          setActivePopup(!activePopup);
                          setEdit(true);
                          setEditData(index);
                          setUpdateData(item);
                        }}
                        className='p-1.5 rounded-sm'>
                        <MdModeEdit />
                      </button>
                      <button
                        onClick={() => {
                          blogRemove(item._id)
                            .then((res) => {
                              toast.success(res.data.message);
                              getUserData(user.id)
                                .then((res) => {
                                  setData(res.data.data);
                                })
                                .catch((err) => console.log(err));
                            })
                            .catch((err) => {
                              toast.error(err.response.message);
                            });
                        }}
                        className='p-1.5 rounded-sm'>
                        <AiFillDelete />
                      </button>
                    </div>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
      {activePopup && (
        <div className='absolute inset-0 w-full h-full bg-black/40 z-10 flex justify-center items-center'>
          {edit && (
            <form
              onSubmit={updateSubmit}
              className='bg-white flex flex-col shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4 w-[500px] gap-2'>
              <div className='flex justify-between items-center mb-3'>
                <h2 className='font-medium text-xl'>Gönderiyi Düzenle</h2>
                <button
                  onClick={() => {
                    setActivePopup(!activePopup);
                    setEdit(false);
                    setView(false);
                  }}>
                  <GrFormClose className='text-3xl' />
                </button>
              </div>
              <input
                className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='title'
                id='inputTitle'
                onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                defaultValue={data[editData].title}
                placeholder='Başlık'
              />
              <input
                className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                id='inputExplanation'
                placeholder='Açıklama'
                onChange={(e) =>
                  setUpdateData({ ...updateData, explanation: e.target.value })
                }
                defaultValue={data[editData].explanation}
                name='explanation'
              />
              <textarea
                className='resize-none text-sm shadow appearance-none w-full border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32'
                name='text'
                onChange={(e) => setUpdateData({ ...updateData, text: e.target.value })}
                defaultValue={data[editData].text}
                id='inputTextarea'
                placeholder='Yazınız...'></textarea>
              <button
                className='bg-blue-500 text-white rounded py-2 hover:bg-opacity-90 transition-colors'
                type='submit'>
                Düzenle
              </button>
            </form>
          )}
          {view && (
            <div className='bg-white flex flex-col shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4 w-[500px] gap-2'>
              <button
                onClick={() => {
                  setActivePopup(!activePopup);
                  setEdit(false);
                  setView(false);
                }}>
                <GrFormClose className='text-3xl ml-auto mb-2' />
              </button>
              <div className='flex flex-col gap-1'>
                <span className='font-bold text-2xl'>{data[viewData].title}</span>
                <hr />
                <span className='text-lg opacity-80'>{data[viewData].explanation}</span>
                <hr />
                <span className=' opacity-60'>{data[viewData].text}</span>
              </div>
            </div>
          )}
        </div>
      )}
      {activePostPopup && (
        <div className='absolute inset-0 w-full h-full bg-black/30 flex justify-center items-center z-10'>
          <form
            className='bg-white flex flex-col shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4 w-[500px] gap-2'
            onSubmit={formHandle}>
            <div className='flex justify-between items-center mb-3'>
              <h2 className='font-medium text-xl'>Gönderi oluştur</h2>
              <button onClick={() => dispatch(activeCreatePost())}>
                <GrFormClose className='text-3xl' />
              </button>
            </div>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              type='text'
              name='title'
              id='inputTitle'
              placeholder='Başlık'
            />
            <input
              className='shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
              type='text'
              id='inputExplanation'
              placeholder='Açıklama'
              name='explanation'
            />
            <textarea
              className='resize-none text-sm shadow appearance-none w-full border rounded py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32'
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              name='text'
              id='inputTextarea'
              placeholder='Yazınız...'></textarea>
            <button
              className='bg-blue-500 text-white rounded py-2 hover:bg-opacity-90 transition-colors'
              type='submit'>
              Oluştur
            </button>
          </form>
        </div>
      )}
    </>
  );
}
