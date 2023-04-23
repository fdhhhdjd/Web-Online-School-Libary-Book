//! LIBRARY
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//! COMPONENTS
import Loading from 'components/Loading';
import SelectBox from 'components/SelectBox';
import { nationOption } from 'utils/dummy';

//! REDUX
import useUploadCloud from 'custom_hook/useUpload/uploadImageCloud';
import { Get_All_Author_Cms_Initial } from 'redux/managers/author_slice/author_thunk';
import { reset_detail_book } from 'redux/managers/book_slice/book_slice';
import { Edit_Book_Cms_Initial, Get_Detail_Book_Cms_Initial } from 'redux/managers/book_slice/book_thunk';

const EditBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);
  const [language, setLanguage] = useState(null);

  const authorList = useRef([]);
  const [authorID, setAuthorID] = useState(null);

  const { handleUpload } = useUploadCloud();

  // redux
  const { result_upload, loading_media } = useSelector((state) => ({
    ...state.media,
  }));

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSelectFile = (e) => {
    handleUpload(e);
  };

  const handleEditBook = (data) => {
    const { name, quantity, bookshelf, page_number, description } = data;

    dispatch(
      Edit_Book_Cms_Initial({
        book_id: id,
        name,
        quantity: quantity.toString(),
        bookshelf,
        page_number: page_number.toString(),
        description,
        author_id: authorID || detailBook?.author_id,
        language: language || detailBook?.language,
        image_uri: result_upload?.result?.url || detailBook?.image_uri,
        public_id_image: result_upload?.result?.public_id || detailBook?.public_id_image,
      }),
    );
  };

  useEffect(() => {
    dispatch(Get_Detail_Book_Cms_Initial({ book_id: id })).then((result) => {
      const data = result?.payload?.element?.result;
      reset({ ...data });
    });

    return () => {
      dispatch(reset_detail_book());
    };
  }, []);

  useEffect(() => {
    dispatch(Get_All_Author_Cms_Initial()).then((result) => {
      const data = result?.payload?.element?.result;
      data?.forEach((item) =>
        authorList.current.push({
          value: item.author_id,
          label: `${item.author_id} ${item.name}`,
        }),
      );
    });
  }, []);

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(handleEditBook)}>
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
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Số lượng
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
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
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Vị trí kệ sách
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
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
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Số trang
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                placeholder="Gia Bảo..."
                {...register('page_number', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.page_number?.type === 'required' ? 'Mời bạn nhập số trang của sách' : ''}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Ngôn ngữ
              </label>

              {detailBook?.language && (
                <SelectBox
                  optionData={nationOption}
                  defaultValue={{
                    value: detailBook?.language,
                    label: detailBook?.language,
                  }}
                  setData={setLanguage}
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
                Tác giả
              </label>
              {detailBook?.author_id && (
                <SelectBox
                  defaultValue={{
                    value: detailBook?.author_id,
                    label: detailBook?.author_id,
                  }}
                  optionData={authorList.current}
                  setData={setAuthorID}
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tóm tắt sách
              </label>
              <textarea
                id="message"
                rows="4"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Tóm tắt sách"
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
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">
                  {loading_media ? (
                    <Loading />
                  ) : (
                    <img src={result_upload?.result?.url || detailBook?.image_uri} alt="" />
                  )}
                </div>
                <input type="file" id="avatar" onChange={onSelectFile} className="hidden" />
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

export default EditBook;
