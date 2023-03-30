//! COMPONENTS

//! LIBRARY
import CONSTANTS from 'configs/constants';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

//! REDUX THUNK
import { Create_Author_Cms_Initial } from 'redux/managers/author_slice/author_thunk';

//! DUMMY DATA
import AuthorForm from './components/AuthorForm';

const AddAuthor = () => {
  // react hook form
  const { reset } = useForm();

  // redux
  const dispatch = useDispatch();
  const { result_upload } = useSelector((state) => ({
    ...state.media,
  }));

  // state
  const [gender, setGender] = useState();
  const [nation, setNation] = useState();
  const [isReset, setIsReset] = useState(false);
  const [dob, setDob] = useState(new Date());

  const createAuthor = (data) => {
    dispatch(
      Create_Author_Cms_Initial({
        ...data,
        gender,
        nation,
        dob: moment(dob).format('YYYYMMDD'),
        avatar_uri: result_upload?.result?.url || CONSTANTS.defaultImageAuthor,
        public_id_avatar: result_upload?.result?.public_id || CONSTANTS.defaultImageAuthor,
      }),
    ).then(() => {
      reset();
      setIsReset(true);
    });
  };

  return (
    <>
      <AuthorForm onSubmit={createAuthor} setGender={setGender} setNation={setNation} setDob={setDob} dob={dob} />
    </>
  );
};

export default AddAuthor;
