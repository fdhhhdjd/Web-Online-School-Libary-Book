//!LIBRARY
import axios from 'axios';
import React, { Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//! COMPONENT
import Loading from 'components/Loading';

//! SHARE
import CONSTANTS from 'configs/constants';
import { clearToken, setToken } from 'utils/auth';
import HELPERS from 'utils/helper';

//! API
import API_STUDENT from 'api/api_user';

//! ROUTES
import RouteDataMain from 'routers/index';

//! IMPORT
import { NotFound } from 'imports/notfound_import/index';

//! PLUGIN
import { axiosIns } from 'plugins/axios/axios';

//! CUSTOMS
import Navigate from 'custom_hook/useNavigate/Navigate';

function App() {
  // Navigate
  const { navigateChangePage } = Navigate();

  // isRefreshing
  const [isRefreshing, setIsRefreshing] = useState(false);

  axiosIns.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalConfig = err?.config;
      if (
        originalConfig &&
        originalConfig?.url !== API_STUDENT.LOGIN_STUDENT &&
        err.response &&
        err.response?.status === CONSTANTS.STATUS._UNAUTHORIZED &&
        !originalConfig._retry &&
        !isRefreshing
      ) {
        originalConfig._retry = CONSTANTS.DELETED_ENABLE;
        originalConfig.headers = { ...originalConfig.headers };

        setIsRefreshing(true);

        try {
          const response = await axios.get(`${API_STUDENT.RE_NEW_TOKEN_STUDENT}`, {
            headers: HELPERS.headerBrowser(),
            withCredentials: CONSTANTS.DELETED_ENABLE,
          });
          // Save LocalStorage
          setToken(CONSTANTS.AUTH_TOKEN, response?.data?.element?.result?.access_token);

          setIsRefreshing(false);

          return axiosIns(originalConfig);
        } catch (_error) {
          clearToken(CONSTANTS.AUTH_TOKEN);

          navigateChangePage('/');

          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    },
  );

  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <ToastContainer />
        <Routes>
          {RouteDataMain.map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item.private === null ? (
                  <Route path={`/${item.path}`} element={item.main} replace />
                ) : (
                  <Route element={item.private}>
                    <Route path={`/${item.path}`} element={item.main} />
                  </Route>
                )}
              </React.Fragment>
            );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
