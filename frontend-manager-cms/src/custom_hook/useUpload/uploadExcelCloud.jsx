//!LIBRARY
import { useDispatch } from 'react-redux';
import { useState } from 'react';

//!REDUX THUNK
import { Destroy_Media_Initial, Upload_Media_Initial } from 'redux/media/upload_remove_media/media_thunk';

//!SHARE
import CONSTANTS from 'configs/constants';
import NOTIFICATION from 'utils/notification';

const useUploadCloud = () => {
  //Store Media
  const dispatch = useDispatch();
  const [uploadCount, setUploadCount] = useState(0);
  const [resultExcel, setResultExcel] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      // Check input file
      const file = e.target.files[0];
      if (!file) return NOTIFICATION.notifyError('File not Exists');

      const fileType = file.name.split('.').pop();

      console.log(fileType === CONSTANTS.EXCEL_TYPE);

      // Check type file
      if (fileType !== CONSTANTS.EXCEL_TYPE) {
        // 1mb
        return NOTIFICATION.notifyError('File format is incorrect.');
      }
      // Create Form data save image computer
      let formData = new FormData();
      formData.append(CONSTANTS.MEDIA_TYPE.FILE, file);
      console.log(resultExcel);
      if (uploadCount > 0 && resultExcel?.public_id) {
        console.log(resultExcel?.public_id, '----', resultExcel.url);
        dispatch(Destroy_Media_Initial({ public_id: resultExcel?.public_id }));
      }

      //Action upload
      dispatch(Upload_Media_Initial({ formData })).then((result) => {
        setResultExcel(result?.payload?.element?.result);
        setUploadCount(uploadCount + 1);
      });
    } catch (error) {
      console.log(error);
      // NOTIFICATION.notifyError(error.response.data.msg);
    }
  };
  return { handleUpload };
};

export default useUploadCloud;
