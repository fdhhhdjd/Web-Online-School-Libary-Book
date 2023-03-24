//! LIBRARY
import { axiosIns } from 'plugins/axios/axios';

const REQUEST = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 24/03/2023
   * @descriptionKey setup axios
   * @function get,post
   * @return {Object}
   */

  //!POST
  post: async (url, body, header) => {
    const response = await axiosIns.post(url, body, header);
    return response;
  },

  //! GET
  get: async (url, header) => {
    const response = await axiosIns.get(url, header);
    return response;
  },
};
export default REQUEST;
