import Loading from 'components/Loading/Loading';
import { NotFound } from 'imports/notfound_import/index';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RouteDataMain from 'routers/index';
import './App.css';

var function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<Loading />}>
        <ToastContainer position="top-center" />
        <Routes>
          {RouteDataMain.map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item.private === null ? (
                  <Route path={`/${item.path}`} element={item.main} />
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
