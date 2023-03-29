//! LIBRARY
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

//! COMPONENTS
import UserForm from './components/UserForm';

//! DUMMY DATA
import { Create_Account_Cms_Initial } from 'redux/managers/student_slice/student_thunk';

const AddUser = () => {
  const dispatch = useDispatch();

  // state
  const [gender, setGender] = useState();
  const [classroom, setClassroom] = useState();
  const [dob, setDob] = useState(new Date());

  // create book
  const handleCreate = (data) => {
    dispatch(
      Create_Account_Cms_Initial({
        ...data,
        gender,
        class_room: classroom,
        dob: moment(dob).format('YYYYMMDD'),
      }),
    ).then(() => {
      reset();
    });
  };

  // react hook form
  const { reset } = useForm();

  return (
    <>
      <UserForm onSubmit={handleCreate} setGender={setGender} setDob={setDob} dob={dob} setClassroom={setClassroom} />
    </>
  );
};

export default AddUser;
