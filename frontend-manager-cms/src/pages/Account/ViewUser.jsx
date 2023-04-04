//! LIBRARY
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! COMPONENTS

//! DUMMY DATA
import SelectBox from 'components/SelectBox';
import Calendar from 'react-calendar';
import { useParams } from 'react-router-dom';
import { Get_Detail_Account_Cms_Initial } from 'redux/managers/student_slice/student_thunk';
import { classOption, genderOption } from 'utils/dummy';
import HELPERS from 'utils/helper';
import { reset_detail_account } from 'redux/managers/student_slice/student_slice';

const ViewUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // react hook form
  const { register, reset } = useForm();

  // state
  const detailAccount = useSelector((state) => state.student.detail_account?.element?.result[0]);

  useEffect(() => {
    dispatch(Get_Detail_Account_Cms_Initial({ student_id: id })).then((result) => {
      const data = result?.payload?.element?.result[0];
      reset({ ...data });
    });

    return () => {
      dispatch(reset_detail_account());
    };
  }, []);

  return (
    <>
      <form className="w-full mt-10" autoComplete="nope">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                  Tên sinh viên
                </label>
                <input
                  disabled
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="Gia Bảo..."
                  {...register('name')}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                  Mã số sinh viên
                </label>
                <input
                  disabled
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="50121..."
                  {...register('mssv')}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                  Giới tính
                </label>

                {detailAccount.gender >= 0 && (
                  <SelectBox
                    isDisabled={true}
                    optionData={genderOption}
                    defaultValue={{
                      value: detailAccount.gender,
                      label: HELPERS.getGenderLabel(detailAccount.gender),
                    }}
                  />
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nation">
                  Lớp
                </label>
                {detailAccount.class && (
                  <SelectBox
                    isDisabled={true}
                    optionData={classOption}
                    defaultValue={{
                      value: detailAccount.class,
                      label: detailAccount.class,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                  Số điện thoại
                </label>
                <input
                  disabled
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="phone"
                  type="text"
                  placeholder="090..."
                  {...register('phone_number')}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  disabled
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="text"
                  placeholder="example@gmail.com"
                  {...register('email')}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                  Ngày sinh
                </label>
                <div className="date-picker">
                  {detailAccount.dob && (
                    <Calendar
                      defaultValue={new Date(moment(detailAccount.dob).format())}
                      value={new Date(moment(detailAccount.dob).format())}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ViewUser;
