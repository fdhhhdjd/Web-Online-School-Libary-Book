import Search from 'components/Search';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Delete_Account_Cms_Initial, Get_All_Account_Cms_Initial } from 'redux/managers/student_slice/student_thunk';
import { accountSearchOption } from 'utils/dummy';
import HELPERS from 'utils/helper';
import NOTIFICATION from 'utils/notification';

const AllUser = () => {
  const dispatch = useDispatch();
  const accountList = useSelector((state) => state.student.all_accounts?.element?.result);
  const [allAccount, setAllAcount] = useState(null);

  const handleDelete = (student_id) => {
    // Delete function
    const deleteBook = () => {
      dispatch(Delete_Account_Cms_Initial({ student_id })).then(() => {
        dispatch(Get_All_Account_Cms_Initial());
      });
    };

    // Confirm box to delete
    NOTIFICATION.swalConfirmDelete('Bạn có muốn xóa tài khoản này', '', 'Đồng ý', deleteBook);
  };

  useEffect(() => {
    dispatch(Get_All_Account_Cms_Initial());
  }, [dispatch]);

  useEffect(() => {
    setAllAcount(accountList);
  }, [accountList]);

  return (
    <div className="container mt-20">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="py-3 pl-2 flex justify-between">
            <Search filterOption={accountSearchOption} setData={setAllAcount} data={accountList} />

            <Link to="/user/add">
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Thêm tài khoản
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
                      Mã số sinh viên
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Tên
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Lớp
                    </th>
                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                      Giới tính
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
                  {allAccount &&
                    allAccount?.map((account, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {account?.user_id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{account?.mssv}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{account?.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{account?.class}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {HELPERS.getGenderLabel(account?.gender)}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link to={`/user/view/${account?.user_id}`} className="text-blue-500 hover:text-blue-700">
                            Truy cập
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <Link to={`/user/edit/${account?.user_id}`} className="text-green-500 hover:text-green-700">
                            Chỉnh sửa
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(account?.user_id)}
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

export default AllUser;
