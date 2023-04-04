//! COMPONENTS
import Loading from 'components/Loading';
import SelectBox from 'components/SelectBox';

//! LIBRARY
import { useState } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

//! REDUX THUNK
import useUploadCloud from 'custom_hook/useUpload/uploadMediaCloud';

//! DUMMY DATA
import { genderOption, nationOption } from 'utils/dummy';
import HELPERS from 'utils/helper';

const AuthorForm = (props) => {
  const { handleUpload } = useUploadCloud();
  const defaultImageAuthor =
    'https://res.cloudinary.com/dfupi3m0b/image/upload/v1679983323/library_school_image/images/1467365270468165634/1668798157976240128/1679983321408-user.png';

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // redux
  const { result_upload, loading_media } = useSelector((state) => ({
    ...state.media,
  }));

  // state
  const [isReset, setIsReset] = useState(false);

  const onSelectFile = (e) => {
    handleUpload(e);
  };

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(props.onSubmit)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên tác giả
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Gia Bảo..."
                defaultValue={props.defaultData?.name}
                {...register('name', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.name?.type === 'required' ? 'Mời bạn nhập tên tác giả' : ''}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Giới tính
              </label>
              {props.defaultData?.gender >= 0 ? (
                <SelectBox
                  optionData={genderOption}
                  defaultValue={{
                    value: props.defaultData?.gender,
                    label: HELPERS.getGenderLabel(props.defaultData?.gender),
                  }}
                  setData={props.setGender}
                />
              ) : (
                <SelectBox optionData={genderOption} isReset={isReset} setData={props.setGender} />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nation">
                Quốc gia
              </label>
              {props.defaultData?.nation ? (
                <SelectBox
                  optionData={nationOption}
                  defaultValue={{
                    value: props.defaultData?.nation,
                    label: props.defaultData?.nation,
                  }}
                  setData={props.setNation}
                />
              ) : (
                <SelectBox optionData={nationOption} isReset={isReset} setData={props.setNation} />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Ngày sinh
              </label>
              <div className="date-picker">
                {props.defaultData?.dob ? (
                  <Calendar defaultValue={props.defaultData?.dob} onChange={props.setDob} value={props.dob} />
                ) : (
                  <Calendar onChange={props.setDob} value={props.dob} />
                )}
              </div>
            </div>
          </div>
          {!props.readOnly && (
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
          )}
        </div>
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">
                  {loading_media ? (
                    <Loading />
                  ) : (
                    <img
                      src={result_upload?.result?.url || props.defaultData?.avatar_uri || defaultImageAuthor}
                      alt=""
                    />
                  )}
                </div>
                {!props.readOnly && (
                  <>
                    <input type="file" id="avatar" onChange={onSelectFile} className="hidden" />
                    <label htmlFor="avatar">Chọn ảnh</label>
                    <div className="profile__info__image__preview__require">
                      Dung lượng file tối đa 1 MB
                      <br />
                      Định dạng: .JPG, .JPEG, .PNG
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AuthorForm;
