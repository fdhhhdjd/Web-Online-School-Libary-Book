//!LIBRARY
import { useDispatch } from 'react-redux';

//!REDUX THUNK
import { Upload_Media_Initial } from 'redux/media/upload_remove_media/media_thunk';

//!SHARE
import CONSTANTS from 'configs/constants';
import NOTIFICATION from 'utils/notification';

const useUploadCloud = () => {
  const dispatch = useDispatch();

  const handleUpload = (e) => {
    e.preventDefault();
    try {
      // Check input file
      const file = e.target.files[0];
      if (!file) return NOTIFICATION.notifyError('File not Exists');

      if (file.size > 1024 * 1024)
        // 1mb
        return NOTIFICATION.notifyError('Size too large !');

      //Check type file
      if (file.type !== CONSTANTS.MEDIA_TYPE.JPEG && file.type !== CONSTANTS.MEDIA_TYPE.PNG) {
        // 1mb
        return NOTIFICATION.notifyError('File format is incorrect.');
      }

      // Create Form data save image computer
      let formData = new FormData();
      formData.append(CONSTANTS.MEDIA_TYPE.FILE, file);

      //Action upload
      dispatch(Upload_Media_Initial({ formData }));
    } catch (error) {
      console.log(error);
      NOTIFICATION.notifyError(error.response.data.msg);
    }
  };
  return { handleUpload };
};

export default useUploadCloud;
