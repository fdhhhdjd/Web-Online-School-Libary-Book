import CONSTANTS from 'configs/constants';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Edit_Author_Cms_Initial, Get_Detail_Author_Cms_Initial } from 'redux/managers/author_slice/author_thunk';
import AuthorForm from './components/AuthorForm';

const EditAuthor = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detailAuthor = useSelector((state) => state.author.detail_author?.element?.result);
  const [detail, setDetail] = useState(null);
  const [gender, setGender] = useState();
  const [nation, setNation] = useState();
  const [dob, setDob] = useState(null);

  const { result_upload } = useSelector((state) => ({
    ...state.media,
  }));

  const editAuthor = (data) => {
    dispatch(
      Edit_Author_Cms_Initial({
        ...data,
        author_id: id,
        gender: gender || detail?.gender,
        nation: nation || detail?.nation,
        dob: dob ? moment(dob).format('YYYYMMDD') : detail?.dob,
        avatar_uri: result_upload?.result?.url || CONSTANTS.defaultImageAuthor,
        public_id_avatar: result_upload?.result?.public_id || CONSTANTS.defaultImageAuthor,
      }),
    ).then(() => {
      dispatch(Get_Detail_Author_Cms_Initial({ id }));
    });
  };

  useEffect(() => {
    dispatch(Get_Detail_Author_Cms_Initial({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    setDetail(detailAuthor);
  }, [detailAuthor]);

  return (
    <>
      {detail && (
        <AuthorForm
          defaultData={detail}
          onSubmit={editAuthor}
          setGender={setGender}
          setNation={setNation}
          setDob={setDob}
          dob={dob}
          defaultDob={new Date(moment(detail?.dob).format())}
        />
      )}
    </>
  );
};

export default EditAuthor;
