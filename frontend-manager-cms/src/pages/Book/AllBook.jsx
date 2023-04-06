//! LIBRARY
import Search from 'components/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//! REDUX THUNK
import { Delete_Book_Cms_Initial, Get_All_Book_Cms_Initial } from 'redux/managers/book_slice/book_thunk';
import { bookSearchOption } from 'utils/dummy';

const Book = () => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.book.all_books_list?.element?.result);
  const [allBook, setAllBook] = useState(null);

  const handleDelete = (book_id) => {
    dispatch(Delete_Book_Cms_Initial({ book_id })).then(() => {
      dispatch(Get_All_Book_Cms_Initial());
    });
  };

  useEffect(() => {
    dispatch(Get_All_Book_Cms_Initial());
  }, [dispatch]);

  useEffect(() => {
    setAllBook(bookList);
  }, [bookList]);

  return (
    <div className="container mt-20">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-2 flex justify-between">
            <Search filterOption={bookSearchOption} setData={setAllBook} data={bookList} />

            <Link to="/book/add">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Thêm sách
              </button>
            </Link>
          </div>

          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
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
                      Số lượng
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Vị trí
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
                          {book?.book_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          <Link className="hyper-link" to={`/author/view/${book?.author_id}`}>
                            {book?.name_author}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book?.quantity}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{book?.bookshelf}</td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link to={`/book/view/${book?.book_id}`} className="text-green-500 hover:text-green-700">
                            Truy cập
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link to={`/book/edit/${book?.book_id}`} className="text-green-500 hover:text-green-700">
                            Chỉnh sửa
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(book?.book_id)}
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

export default Book;
