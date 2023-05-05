//! LIBRARY
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';

//! COMPONENTS
import SelectBox from 'components/SelectBox';

//! DUMMY DATA
import { classOption, genderOption, tabBorrowBook } from 'utils/dummy';
import useUploadCloud from 'custom_hook/useUpload/uploadExcelCloud';
import { useDispatch, useSelector } from 'react-redux';
import { Create_Account_Excel_Cms_Initial } from 'redux/managers/student_slice/student_thunk';

const UserForm = (props) => {
  const dispatch = useDispatch();
  // state
  const [activeTab, setActiveTab] = useState(0);
  const lineRef = useRef(null);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //upload file
  const { handleUpload } = useUploadCloud();

  const { result_upload } = useSelector((state) => ({
    ...state.media,
  }));

  const onSelectFile = (e) => {
    handleUpload(e);
  };

  const handleCreateExcel = (e) => {
    e.preventDefault();
    console.log({ url_document: result_upload?.result?.url });
    dispatch(Create_Account_Excel_Cms_Initial({ url_document: result_upload?.result?.url }));
  };

  // select tabs
  const tabRefs = useMemo(() => {
    const refs = {};
    tabBorrowBook.forEach((item, idx) => {
      refs[idx] = React.createRef(null);
    });

    return refs;
  }, []);

  const handleSelectTab = (e, idx) => {
    setActiveTab(idx);
    lineRef.current.style.left = tabRefs[idx].current.offsetLeft + 'px';
    lineRef.current.style.width = tabRefs[idx].current.offsetWidth + 'px';
  };

  useEffect(() => {
    lineRef.current.style.left = tabRefs[0].current.offsetLeft + 'px';
    lineRef.current.style.width = tabRefs[0].current.offsetWidth + 'px';
  }, [tabRefs]);

  return (
    <div className="book_borrow_list">
      <div className="tabs">
        {tabBorrowBook &&
          tabBorrowBook.map((item, idx) => (
            <div
              className={`tab-item ${idx === activeTab ? 'active' : ''}`}
              onClick={(e) => handleSelectTab(e, idx)}
              ref={tabRefs[idx]}
              key={idx}
            >
              {item.displayText}
            </div>
          ))}
        <div className="line" ref={lineRef}></div>
      </div>

      <div className="tab-content">
        <div className="tab-pane active">
          {activeTab === 0 ? (
            <form className="w-full mt-10" autoComplete="nope">
              <div className="w-2/5">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="file_input"
                  type="file"
                  onChange={(e) => onSelectFile(e)}
                />
              </div>

              <div className="flex flex-wrap -mx-3 mt-5">
                <div className="w-full px-3">
                  <button
                    onClick={(e) => handleCreateExcel(e)}
                    type="submit"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(props.onSubmit)}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Tên sinh viên
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="name"
                        type="text"
                        placeholder="Gia Bảo..."
                        {...register('name', {
                          required: true,
                        })}
                      />
                      <div className="mt-1 text-red-700">
                        {errors?.name?.type === 'required' ? 'Mời bạn nhập tên sinh viên' : ''}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="name"
                      >
                        Mã số sinh viên
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="name"
                        type="text"
                        placeholder="50121..."
                        {...register('mssv', {
                          required: true,
                        })}
                      />
                      <div className="mt-1 text-red-700">
                        {errors?.mssv?.type === 'required' ? 'Mời bạn nhập mã số sinh viên' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="gender"
                      >
                        Giới tính
                      </label>
                      <SelectBox optionData={genderOption} setData={props.setGender} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="nation"
                      >
                        Lớp
                      </label>
                      <SelectBox optionData={classOption} setData={props.setClassroom} />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="phone"
                      >
                        Số điện thoại
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="phone"
                        type="text"
                        placeholder="090..."
                        {...register('phone_number', {
                          required: true,
                        })}
                      />
                      <div className="mt-1 text-red-700">
                        {errors?.phone_number?.type === 'required' ? 'Mời bạn nhập số điện thoại' : ''}
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="text"
                        placeholder="example@gmail.com"
                        {...register('email', {
                          required: true,
                        })}
                      />
                      <div className="mt-1 text-red-700">
                        {errors?.email?.type === 'required' ? 'Mời bạn nhập email' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="gender"
                      >
                        Ngày sinh
                      </label>
                      <div className="date-picker">
                        <Calendar onChange={props.setDob} value={props.dob} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <button
                        type="submit"
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded float-right"
                      >
                        Lưu
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserForm;
