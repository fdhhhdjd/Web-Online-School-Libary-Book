import React from 'react';
import './style.scss';
const CategoryPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div className="iq-card-transparent mb-0">
            <div className="d-block text-center">
              <h2 className="mb-3">Search by Book Name</h2>
              <div className="w-100 iq-search-filter">
                <ul className="list-inline p-0 m-0 row justify-content-center search-menu-options">
                  <li className="search-menu-opt">
                    <div className="iq-dropdown">
                      <div className="form-group mb-0">
                        <select
                          name=""
                          id="exampleFormControlSelect1"
                          className="form-control form-search-control bg-white border-0"
                        >
                          <option value="all" selected>
                            All
                          </option>
                          <option value="">Book</option>
                          <option value="">Book</option>
                          <option value="">Book</option>
                          <option value="">Book</option>
                          <option value="">Book</option>
                        </select>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
