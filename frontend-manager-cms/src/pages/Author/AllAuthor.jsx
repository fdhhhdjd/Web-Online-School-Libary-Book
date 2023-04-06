import Search from 'components/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete_Author_Cms_Initial, Get_All_Author_Cms_Initial } from 'redux/managers/author_slice/author_thunk';
import { authorSearchOption } from 'utils/dummy';
import HELPERS from 'utils/helper';

const AllAuthor = () => {
  const dispatch = useDispatch();
  const authorList = useSelector((state) => state.author.all_authors_list?.element?.result);
  const [allAuthor, setAllAuthor] = useState(null);

  const handleDelete = (author_id) => {
    dispatch(Delete_Author_Cms_Initial({ author_id })).then(() => {
      dispatch(Get_All_Author_Cms_Initial());
    });
  };

  useEffect(() => {
    dispatch(Get_All_Author_Cms_Initial());
  }, [dispatch]);

  useEffect(() => {
    setAllAuthor(authorList);
  }, [authorList]);

  return (
    <div className="container mt-20">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-2 flex justify-between">
            <Search filterOption={authorSearchOption} setData={setAllAuthor} data={authorList} />

            <Link to="/author/add">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Thêm tác giả
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
                      Giới tính
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Số lượng sách
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Quốc gia
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
                  {allAuthor &&
                    allAuthor.map((author, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {author?.author_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{author?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {HELPERS.getGenderLabel(author?.gender)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">03</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{author?.nation}</td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/author/view/${author?.author_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Truy cập
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/author/edit/${author?.author_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Chỉnh sửa
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(author?.author_id)}
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

export default AllAuthor;
