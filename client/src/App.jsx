import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Siginup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";


export default function App() {
  const { user } = useSelector((state) => state.auth);
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
          <Route path='*' element={<NotFound />} exact />
        </Routes>
      </div>
      <Toaster position='top-left' reverseOrder={false} />
    </div>
  );
}
