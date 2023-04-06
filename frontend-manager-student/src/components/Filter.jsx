//! LIBRARY
import React from 'react';

const Filter = () => {
  return (
    <div className="shop__sidebar">
      <div className="shop__sidebar__search">
        <form action="index.php?action=navigate&to=shop&act=search" method="post">
          <input type="text" name="searchKey" placeholder="Search..." />
          <button type="submit">
            <span className="icon_search"></span>
          </button>
        </form>
      </div>
      <div className="shop__sidebar__accordion">
        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-heading">
              <a data-toggle="collapse" data-target="#collapseOne">
                Categories
              </a>
            </div>
            <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
              <div className="card-body">
                <div className="shop__sidebar__categories">
                  <ul className="nice-scroll">
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo (20)</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <a data-toggle="collapse" data-target="#collapseTwo">
                Branding
              </a>
            </div>
            <div id="collapseTwo" className="collapse show" data-parent="#accordionExample">
              <div className="card-body">
                <div className="shop__sidebar__brand">
                  <ul>
                    <li>
                      <a href="#">Sách tham khảo</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo</a>
                    </li>
                    <li>
                      <a href="#">Sách tham khảo</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-heading">
              <a data-toggle="collapse" data-target="#collapseSix">
                Tags
              </a>
            </div>
            <div id="collapseSix" className="collapse show" data-parent="#accordionExample">
              <div className="card-body">
                <div className="shop__sidebar__tags">
                  <a href="#">Sách tham khảo</a>
                  <a href="#">Sách tham khảo</a>
                  <a href="#">Sách tham khảo</a>
                  <a href="#">Sách tham khảo</a>
                  <a href="#">Sách tham khảo</a>
                  <a href="#">Sách tham khảo</a>
                  <a href="#">Sách tham khảo</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
