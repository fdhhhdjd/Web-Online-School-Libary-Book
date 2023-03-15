import { SCHOOL_LOGO } from 'imports/home_import';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Login_Cms_Initial } from 'redux/managers/authentication_slice/auth_thunk';
import HELPERS from 'utils/helper';

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    const values = HELPERS.formDataGeneral(e.target);

    dispatch(Login_Cms_Initial(values));
  };
  return (
    <div className="w-screen">
      <div className="h-screen grid grid-cols-5">
        <div className="col-span-2 bg-slate-400 w-full h-screen md:p-36">
          <div className="text-4xl font-bold text-center mb-10">Đăng nhập</div>
          <form action="" onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="mssv" className="block mb-2 text-md font-medium text-gray-900 dark:text-black">
                Mã số nhân viên
              </label>
              <input
                type="text"
                id="mssv"
                name="mssv"
                className="bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="501210646"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-black">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="•••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded float-right mt-3"
            >
              Đăng nhập
            </button>
          </form>
        </div>
        <div className="col-span-3 flex items-center justify-center flex-col">
          <img src={SCHOOL_LOGO} alt="" />
          <div className="text-2xl capitalize font-semibold my-5">Quản lý thư viện ITC</div>
          <div className="text-3xl capitalize font-semibold">Trường cao đẳng công nghệ thông tin</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
