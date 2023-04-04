import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Get_Detail_Book_Cms_Initial } from 'redux/managers/book_slice/book_thunk';

const EditBook = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailBook = useSelector((state) => state.book.detail_book?.element?.result);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [detail, setDetai] = useState(null);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(profile_student?.data?.image_uri);
      return;
    }

    // get first image
    setSelectedFile(e.target.files[0]);
  };

  console.log('re render');

  useEffect(() => {
    setPreview(detailBook?.image_uri);
  }, [detailBook]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(detailBook?.image_uri);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, detailBook?.image_uri]);

  useEffect(() => {
    dispatch(Get_Detail_Book_Cms_Initial({ book_id: id }));
  }, [dispatch, id]);

  useEffect(() => {
    setDetai(detailBook);
  }, [detailBook]);

  return (
    <form className="w-full mt-10" autoComplete="nope">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="md:w-1/2 w-full">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-id">
                ID
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-id"
                type="text"
                defaultValue={detail?.book_id}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Tên tác giả
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={detail?.name}
                placeholder="Gia Bảo..."
              />
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
                defaultValue={detail?.quantity}
                placeholder="Gia Bảo..."
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Vị trí kệ sách
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={detail?.bookshelf}
                placeholder="Gia Bảo..."
              />
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
                defaultValue={detail?.page_number}
                placeholder="Gia Bảo..."
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                Ngôn ngữ
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="name"
                type="text"
                defaultValue={detail?.language}
                placeholder="Gia Bảo..."
              />
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
                placeholder="Write your thoughts here..."
                defaultValue={detail?.description}
              ></textarea>
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
                  <img src={preview} alt="" />
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
