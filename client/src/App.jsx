import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Siginup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Info from "./pages/Info";
import Duyurular from "./pages/Duyurular";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { userControl } from "./axios";
import { logout, signin } from "./store/authSlice";

export default function App() {
  const { user, key } = useSelector((state) => state.auth);
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

  return (
    <div className='h-full flex w-full flex-col bg-[#f9f9f9]'>
      <Nav />
      <div className='container mx-auto py-2 flex-1 bg-[#f9f9f9]'>
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
    </div>
  );
}
