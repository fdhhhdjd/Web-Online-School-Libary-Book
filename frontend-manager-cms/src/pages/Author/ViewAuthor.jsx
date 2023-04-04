//! COMPONENTS
import SelectBox from 'components/SelectBox';
import moment from 'moment';

//! LIBRARY
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! REDUX THUNK

//! DUMMY DATA
import { useParams } from 'react-router-dom';
import { reset_detail_author } from 'redux/managers/author_slice/author_slice';
import { Get_Detail_Author_Cms_Initial } from 'redux/managers/author_slice/author_thunk';
import { genderOption, nationOption } from 'utils/dummy';
import HELPERS from 'utils/helper';

const ViewAuthor = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const detailAuthor = useSelector((state) => state.author.detail_author?.element?.result);

  // react hook form
  const { register } = useForm();

  useEffect(() => {
    dispatch(Get_Detail_Author_Cms_Initial({ id }));

    return () => {
      dispatch(reset_detail_author());
    };
  }, [id]);

  return (
    <form className="w-full mt-10" autoComplete="nope">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên tác giả
              </label>
              <input
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Gia Bảo..."
                defaultValue={detailAuthor?.name}
                {...register('name')}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Giới tính
              </label>
              {console.log(detailAuthor?.gender)}
              {detailAuthor?.gender >= 0 && (
                <SelectBox
                  optionData={genderOption}
                  defaultValue={{
                    value: detailAuthor?.gender,
                    label: HELPERS.getGenderLabel(detailAuthor?.gender),
                  }}
                  isDisabled={true}
                />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nation">
                Quốc gia
              </label>
              {detailAuthor?.nation && (
                <SelectBox
                  optionData={nationOption}
                  defaultValue={{
                    value: detailAuthor?.nation,
                    label: detailAuthor?.nation,
                  }}
                  isDisabled={true}
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Ngày sinh
              </label>
              <div className="date-picker">
                {detailAuthor?.dob && (
                  <Calendar
                    defaultValue={new Date(moment(detailAuthor?.dob).format())}
                    value={new Date(moment(detailAuthor?.dob).format())}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">{<img src={detailAuthor?.avatar_uri} alt="" />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ViewAuthor;
