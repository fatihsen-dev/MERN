import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Siginup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Info from "./pages/Info";
import Duyurular from "./pages/Duyurular";
import Profile from "./pages/Profile";
import toast, { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { createPost, userControl } from "./axios";
import { logout, signin } from "./store/authSlice";
import { activeCreatePost } from "./store/postSlice";
import { GrFormClose } from "react-icons/gr";

export default function App() {
  const { user, key } = useSelector((state) => state.auth);
  const { activePostPopup } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    if (key) {
      userControl({ key: key.id })
        .then((response) => {
          const { _id, email, fullname } = response.data;
          dispatch(signin({ id: _id, email, fullname }));
        })
        .catch((err) => {
          dispatch(logout());
        });
    } else {
      dispatch(logout());
    }
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    explanation: "",
    text: "",
    blogAuthor: "",
  });

  useEffect(() => {
    setFormData({ ...formData, blogAuthor: user.id });
  }, [user]);

  const formHandle = (e) => {
    e.preventDefault();
    createPost(formData)
      .then((res) => {
        toast.success("Post oluşturuldu");
        dispatch(activeCreatePost());

        document.querySelector("#inputTitle").value = "";
        document.querySelector("#inputExplanation").value = "";
        document.querySelector("#inputTextarea").value = "";
      })
      .catch((err) => {
        toast.err("Post oluşturulamadı");
      });
  };

  return (
    <div className='h-full flex w-full flex-col gap-2 bg-[#f9f9f9]'>
      <Nav />
      <div className='container mx-auto flex flex-col gap-2 flex-1 bg-[#f9f9f9]'>
        <Routes>
          <Route path='/' element={<Home />} exact />
          {user ? (
            <></>
          ) : (
            <>
              <Route path='/signin' element={<Signin />} exact />
              <Route path='/signup' element={<Siginup />} exact />
            </>
          )}
          <Route path='/postlar' element={<Blogs />} exact />
          <Route path='/iletisim' element={<Info />} exact />
          <Route path='/duyurular' element={<Duyurular />} exact />
          <Route path='/profil' element={<Profile />} exact />
          <Route path='*' element={<NotFound />} exact />
        </Routes>
      </div>
      <Toaster position='top-left' reverseOrder={false} />
      {activePostPopup && (
        <div className='absolute w-full h-full bg-black/30 flex justify-center items-center z-10'>
          <form
            className='bg-white flex flex-col shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4 w-[500px] gap-2'
            onSubmit={formHandle}>
            <div className='flex justify-between items-center mb-3'>
              <h2 className='font-medium text-xl'>Create Post</h2>
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
            <button type='submit'>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
