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
    <div className='h-full flex w-full flex-col'>
      <Nav />
      <div className='container ctnr py-4 mx-auto flex-1 flex-col gap-2 h-full'>
        <Routes>
          <Route path='/' element={<Home />} exact />
          {user ? (
            <>
              <Route path='/profile' element={<Profile />} exact />
            </>
          ) : (
            <>
              <Route path='/signin' element={<Signin />} exact />
              <Route path='/signup' element={<Siginup />} exact />
            </>
          )}
          <Route path='/postlar' element={<Blogs />} exact />
          <Route path='/iletisim' element={<Info />} exact />
          <Route path='/duyurular' element={<Duyurular />} exact />
          <Route path='*' element={<NotFound />} exact />
        </Routes>
      </div>
      <Toaster position='top-left' reverseOrder={false} />
    </div>
  );
}
