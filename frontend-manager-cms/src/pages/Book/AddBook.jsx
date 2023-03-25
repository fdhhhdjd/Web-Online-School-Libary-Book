import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

//! CUSTOMER HOOK
import useUploadCloud from 'custom_hook/useUpload/uploadMediaCloud';

const AddBook = () => {
  const dispatch = useDispatch();
  const { handleUpload } = useUploadCloud();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState('https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg');

  const onSelectFile = (e) => {
    console.log('haha');
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(profile_student?.data?.image_uri);
      return;
    }

    // get first image
    setSelectedFile(e.target.files[0]);
    console.log(e);
  };

  const handleCreateBook = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview('https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg');
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(handleCreateBook)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên tác giả
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Gia Bảo..."
                {...register('name', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.name?.type === 'required' ? 'Mời bạn nhập tên sách' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantity">
                Số lượng
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="quantity"
                type="text"
                placeholder="Gia Bảo..."
                {...register('quantity', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.quantity?.type === 'required' ? 'Mời bạn nhập số lượng sách' : ''}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bookshelf">
                Vị trí kệ sách
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="bookshelf"
                type="text"
                placeholder="Gia Bảo..."
                {...register('bookshelf', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.bookshelf?.type === 'required' ? 'Mời bạn nhập vị trí của sách' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="page_number"
              >
                Số trang
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="page_number"
                type="text"
                placeholder="Gia Bảo..."
              // {...register('page_number', {
              //   required: true,
              // })}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="language">
                Ngôn ngữ
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="language"
                type="text"
                placeholder="Gia Bảo..."
                {...register('language', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.language?.type === 'required' ? 'Mời bạn nhập ngôn ngữ sách' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                Tóm tắt sách
              </label>
              <textarea
                id="description"
                rows="4"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tóm tắt sách ..."
                {...register('description', {
                  required: true,
                })}
              ></textarea>
              <div className="mt-1 text-red-700">
                {errors?.description?.type === 'required' ? 'Mời bạn nhập tóm tắt sách' : ''}
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
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">
                  <img src={preview} alt="" />
                </div>
                <input
                  type="file"
                  id="avatar"
                  onChange={onSelectFile}
                  className="hidden"
                  {...register('image', {
                    required: true,
                  })}
                />
                <div className="mt-1 text-red-700">
                  {errors?.image?.type === 'required' ? 'Mời bạn nhập hình ảnh của sách' : ''}
                </div>
                <label htmlFor="avatar">Chọn ảnh</label>
                <div className="profile__info__image__preview__require">
                  Dung lượng file tối đa 1 MB
                  <br />
                  Định dạng: .JPG, .JPEG, .PNG
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddBook;
