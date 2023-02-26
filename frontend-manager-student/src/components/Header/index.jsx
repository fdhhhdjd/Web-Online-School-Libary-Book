import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SCHOOL_LOGO } from '../../imports/home_import/index';

const navInfo = [
  {
    displayText: 'Giới thiệu',
    path: '/',
  },
  {
    displayText: 'Sản phẩm',
    path: '/catalogue',
  },
  {
    displayText: 'Phụ kiện',
    path: '/accessories',
  },
  {
    displayText: 'Liên hệ',
    path: '/contact',
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const menuLeftRef = useRef(null);
  const activeNavIdx = navInfo.findIndex((e) => e.path === pathname);

  const menuToggle = () => {
    menuLeftRef.current.classList.toggle('active');
  };

  return (
    <>
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
                  <Link to={item.path}>
                    <span>{item.displayText}</span>
                  </Link>
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
                <Link to={`/user/account/profile/test`}>
                  <img
                    src="https://res.cloudinary.com/dfupi3m0b/image/upload/v1669712298/ca-nhan/avatar_cvkuph.jpg"
                    alt=""
                  />
                </Link>

                {/* <Link to="/login">
                <button className="login-btn">Đăng nhập</button>
              </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
