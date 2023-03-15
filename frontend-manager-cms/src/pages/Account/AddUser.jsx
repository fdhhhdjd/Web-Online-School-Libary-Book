import moment from 'moment';
import { useEffect, useState } from 'react';
import { DayPicker, MonthPicker, YearPicker } from 'react-dropdown-date';
import { useDispatch } from 'react-redux';

const AddUser = () => {
  const dispatch = useDispatch();
  const today = moment();
  const [date, setDate] = useState({ year: today.year(), month: today.month() + 1, day: today.date() });
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(profile_student?.data?.avatar_uri);
      return;
    }

    // get first image
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <form className="w-full mt-10" autoComplete="nope">
      <div className="text-xl -mx-3 font-bold mb-5">Nhập liệu thông tin</div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-id">
                ID
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-id"
                type="text"
                disabled
                readOnly
              />
            </div>
          </div>
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
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Giới tính
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="gender"
                >
                  <option value={1}>Nam</option>
                  <option value={0}>Nữ</option>
                  <option value={3}>Khác</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nation">
                Quốc gia
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="nation"
                type="text"
                placeholder="Việt Nam..."
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Ngày sinh
              </label>
              <div className="date-picker">
                <DayPicker
                  defaultValue={date.day}
                  year={date.year} // mandatory
                  month={date.month} // mandatory
                  endYearGiven // mandatory if end={} is given in YearPicker
                  onChange={(day) => {
                    // mandatory
                    setDate((prev) => ({ ...prev, day }));
                  }}
                  id={'day'}
                  classes={`dropdown-date `}
                  optionClasses={'option'}
                />

                <MonthPicker
                  defaultValue={date.month}
                  numeric // to get months as numbers
                  endYearGiven // mandatory if end={} is given in YearPicker
                  year={date.year} // mandatory
                  onChange={(month) => {
                    // mandatory
                    setDate((prev) => ({ ...prev, month }));
                  }}
                  id={'month'}
                  classes={`dropdown-date`}
                  optionClasses={'option'}
                />

                <YearPicker
                  defaultValue={date.year}
                  start={1980} // default is 1900
                  end={2023} // default is current year
                  reverse // default is ASCENDING
                  onChange={(year) => {
                    // mandatory
                    setDate((prev) => ({ ...prev, year }));
                  }}
                  id={'year'}
                  classes={`dropdown-date`}
                  optionClasses={'option'}
                />
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
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">
                  <img src={preview} alt="" />
                </div>
                <input type="file" id="avatar" onChange={onSelectFile} className="hidden" />
                <label htmlFor="avatar">Chọn ảnh</label>
                <div className="profile__info__image__preview__require">
                  Dung lượng file tối đa 1 MB
                  <br />
                  Định dạng: .JPG, .JPEG, .PNG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="-mx-3 mt-5">
        <div className="text-xl font-bold mb-5">Nhập từ file Excel, CSV</div>

        <div className="w-2/5">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="file_input"
            type="file"
          />
        </div>

        <div className="flex flex-wrap -mx-3 mt-5">
          <div className="w-full px-3">
            <button
              type="submit"
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddUser;
