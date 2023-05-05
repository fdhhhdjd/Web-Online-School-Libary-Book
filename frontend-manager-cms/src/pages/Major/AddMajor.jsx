//! LIBRARY
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

//! THUNK
import { Create_Major_Cms_Initial } from 'redux/managers/major_slice/major_thunk';

const AddMajor = () => {
  // redux
  const dispatch = useDispatch();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddMajor = async (data) => {
    const { name } = data;

    dispatch(
      Create_Major_Cms_Initial({
        name,
      }),
    ).then(() => {
      reset();
    });
  };

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(handleAddMajor)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên ngành
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
                {errors?.name?.type === 'required' ? 'Mời bạn nhập tên ngành' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <button
                type="submit"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-6 border border-blue-500 hover:border-transparent rounded float-right"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddMajor;
