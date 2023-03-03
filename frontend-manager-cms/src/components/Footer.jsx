import React from 'react';
import { FB_LOGO, SCHOOL_LOGO, YTB_LOGO, ZL_LOGO } from '../imports/home_import/index';
import { Link } from 'react-router-dom';
import Grid from './Grid';

const Footer = () => {
  const footerAboutLinks = [
    {
      display: 'Giới thiệu',
      path: '/about',
    },
    {
      display: 'Liên hệ',
      path: '/about',
    },
    {
      display: 'Tuyển dụng',
      path: '/about',
    },
    {
      display: 'Tin tức',
      path: '/about',
    },
    {
      display: 'Hệ thống cửa hàng',
      path: '/about',
    },
  ];

  const footerCustomerLinks = [
    {
      display: 'Chính sách đổi trả',
      path: '/about',
    },
    {
      display: 'Chính sách bảo hành',
      path: '/about',
    },
    {
      display: 'Chính sách hoàn tiền',
      path: '/about',
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <Grid col={3} mdCol={1} smCol={1} gap={100}>
          <div>
            <div className="footer__title">Thông tin hỗ trợ</div>
            <div className="footer__content">
              <div className="footer__content__item">
                <i className="bx bx-location-plus"></i>
                <div>
                  <span>Địa chỉ</span>
                  <span>12 Trịnh Đình Thảo, phường Hòa Thạnh, quận Tân Phú, Thành phố Hồ Chí Minh</span>
                </div>
              </div>
              <div className="footer__content__item">
                <i className="bx bx-phone-call"></i>
                <div>
                  <span>Số điện thoại</span> <span>0339253073</span>
                </div>
              </div>
              <div className="footer__content__item">
                <i className="bx bx-mail-send"></i>
                <div>
                  <span>Email</span> <span>giabao712411@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__about">
            <div className="footer__logo">
              <Link to="/">
                <img src={SCHOOL_LOGO} alt="" />
              </Link>
            </div>
            <p>
              TRƯỜNG CAO ĐẲNG <br />
              CÔNG NGHỆ THÔNG TIN TP. HỒ CHÍ MINH
            </p>
            <div className="footer__icon">
              <Link to="https://www.facebook.com/itcportal247">
                <img src={FB_LOGO} alt="" />
              </Link>
              <Link to="https://www.youtube.com/channel/UCFqKot6Cj2-ztGXIeDsatJA">
                <img src={YTB_LOGO} alt="" />
              </Link>
              <Link to="https://zalo.me/0938861080">
                <img src={ZL_LOGO} alt="" />
              </Link>
            </div>
          </div>

          <div>
            <div className="footer__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4775762798427!2d106.63214551471836!3d10.774687292322698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ea144839ef1%3A0x798819bdcd0522b0!2zVHLGsOG7nW5nIENhbyDEkOG6s25nIEPDtG5nIE5naOG7hyBUaMO0bmcgVGluIFRwLkjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1677487200014!5m2!1svi!2s"
                width="400"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
