//!LIBRARY
import { useDispatch } from 'react-redux';

//!REDUX THUNK
import { Destroy_Media_Initial, Upload_Media_Initial } from 'redux/media/upload_remove_media/media_thunk';

//!SHARE
import CONSTANTS from 'configs/constants';
import { useState } from 'react';
import NOTIFICATION from 'utils/notification';

const useUploadCloud = () => {
  //Store Media
  const dispatch = useDispatch();
  const [uploadCount, setUploadCount] = useState(0);
  const [resultImage, setResultImage] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      // Check input file
      const file = e.target.files[0];
      if (!file) return NOTIFICATION.notifyError('File not Exists');

      //Check type file
      if (file.type !== CONSTANTS.MEDIA_TYPE.JPEG && file.type !== CONSTANTS.MEDIA_TYPE.PNG) {
        // 1mb
        return NOTIFICATION.notifyError('File format is incorrect.');
      }
      // Create Form data save image computer
      let formData = new FormData();
      formData.append(CONSTANTS.MEDIA_TYPE.FILE, file);
      console.log(resultImage);
      if (uploadCount > 0 && resultImage?.public_id) {
        console.log(resultImage?.public_id, '----', resultImage.url);
        dispatch(Destroy_Media_Initial({ public_id: resultImage?.public_id }));
      }

      //Action upload
      dispatch(Upload_Media_Initial({ formData })).then((result) => {
        setResultImage(result?.payload?.element?.result);
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
