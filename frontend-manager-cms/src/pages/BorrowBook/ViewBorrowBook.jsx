//! COMPONENTS
import moment from 'moment';

//! LIBRARY
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! REDUX THUNK

//! DUMMY DATA
import { useParams } from 'react-router-dom';
import { reset_detail_borrow } from 'redux/managers/borrow_slice/borrow_slice';
import { Get_Detail_Borrow_Cms_Initial } from 'redux/managers/borrow_slice/borrow_thunk';
import HELPERS from 'utils/helper';

const ViewBorrowBook = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const detailBook = useSelector((state) => state.borrow.detail_borrow?.element?.result[0]);

  // react hook form
  const { register } = useForm();

  useEffect(() => {
    dispatch(Get_Detail_Borrow_Cms_Initial({ id }));
    return () => {
      dispatch(reset_detail_borrow());
    };
  }, []);

  return (
    <form className="w-full mt-10" autoComplete="nope">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                ID
              </label>
              <input
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={detailBook?.borrowed_book_id}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Trạng thái
              </label>
              <input
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={HELPERS.getStatusBorrow(detailBook?.status).label}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên sách
              </label>
              <input
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Gia Bảo..."
                defaultValue={detailBook?.name}
                {...register('name')}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Tác giả
              </label>
              <input
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={detailBook?.name_author}
                {...register('name_author')}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nation">
                Học sinh mượn
              </label>
              <input
                disabled
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={detailBook?.user_id}
                {...register('user_id')}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Ngày mượn
              </label>
              {detailBook?.start_date && (
                <input
                  disabled
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  defaultValue={moment(detailBook?.start_date).format('DD/MM/YYYY')}
                  {...register('start_date')}
                />
              )}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="gender">
                Hạn trả
              </label>
              {detailBook?.due_date && (
                <input
                  disabled
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="name"
                  type="text"
                  defaultValue={moment(detailBook?.due_date).format('DD/MM/YYYY')}
                  {...register('due_date')}
                />
              )}
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">{<img src={detailBook?.image_uri} alt="" />}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ViewBorrowBook;
