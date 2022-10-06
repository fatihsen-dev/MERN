import { NavLink, useNavigate } from "react-router-dom";
import MaskInput from "react-maskinput";
import { useState } from "react";
import { register } from "../axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const submitHandle = (e) => {
    e.preventDefault();

    if (password === formData.password) {
      if (
        formData.fullname.length > 0 &&
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        formData.phoneNumber.length > 0
      ) {
        register(formData)
          .then((res) => {
            toast.success("Giriş yapıldı.");
            navigate("/signin");
          })
          .catch((err) => toast.error(err.response.data.message + " !"));
      } else {
        toast.error("Lütfen boş alanları doldurun.");
      }
    } else {
      toast.error("Şifreler eşleşmiyor !");
    }
  };

  return (
    <div className='flex justify-center items-start h-full'>
      <form
        onSubmit={submitHandle}
        className='bg-white shadow-md rounded mt-10 px-8 pt-6 pb-8 mb-4'>
        <h1 className='text-center text-gray-700 mb-3 text-2xl font-semibold'>
          Kayıt ol
        </h1>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='fullname'>
            Ad Soyad
          </label>
          <input
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='fullname'
            type='text'
            name='fullname'
            placeholder='Ad Soyad'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Mail
          </label>
          <input
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            placeholder='örnek@gmail.com'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='phonenumber'>
            Telefon
          </label>
          <MaskInput
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            maskChar=''
            mask={"0 000 000 00 00"}
            size={8}
            id='phonenumber'
            type='text'
            name='phoneNumber'
            placeholder='0 555 555 55 55'
          />
        </div>
        <div className='mb-6 flex gap-2'>
          <div>
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
              placeholder='*************'
            />
          </div>
          <div>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='passwordAgain'>
              Şifreyi takrar girin
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='passwordAgain'
              type='password'
              name='passwordAgain'
              placeholder='*************'
            />
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-500/50'
            type='submit'>
            Kayıt ol
          </button>
          <NavLink
            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600'
            to='/signin'>
            Giriş yap
          </NavLink>
        </div>
      </form>
    </div>
  );
}
