//! LIBRARY
import React, { Fragment, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

//! SHARE
import { navInfo } from 'utils/dummy';

//! IMPORT
import { SCHOOL_LOGO } from '../imports/home_import/index';

//! COMPONENTS
import Button from './Button';

const Header = (props) => {
  // Take profile account store
  const { profile_student } = useSelector((state) => ({
    ...state.auth_student,
  }));

  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const menuLeftRef = useRef(null);
  const activeNavIdx = navInfo.findIndex((e) => e.path === pathname);
  // const tokenLocal = JSON.parse(localStorage.getItem('auth-token'));

  // useEffect(() => {
  //   if (tokenLocal) {
  //     setToken(tokenLocal);
  //     props.setShowLogin(false);
  //     console.log('hello');
  //   }
  // }, [tokenLocal]);

  const menuToggle = () => {
    menuLeftRef.current.classList.toggle('active');
  };

  return (
    <Fragment>
      <div className="header" ref={headerRef}>
        <div className="container">
          <div className="header__logo">
            <Link to="/">
              <img src={SCHOOL_LOGO} alt="logo" />
            </Link>
          </div>
          <div className="header__menu">
            <div className="header__menu__mobile-toggle" onClick={menuToggle}>
              <i className="bx bx-menu-alt-left"></i>
            </div>
            <div className="header__menu__left" ref={menuLeftRef}>
              <div className="header__menu__left__close" onClick={menuToggle}>
                <i className="bx bx-chevron-left"></i>
              </div>
              {navInfo.map((item, index) => (
                <div
                  key={index}
                  className={`header__menu__item
                  header__menu__left__item ${index === activeNavIdx ? 'active' : ''}`}
                  onClick={menuToggle}
                >
                  {item?.submenu?.length > 0 ? (
                    <>
                      <Link to={item.path}>
                        <span>{item.displayText}</span>
                        <i className="bx bx-chevron-down"></i>
                      </Link>
                      <div className="header__submenu">
                        {item.submenu.map((subItem, idx) => (
                          <div className="header__submenu__item" key={idx}>
                            <Link to={subItem.path}>
                              <span>{subItem.displayText}</span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link to={item.path}>
                      <span>{item.displayText}</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="header__menu__right">
              <div className="hotline-wrap">
                <a href="tel:0938861080">
                  <i className="bx bxs-phone"></i>
                  <span>
                    Hotline / ZALO:<strong> 093 886 1080</strong>
                  </span>
                </a>
              </div>
              <div className="header__menu__item header__menu__right__item">
                <i className="bx bx-search"></i>
              </div>
              <div className="header__menu__item header__menu__right__item">
                <Link to="/cart">
                  <i className="bx bx-shopping-bag" style={{ fontSize: 20 }}></i>
                </Link>
              </div>
              <div className="header__menu__item header__menu__right__item">
                {/* {token ? (
                  <>
                    {props.setShowLogin(false)}
                    <img
                      src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                      alt=""
                    />
                    <div className="header__submenu header__submenu__user">
                      {userSubNav &&
                        userSubNav.map((item, idx) => (
                          <div className="header__submenu__item" key={idx}>
                            <Link to={item.path}>
                              <span className="header__submenu__text">{item.displayText}</span>
                            </Link>
                          </div>
                        ))}
                      <div className="header__submenu__item">
                        <span className="header__submenu__text" style={{ cursor: 'pointer' }}>
                          Đăng xuất
                        </span>
                      </div>
                    </div>
                  </> */}
                {profile_student ? (
                  <Link to={`/user/account/profile/test`}>
                    <img
                      src={profile_student?.data?.avatar_uri}
                      alt={profile_student?.data?.avatar_uri}
                      title={`${profile_student?.data?.name}`}
                    />
                  </Link>
                ) : (
                  <div className="loginBtn" onClick={(e) => props.setShowLogin(true)}>
                    <Button size="sm" color="rgb(9 30 75/1)">
                      Đăng nhập
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
