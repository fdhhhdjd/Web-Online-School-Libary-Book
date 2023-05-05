//! LIBRARY
import Search from 'components/Search';
import SelectBox from 'components/SelectBox';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//! REDUX THUNK
import { Delete_Book_Cms_Initial, Get_All_Book_Cms_Initial } from 'redux/managers/book_slice/book_thunk';
import { reset_all_borrow } from 'redux/managers/borrow_slice/borrow_slice';
import { Get_All_Borrow_Cms_Initial } from 'redux/managers/borrow_slice/borrow_thunk';
import { borrowSearchOption, statusBorrowOption } from 'utils/dummy';
import HELPERS from 'utils/helper';

const AllBorrowBook = () => {
  let dataFilter = useRef(null);
  const dispatch = useDispatch();
  const borrowList = useSelector((state) => state.borrow.all_borrow_list?.element?.result);
  const [allBook, setAllBook] = useState(null);
  const [status, setStatus] = useState(0);

  const handleDelete = (book_id) => {
    dispatch(Delete_Book_Cms_Initial({ book_id })).then(() => {
      dispatch(Get_All_Book_Cms_Initial());
    });
  };

  useEffect(() => {
    dispatch(Get_All_Borrow_Cms_Initial());

    return () => {
      dispatch(reset_all_borrow());
    };
  }, [dispatch]);

  useEffect(() => {
    if (status === 0 && borrowList) {
      dataFilter.current = [...borrowList];
    } else {
      dataFilter.current = borrowList && borrowList.filter((item) => item?.status === status);
    }

    if (dataFilter.current) {
      setAllBook(dataFilter.current);
    }
  }, [status, borrowList]);

  return (
    <div className="container mt-20">
      <div className="flex flex-col">
        <div>
          <div className="py-3 pl-2 flex justify-between">
            <div className="flex justify-center content-between">
              <Search
                filterOption={borrowSearchOption}
                setData={setAllBook}
                initData={borrowList}
                dataFilter={dataFilter.current}
              />
              <div className="ml-5 w-44">
                <SelectBox
                  optionData={statusBorrowOption}
                  defaultValue={{
                    value: 0,
                    label: 'Tất cả',
                  }}
                  setData={setStatus}
                />
              </div>
            </div>
            <div>
              <Link to="/book/add">
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  Thêm sách
                </button>
              </Link>
            </div>
          </div>

          <div className="p-1.5 w-full inline-block align-middle">
            <div className="border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Tên
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Tác giả
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      ID sinh viên
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Tình trạng
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                      Truy cập
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                      Chỉnh sửa
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allBook &&
                    allBook?.map((book, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {book?.borrowed_book_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book?.name_author}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book?.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`${HELPERS.getStatusBorrow(book?.status).className
                              } text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full `}
                          >
                            {HELPERS.getStatusBorrow(book?.status).label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/borrow/view/${book?.borrowed_book_id}`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Truy cập
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/borrow/edit/${book?.borrowed_book_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Chỉnh sửa
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(book?.borrowed_book_id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBorrowBook;
