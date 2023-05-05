//! LIBRARY
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { allLanguageOption } from 'utils/dummy';

//! CUSTOMER HOOK
import Loading from 'components/Loading';
import SelectBox from 'components/SelectBox';
import useUploadCloud from 'custom_hook/useUpload/uploadImageCloud';
import { Get_All_Author_Cms_Initial } from 'redux/managers/author_slice/author_thunk';
import { Create_Book_Cms_Initial } from 'redux/managers/book_slice/book_thunk';
import { Get_All_Category_Cms_Initial } from 'redux/managers/category_slice/category_thunk';
import HELPERS from 'utils/helper';
import { Get_All_Major_Cms_Initial } from 'redux/managers/major_slice/major_thunk';

const AddBook = () => {
  const dispatch = useDispatch();
  const { handleUpload } = useUploadCloud();
  const { result_upload, loading_media } = useSelector((state) => ({
    ...state.media,
  }));
  // ref
  const authorList = useRef([]);
  const categoryList = useRef([]);
  const majorList = useRef([]);

  // state
  const [authorID, setAuthorID] = useState(null);
  const [categories, setCategories] = useState(null);
  const [majorID, setMajorID] = useState(null);
  const [errorSelect, setErrorSelect] = useState({});
  const [language, setLanguage] = useState();
  const [isReset, setIsReset] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSelectFile = (e) => {
    handleUpload(e);
  };

  const handleCreateBook = (data) => {
    const { image, ...result } = data;

    HELPERS.checkRequiredSelect(authorID, 'authorID', setErrorSelect);
    HELPERS.checkRequiredSelect(categories, 'categories', setErrorSelect);
    HELPERS.checkRequiredSelect(language, 'language', setErrorSelect);
    HELPERS.checkRequiredSelect(majorID, 'field', setErrorSelect);

    if (authorID && categories && language) {
      dispatch(
        Create_Book_Cms_Initial({
          ...result,
          language,
          author_id: authorID,
          image_uri: result_upload?.result?.url,
          public_id_image: result_upload?.result?.public_id,
          book_categories_array: JSON.stringify(categories),
          industry_code_id: majorID,
        }),
      ).then(() => {
        reset();
        setIsReset(true);
      });
    }
  };

  useEffect(() => {
    Promise.all([
      dispatch(Get_All_Author_Cms_Initial()).then((result) => {
        const data = result?.payload?.element?.result;
        data?.forEach((item) =>
          authorList.current.push({
            value: item.author_id,
            label: `${item.author_id} ${item.name}`,
          }),
        );
      }),

      dispatch(Get_All_Category_Cms_Initial()).then((result) => {
        const data = result?.payload?.element?.result;
        data?.forEach((item) => {
          categoryList.current.push({
            value: item.category_id,
            label: item.name,
          });
        });
      }),

      dispatch(Get_All_Major_Cms_Initial()).then((result) => {
        const data = result?.payload?.element?.result;
        data?.forEach((item) => {
          majorList.current.push({
            value: item.industry_code_id,
            label: item.name,
          });
        });
      }),
    ]);
  }, []);

  return (
    <form className="w-full mt-10" autoComplete="nope" onSubmit={handleSubmit(handleCreateBook)}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên sách
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
                {...register('page_number', {
                  required: true,
                })}
              />
              <div className="mt-1 text-red-700">
                {errors?.page_number?.type === 'required' ? 'Mời bạn nhập số trang của sách' : ''}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="language">
                Ngôn ngữ
              </label>
              <SelectBox optionData={allLanguageOption} setData={setLanguage} />
              <div className="mt-1 text-red-700">
                {errorSelect?.language?.type === 'required' ? 'Mời bạn chọn ngôn ngữ của sách' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
                Tác giả
              </label>
              <SelectBox optionData={authorList.current} setData={setAuthorID} />
              <div className="mt-1 text-red-700">
                {errorSelect?.authorID?.type === 'required' ? 'Mời bạn chọn tác giả của sách' : ''}
              </div>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
                Ngành
              </label>
              <SelectBox optionData={majorList.current} setData={setMajorID} />
              <div className="mt-1 text-red-700">
                {errorSelect?.field?.type === 'required' ? 'Mời bạn chọn ngành của sách' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="author">
                Thể loại
              </label>
              <SelectBox isMulti={true} optionData={categoryList.current} setData={setCategories} />
              <div className="mt-1 text-red-700">
                {errorSelect?.categories?.type === 'required' ? 'Mời bạn chọn thể loại của sách' : ''}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3">
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
        </div>
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <div className="profile__info__image">
                <div className="profile__info__image__preview">
                  {loading_media ? (
                    <Loading />
                  ) : (
                    <img
                      src={
                        result_upload
                          ? result_upload?.result?.url
                          : 'https://www.boldstrokesbooks.com/assets/bsb/images/book-default-cover.jpg'
                      }
                      alt=""
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  {...register('image', {
                    // required: true,
                    onChange: (e) => onSelectFile(e),
                  })}
                />
                {/* <div className="mt-1 text-red-700">
                  {errors?.image?.type === 'required' ? 'Mời bạn nhập hình ảnh của sách' : ''}
                </div> */}
                <label htmlFor="avatar">Chọn ảnh</label>
                <div className="profile__info__image__preview__require">
                  Dung lượng file tối đa 1 MB
                  <br />
                  Định dạng: .JPG, .JPEG, .PNG
                </div>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6 ml-64 mt-20">
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
      </div>
    </form>
  );
};

export default AddBook;
