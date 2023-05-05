//! LIBRARY
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

//! COMPONENT
import Search from 'components/Search';

//! REDUX
import {
  Delete_Category_Cms_Initial,
  Get_All_Category_Cms_Initial,
} from 'redux/managers/category_slice/category_thunk';
import { categorySearchOption } from 'utils/dummy';

const AllCategories = () => {
  // redux
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.category.all_categories?.element?.result);

  // state
  const [categoryList, setCategoryList] = useState(null);

  const handleDelete = (category_id) => {
    dispatch(Delete_Category_Cms_Initial({ category_id })).then(() => {
      dispatch(Get_All_Category_Cms_Initial());
    });
  };

  useEffect(() => {
    dispatch(Get_All_Category_Cms_Initial());
  }, [dispatch]);

  useEffect(() => {
    setCategoryList(allCategories);
  }, [allCategories]);

  return (
    <div className="container mt-20">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-2 flex justify-between">
            <Search filterOption={categorySearchOption} setData={setCategoryList} data={allCategories} />

            <Link to="/category/add">
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
                  {categoryList &&
                    categoryList?.map((category, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {category?.category_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{category?.name}</td>

                        {/* <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/category/view/${category?.category_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Truy cập
                          </Link>
                        </td> */}
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link
                            to={`/category/edit/${category?.category_id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            Chỉnh sửa
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(category?.category_id)}
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

export default AllCategories;
