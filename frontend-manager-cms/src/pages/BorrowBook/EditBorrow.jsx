//! COMPONENTS
import SelectBox from 'components/SelectBox';
import moment from 'moment';
import { useEffect, useState } from 'react';

//! LIBRARY
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reset_detail_borrow } from 'redux/managers/borrow_slice/borrow_slice';
import { Get_Detail_Borrow_Cms_Initial, Update_Borrow_Cms_Initial } from 'redux/managers/borrow_slice/borrow_thunk';

//! REDUX THUNK

//! DUMMY DATA
import { statusBorrowOption } from 'utils/dummy';
import HELPERS from 'utils/helper';

const EditBorrow = () => {
  // redux
  const dispatch = useDispatch();
  const detailBook = useSelector((state) => state.borrow.detail_borrow?.element?.result[0]);

  // state
  const { id } = useParams();
  const [status, setStatus] = useState();

  const handleEditBorrow = (e) => {
    e.preventDefault();

    const data = {
      borrowed_book_id: detailBook?.borrowed_book_id,
      book_id: detailBook?.book_id,
      status: status || detailBook?.status,
      start_date: moment().format(),
      due_date: moment().add('14', 'days').format(),
    };

    dispatch(Update_Borrow_Cms_Initial(data));
  };

  useEffect(() => {
    dispatch(Get_Detail_Borrow_Cms_Initial({ id }));

    return () => {
      dispatch(reset_detail_borrow());
    };
  }, []);

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={(e) => handleEditBorrow(e)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Tình trạng
              </label>
              {detailBook?.status && (
                <SelectBox
                  optionData={statusBorrowOption}
                  defaultValue={{
                    value: detailBook?.status,
                    label: HELPERS.getStatusBorrow(detailBook?.status).label,
                  }}
                  setData={setStatus}
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Gia hạn thời gian trả sách
              </label>
              <div className="flex items-center mt-3">
                <input
                  defaultChecked
                  id="default-radio-2"
                  type="radio"
                  value="none"
                  name="default-radio"
                  className="w-4 h-4 text-gray-700 bg-gray-100 border-gray-300 "
                />
                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900">
                  Không có
                </label>
              </div>
              <div className="flex items-center mt-3">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="none"
                  name="default-radio"
                  className="w-4 h-4 text-gray-700 bg-gray-100 border-gray-300 "
                />
                <label htmlFor="default-radio-2" className="ml-2 text-sm font-medium text-gray-900">
                  Thêm
                  <input type="number" name="" id="" min={1} />
                  ngày
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Hạn trả
              </label>
              {detailBook?.due_date && (
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="Gia Bảo..."
                  disabled
                  defaultValue={moment(detailBook?.due_date).format('DD/MM/YYYY')}
                />
              )}
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
  );
};

export default EditBorrow;
