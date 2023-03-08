import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CalenderIcon,
  CharFillIcon,
  ChartIcon,
  ControlIcon,
  FolderIcon,
  logo,
  SearchIcon,
  SettingIcon,
  UserIcon,
} from '../imports/home_import/index';

const Sidebar = (props) => {
  const pathName = useLocation().pathname;
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Dashboard', src: CharFillIcon, route: '/dashboard' },
    { title: 'Accounts', src: UserIcon, route: '/all-user', gap: true },
    { title: 'Book ', src: CalenderIcon, route: '/all-book' },
    { title: 'Search', src: SearchIcon, route: '/search' },
    { title: 'Analytics', src: ChartIcon, route: '/report' },
    { title: 'Files ', src: FolderIcon, gap: true, route: '/files' },
    { title: 'Setting', src: SettingIcon, route: 'settings' },
  ];

  return (
    <div className="flex">
      <div className={` ${open ? 'w-72' : 'w-20 '} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
        <img
          src={ControlIcon}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
          alt=""
        />
        <div className="flex gap-x-4 items-center">
          <img src={logo} className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`} alt="" />
          <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>Designer</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
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
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">{props.content}</h1>
      </div>
    </div>
  );
};
export default Sidebar;
