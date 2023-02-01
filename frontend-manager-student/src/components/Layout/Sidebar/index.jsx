import { SCHOOL_LOGO } from 'imports/home_import/index';
import { useState } from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [mainTabSelect, setMainTabSelect] = useState(0);
  const sideBarData = [
    {
      display: 'Shop',
      route: '',
      submenu: [
        {
          name: 'Home Page',
          route: '/',
        },
        {
          name: 'Category Page',
          route: '/category',
        },
        {
          name: 'Book Page',
          route: '',
        },
        {
          name: 'Book PDF',
          route: '',
        },
      ],
    },
    {
      display: 'Home',
      route: '',
      submenu: [
        {
          name: 'Home Page',
          route: '',
        },
        {
          name: 'Category Page',
          route: '',
        },
        {
          name: 'Book Page',
          route: '',
        },
        {
          name: 'Book PDF',
          route: '',
        },
      ],
    },
    {
      display: 'Shop',
      route: '',
      submenu: [
        {
          name: 'Home Page',
          route: '',
        },
        {
          name: 'Category Page',
          route: '',
        },
        {
          name: 'Book Page',
          route: '',
        },
        {
          name: 'Book PDF',
          route: '',
        },
      ],
    },
    {
      display: 'Shop',
      route: '',
      submenu: [
        {
          name: 'Home Page',
          route: '',
        },
        {
          name: 'Category Page',
          route: '',
        },
        {
          name: 'Book Page',
          route: '',
        },
        {
          name: 'Book PDF',
          route: '',
        },
      ],
    },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-logo d-flex justify-content-between">
        <a href="itc.edu.vn" className="header-logo">
          <img src={SCHOOL_LOGO} alt="" className="img-fluid rounded-normal" />
          <div className="header-logo-title">
            <span className="text-primary text-uppercase">itc bookstore</span>
          </div>
        </a>

        <div className="menu-bt-sidebar">
          <div className="menu-bt align-self-center">
            <div className="wrapper-menu">
              <div className="main-circle">
                <i className="fal fa-bars"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-scrollbar" style={{ overflow: 'hidden', outline: 'none' }}>
        <div className="scroll-content" style={{ transform: 'translate3d(0px, 0px, 0px)' }}>
          <nav className="sidebar-menu">
            <ul className="iq-menu" id="sidebar-toggle">
              {sideBarData.map((item, index) => (
                <li
                  key={index}
                  className={`active-menu ${mainTabSelect === index ? 'active' : ''}`}
                  onClick={(e) => setMainTabSelect(index)}
                >
                  <a
                    href="itc.edu.vn"
                    data-target={`#submenu-${index}`}
                    className="waves-effect collapsed"
                    data-toggle="collapse"
                    aria-expanded="false"
                  >
                    <span
                      className="ripple rippleEffect"
                      style={{ width: 260, height: 260, top: -99.8, left: 146 }}
                    ></span>
                    <i className="fal fa-home"></i>
                    <span>{item.display}</span>
                    <i className="fas fa-chevron-right arrow-right"></i>
                  </a>
                  <ul id={`submenu-${index}`} className="iq-submenu collapse" data-parent="#sidebar-toggle">
                    {item?.submenu.map((item, idx) => (
                      <li key={idx} className="active">
                        <Link to={item.route}>
                          <i className="fal fa-home"></i>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
