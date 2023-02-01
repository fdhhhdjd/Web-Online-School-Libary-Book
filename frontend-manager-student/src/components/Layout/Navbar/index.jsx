import React, { useState } from 'react';
import './style.scss';
import { SCHOOL_LOGO } from 'imports/home_import/index';

const NavBar = ({ setShowLogin }) => {
  const [showTab, setShowTab] = useState(null);

  const selectTab = (e, idx) => {
    e.preventDefault();
    if (showTab === idx) {
      setShowTab(null);
    } else {
      setShowTab(idx);
    }
  };

  return (
    <div className="top-navbar">
      <div className="iq-navbar-custom">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <div className="iq-menu-bt d-flex align-items-center">
            <div className="wrapper-menu">
              <div className="main-circle">
                <i className="fal fa-bars"></i>
              </div>
            </div>
            <div className="navbar-logo d-flex justify-content-between">
              <a href="itc.edu.vn" className="header-logo">
                <img src={SCHOOL_LOGO} alt="" className="img-fluid rounded-normal" />
                <div className="header-logo-title">
                  <span className="text-primary text-uppercase">itc bookstore</span>
                </div>
              </a>
            </div>
          </div>
          <div className="top-navbar-breadcrumb">
            <h5 className="mb-0">Home</h5>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="itc.edu.vn">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Homepage
                </li>
              </ul>
            </nav>
          </div>

          <div className="search-bar">
            <form action="" className="searchbox">
              <input type="text" className="text search-input" placeholder="Search Here..." />
              <a href="itc.edu.vn" className="search-link">
                <i className="fal fa-search"></i>
              </a>
            </form>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-label="Toggle navigation"
          >
            <i className="fal fa-bars"></i>
          </button>

          <div className="navbar-collapse collapse show" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto navbar-list">
              <li className="nav-item nav-icon search-content">
                <a href="giabao" className="search-toggle waves-effect text-gray rounded">
                  <span
                    className="ripple rippleEffect"
                    style={{ width: 35, height: 35, top: 3, left: -2.65002 }}
                  ></span>
                  <i className="fal fa-search"></i>
                </a>
                <form action="#" className="search-box p-0">
                  <input type="text" className="text search-input" placeholder="Type here to search..." />
                  <a href="itc.edu.vn" className="search-link">
                    <i className="fal fa-search"></i>
                  </a>
                </form>
              </li>
              <li className={`nav-item nav-icon ${showTab === 1 ? 'iq-show' : ''}`} onClick={(e) => selectTab(e, 1)}>
                <a href="itc.edu.vn" className="search-toggle waves-effect text-gray rounded">
                  <span
                    className="ripple rippleEffect"
                    style={{ width: 35, height: 35, top: -3, left: 0.349976 }}
                  ></span>
                  <i className="far fa-bell"></i>
                  <span className="bg-primary dots"></span>
                </a>
                <div className="iq-sub-dropdown">
                  <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0">
                      <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white">
                          All Notifications
                          <small className="badge badge-light float-right pt-1">4</small>
                        </h5>
                      </div>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li className={`nav-item nav-icon ${showTab === 2 ? 'iq-show' : ''}`} onClick={(e) => selectTab(e, 2)}>
                <a href="itc.edu.vn" className="search-toggle waves-effect text-gray rounded">
                  <span
                    className="ripple rippleEffect"
                    style={{ width: 35, height: 35, top: -3, left: 0.349976 }}
                  ></span>
                  <i class="far fa-envelope"></i>
                  <span className="bg-primary dots"></span>
                </a>
                <div className="iq-sub-dropdown">
                  <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0">
                      <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white">
                          All Messages
                          <small className="badge badge-light float-right pt-1">4</small>
                        </h5>
                      </div>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              <li className={`nav-item nav-icon ${showTab === 3 ? 'iq-show' : ''}`} onClick={(e) => selectTab(e, 3)}>
                <a href="itc.edu.vn" className="search-toggle waves-effect text-gray rounded">
                  <span
                    className="ripple rippleEffect"
                    style={{ width: 35, height: 35, top: -3, left: 0.349976 }}
                  ></span>
                  <i class="fal fa-shopping-cart"></i>
                  <span className="bg-primary dots"></span>
                </a>
                <div className="iq-sub-dropdown">
                  <div className="iq-card shadow-none m-0">
                    <div className="iq-card-body p-0">
                      <div className="bg-primary p-3">
                        <h5 className="mb-0 text-white">
                          All Carts
                          <small className="badge badge-light float-right pt-1">4</small>
                        </h5>
                      </div>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                      <a href="haha" className="iq-sub-card">
                        <div className="media align-items-center">
                          <div>
                            <img
                              src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                              alt=""
                              className="avatar-40 rounded"
                            />
                          </div>

                          <div className="media-body ml-3">
                            <h6 className="mb-0">Chau Gia Bao</h6>
                            <small className="float-right font-size-12">Just now</small>
                            <p className="mb-0">hello</p>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>

              {/* <li className={`line-height pt-3 ${showTab === 4 ? 'iq-show' : ''}`} onClick={(e) => selectTab(e, 4)}>
              <a href="vn" className="search-toggle iq-waves-effect d-flex align-items-center">
                <img
                  src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                  alt="user"
                  className="img-fluid rounded-circle mr-3"
                />
                <div className="caption">
                  <div className="mb-1 line-height">Gia Bao</div>
                </div>
              </a>

              <div className="iq-sub-dropdown iq-user-dropdown">
                <div className="iq-card shadow-none m-0">
                  <div className="iq-card-body p-0">
                    <div className="bg-primary p-4">
                      <h5 class="mb-0 text-white line-height">Hello Gia Bao</h5>
                      <span class="text-white font-size-12">Available</span>
                    </div>
                    <a href="profile.html" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="far fa-user-circle text-primary"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">My Profile</h6>
                          <p class="mb-0 font-size-12">View personal profile details.</p>
                        </div>
                      </div>
                    </a>

                    <a href="profile.html" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="far fa-user-circle"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">My Profile</h6>
                          <p class="mb-0 font-size-12">View personal profile details.</p>
                        </div>
                      </div>
                    </a>

                    <a href="profile.html" class="iq-sub-card iq-bg-primary-hover">
                      <div class="media align-items-center">
                        <div class="rounded iq-card-icon iq-bg-primary">
                          <i class="far fa-user-circle"></i>
                        </div>
                        <div class="media-body ml-3">
                          <h6 class="mb-0 ">My Profile</h6>
                          <p class="mb-0 font-size-12">View personal profile details.</p>
                        </div>
                      </div>
                    </a>

                    <div className="d-inline-block w-100 text-center p-3 pb-4">
                      <a href="logout" className="bg-primary iq-sign-btn p-3" role="button">
                        Sign out
                        <i class="fas fa-sign-out ml-3"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li> */}
              <li className="line-height ml-4" onClick={(e) => selectTab(e, 5)}>
                <button className="btn btn-primary sign-in-btn px-4" onClick={(e) => setShowLogin(true)}>
                  Đăng nhập
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
