//! LIBRARY
import axios from 'axios';

const REQUEST = {
  /**
   * @author Nguyễn Tiến Tài
   * @created_at 19/03/2023
   * @descriptionKey setup axios
   * @function get,post
   * @return {Object}
   */

  //!POST
  post: async (url, body, header) => {
    const response = await axios.post(url, body, header);
    return response;
  },

  //! GET
  get: async (url, header) => {
    const response = await axios.get(url, header);
    return response;
  },
};
export default REQUEST;
