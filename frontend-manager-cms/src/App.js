//!LIBRARY
import React, { Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

//! SHARE
import CONSTANTS from 'configs/constants';
import { clearToken, setToken } from 'utils/auth';
import HELPERS from 'utils/helper';

//! COMPONENT
import Loading from 'components/Loading';

//! API
import API_ADMIN from 'api/api_admin';

//! PLUGIN
import { axiosIns } from 'plugins/axios/axios';

//! ROUTES
import RouteDataMain from 'routers/index';

//! IMPORT
import { NotFound } from 'imports/notfound_import/index';

//! CUSTOM HOOK
import Navigate from 'custom_hook/useNavigate/Navigate';
import { useDispatch } from 'react-redux';
import { Renew_Token_Cms_Initial } from 'redux/managers/authentication_slice/auth_thunk';
import { useEffect } from 'react';

function App() {
  // Navigate
  const { navigateChangePage } = Navigate();

  //InitialState action
  const dispatch = useDispatch();

  // isRefreshing
  const [isRefreshing, setIsRefreshing] = useState(false);

  axiosIns.interceptors.response.use(
    (response) => response,
    async (err) => {
      const originalConfig = err?.config;
      if (
        originalConfig &&
        originalConfig?.url !== API_ADMIN.LOGIN_ADMIN_CMS &&
        err.response &&
        err.response?.status === CONSTANTS.STATUS._UNAUTHORIZED &&
        !originalConfig._retry &&
        !isRefreshing
      ) {
        originalConfig._retry = CONSTANTS.DELETED_ENABLE;
        originalConfig.headers = { ...originalConfig.headers };

        setIsRefreshing(true);

        try {
          const response = await axios.get(`${API_ADMIN.RENEW_TOKEN_CMS}`, {
            headers: HELPERS.headerBrowser(),
            withCredentials: CONSTANTS.DELETED_ENABLE,
          });
          // Save LocalStorage
          setToken(CONSTANTS.AUTH_TOKEN, response?.data?.element?.result?.access_token);

          setIsRefreshing(false);

          return axiosIns(originalConfig);
        } catch (_error) {
          clearToken(CONSTANTS.AUTH_TOKEN);

          navigateChangePage('/login');

          return Promise.reject(_error);
        }
      }
      return Promise.reject(err);
    },
  );
  return (
    <React.Fragment>
      <Suspense Suspense fallback={<Loading />}>
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
