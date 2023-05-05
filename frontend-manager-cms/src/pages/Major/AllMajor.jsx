//! LIBRARY
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//! COMPONENT
import Search from 'components/Search';

//! REDUX
import { Delete_Major_Cms_Initial, Get_All_Major_Cms_Initial } from 'redux/managers/major_slice/major_thunk';
import { majorSearchOption } from 'utils/dummy';

const AllMajors = () => {
  // redux
  const dispatch = useDispatch();
  const allMajor = useSelector((state) => state.major.all_categories?.element?.result);

  // state
  const [majorList, setMajorList] = useState(null);

  const handleDelete = (industry_code_id) => {
    dispatch(Delete_Major_Cms_Initial({ industry_code_id })).then(() => {
      dispatch(Get_All_Major_Cms_Initial());
    });
  };

  useEffect(() => {
    dispatch(Get_All_Major_Cms_Initial());
  }, [dispatch]);

  useEffect(() => {
    setMajorList(allMajor);
  }, [allMajor]);

  return (
    <div className="container mt-20">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-2 flex justify-between">
            <Search filterOption={majorSearchOption} setData={setMajorList} data={allMajor} />

            <Link to="/major/add">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Thêm thể loại
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
                      Tên thể loại
                    </th>

                    {/* <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                      Truy cập
                    </th> */}
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                      Chỉnh sửa
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                      Xóa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {majorList &&
                    majorList?.map((major, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {major?.industry_code_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{major?.name}</td>

                        {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/major/view/${major?.industry_code_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Truy cập
                          </Link>
                        </td> */}
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/major/edit/${major?.industry_code_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Chỉnh sửa
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(major?.industry_code_id)}
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

export default AllMajors;
