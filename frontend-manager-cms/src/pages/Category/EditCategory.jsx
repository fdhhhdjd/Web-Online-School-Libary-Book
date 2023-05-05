import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reset_detail_category } from 'redux/managers/category_slice/category_slice';
import {
  Get_Detail_Category_Cms_Initial,
  Update_Category_Cms_Initial,
} from 'redux/managers/category_slice/category_thunk';

const EditCategory = () => {
  const { id } = useParams();
  // redux
  const dispatch = useDispatch();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleEditCategory = (data) => {
    const { name } = data;

    dispatch(
      Update_Category_Cms_Initial({
        name,
        category_id: id,
      }),
    );
  };

  useEffect(() => {
    dispatch(Get_Detail_Category_Cms_Initial({ id })).then((result) => {
      const data = result?.payload?.element?.result;
      reset({ ...data });
    });

    return () => {
      dispatch(reset_detail_category());
    };
  }, []);

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(handleEditCategory)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên thể loại
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                {...register('name', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.name?.type === 'required' ? 'Mời bạn nhập tên thể loại' : ''}
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
      </div>
    </form>
  );
};

export default EditCategory;
