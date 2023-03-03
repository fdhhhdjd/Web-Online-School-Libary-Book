import Helmet from 'components/Helmet';
import Section, { SectionBody, SectionTitle } from 'components/Section';
import React from 'react';

const ChangePassword = () => {
  return (
    <Helmet title="Đổi mật khẩu">
      <div className="change-password main">
        <Section>
          <SectionTitle>Thay đổi mật khẩu</SectionTitle>
          <SectionBody>
            <form action="">
              <div className="change-password__form">
                <label htmlFor="old_pass">Nhập mật khẩu cũ: </label>
                <div className="input-group-effect">
                  <div>
                    <input id="old_pass" className="effect-9" type="password" placeholder="Mật khẩu cũ ..." />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>

                <label htmlFor="new_pass">Nhập mật khẩu mới: </label>
                <div className="input-group-effect">
                  <div>
                    <input className="effect-9" type="password" id="new_pass" placeholder="Mật khẩu mới ..." />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>

                <label htmlFor="new_pass_conf">Xác nhận mật khẩu mới: </label>
                <div className="input-group-effect">
                  <div>
                    <input id="new_pass_conf" className="effect-9" type="password" placeholder="Xác nhận mật khẩu" />
                    <span className="focus-border">
                      <i></i>
                    </span>
                  </div>
                </div>

                <button type="submit" className="submit-btn">
                  Đổi mật khẩu
                </button>
              </div>
            </form>
          </SectionBody>
        </Section>
      </div>
    </Helmet>
  );
};

export default ChangePassword;
