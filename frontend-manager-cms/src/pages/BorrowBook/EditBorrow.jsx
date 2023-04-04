//! COMPONENTS
import SelectBox from 'components/SelectBox';
import { useEffect, useState } from 'react';

//! LIBRARY
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Get_Detail_Borrow_Cms_Initial } from 'redux/managers/borrow_slice/borrow_thunk';
import { Get_Detail_Account_Cms_Initial } from 'redux/managers/student_slice/student_thunk';

//! REDUX THUNK

//! DUMMY DATA
import { nationOption, statusBorrowOption } from 'utils/dummy';
import HELPERS from 'utils/helper';

const EditBorrow = (props) => {
  // redux
  const dispatch = useDispatch();
  const detailBook = useSelector((state) => state.borrow.detail_borrow?.element?.result[0]);

  // state
  const { id } = useParams();
  const [detail, setDetai] = useState(null);
  const [status, setStatus] = useState();

  const handleEditBorrow = () => { };

  useEffect(() => {
    dispatch(Get_Detail_Borrow_Cms_Initial({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    setDetai(detailBook);
  }, [detailBook]);

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleEditBorrow}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Tình trạng
              </label>
              {detail?.status && (
                <SelectBox
                  optionData={statusBorrowOption}
                  defaultValue={{
                    value: detail?.status,
                    label: HELPERS.getStatusBorrow(detail?.status),
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
      </div>
    </form>
  );
};

export default EditBorrow;
