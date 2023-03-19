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
                      <a href="#">Men (20)</a>
                    </li>
                    <li>
                      <a href="#">Women (20)</a>
                    </li>
                    <li>
                      <a href="#">Bags (20)</a>
                    </li>
                    <li>
                      <a href="#">Clothing (20)</a>
                    </li>
                    <li>
                      <a href="#">Shoes (20)</a>
                    </li>
                    <li>
                      <a href="#">Accessories (20)</a>
                    </li>
                    <li>
                      <a href="#">Kids (20)</a>
                    </li>
                    <li>
                      <a href="#">Kids (20)</a>
                    </li>
                    <li>
                      <a href="#">Kids (20)</a>
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
                      <a href="#">Louis Vuitton</a>
                    </li>
                    <li>
                      <a href="#">Chanel</a>
                    </li>
                    <li>
                      <a href="#">Hermes</a>
                    </li>
                    <li>
                      <a href="#">Gucci</a>
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
                  <a href="#">Product</a>
                  <a href="#">Bags</a>
                  <a href="#">Shoes</a>
                  <a href="#">Fashio</a>
                  <a href="#">Clothing</a>
                  <a href="#">Hats</a>
                  <a href="#">Accessories</a>
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
