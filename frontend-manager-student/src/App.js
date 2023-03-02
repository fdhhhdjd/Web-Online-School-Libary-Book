//!LIBRARY
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

//! COMPONENT
import Loading from 'components/Loading';

//! PAGE

//! ROUTES
import RouteDataMain from 'routers/index';

//! IMPORT
import { NotFound } from 'imports/notfound_import/index';

function App() {
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
