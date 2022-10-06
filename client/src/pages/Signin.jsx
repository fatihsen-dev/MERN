import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { signin } from "../store/authSlice";

export default function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const submitHandle = (e) => {
    e.preventDefault();
    login(formData)
      .then((res) => {
        toast.success("Giriş yapıldı.");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        dispatch(signin(formData));
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data.message + " !"));
  };

  return (
    <div className='flex justify-center items-start h-full'>
      <form
        onSubmit={submitHandle}
        className='bg-white shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4 w-96'>
        <h1 className='text-center text-gray-700 mb-3 text-2xl font-semibold'>
          Giriş Yap
        </h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Mail
          </label>
          <input
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            required
            type='email'
            name='email'
            placeholder='Mail'
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'>
            Şifre
          </label>
          <input
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            required
            placeholder='*************'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            disabled={!formData.email || !formData.password}
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-500/60'
            type='submit'>
            Giriş yap
          </button>
          <NavLink
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600'
            to='/signup'>
            Kayıt ol
          </NavLink>
        </div>
      </form>
    </div>
  );
}
