//! LIBRARY
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

//! DUMMY
import { sideBarMenu } from 'utils/dummy';
import { ControlIcon, logo } from '../imports/home_import/index';
import { useSelector } from 'react-redux';

const Sidebar = (props) => {
  const pathName = useLocation().pathname;
  const [open, setOpen] = useState(true);

  //redux
  const profile = useSelector((state) => state.admin_user.admin_profile?.data);

  console.log(profile, 'profile');

  return (
    <div className="flex">
      <div className={` ${open ? 'w-72' : 'w-20 '} bg-dark-purple p-5 pt-8 sticky top-0 duration-300`}>
        <img
          src={ControlIcon}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={profile?.avatar_uri}
            className={`cursor-pointer w-10 rounded-full duration-500 ${open && 'rotate-[360deg]'}`}
            alt=""
          />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>
            {profile?.name}
          </h1>
        </div>
        <ul className="pt-6">
          {sideBarMenu.map((Menu, index) => (
            <Link to={Menu?.route} key={index}>
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
              ${Menu.gap ? 'mt-9' : 'mt-2'} ${Menu.route === pathName && 'bg-light-white'} `}
              >
                <img src={Menu.src} alt="" />
                <span className={`${!open && 'hidden'} origin-left duration-200`}>{Menu.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 px-16 py-7">
        <h1 className="text-3xl font-semibold ">{props.title}</h1>
        {props.content}
      </div>
    </div>
  );
};
export default Sidebar;
