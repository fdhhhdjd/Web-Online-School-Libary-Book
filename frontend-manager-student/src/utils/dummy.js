/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/03/2023
 * @descriptionKey Nav Info
 */
export const navInfo = [
  {
    displayText: 'Giới thiệu',
    path: '/',
  },
  {
    displayText: 'Tra cứu',
    path: '/book/all',
    submenu: [
      {
        displayText: 'Thể loại',
        path: '/category',
      },
      {
        displayText: 'Tất cả tài liệu',
        path: '/book/all',
      },
    ],
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

export const userSubNav = [
  {
    path: '/user/profile',
    displayText: 'Thông tin tài khoản',
  },

  {
    path: '/user/changePassword',
    displayText: 'Thay đổi mật khẩu',
  },
];

export const profileSidebar = [
  {
    path: '/user/profile',
    displayText: 'Tài khoản của tôi',
    icon: 'bx bx-user',
  },

  {
    path: '/user/borrow',
    displayText: 'Thông tin sách mượn',
    icon: 'bx bx-book-open',
  },
];

export const tabBorrowBook = [
  {
    path: '/book/borrow',
    displayText: 'Tất cả',
  },
  {
    path: '/book/borrow',
    displayText: 'Chờ xác nhận',
  },
  {
    path: '/book/borrow',
    displayText: 'Đang mượn',
  },
  {
    path: '/book/borrow',
    displayText: 'Đã trả',
  },
];

export const mockDataEvents = [
  {
    date: '27-01-2023',
    name: 'Nghệ thuật & nhiếp ảnh',
    thumbnail: 'https://itc.edu.vn/Data/Sites/1/News/4114/thuvienitc-web.png',
    desc: 'Sáng nay ngày 17/02/2023, tại Thư viện ITC (Lầu 5 dãy B) đã diễn ra buổi Khai mạc cuộc thi "Viết phần mềm quản lý thư viện ITC" do Khoa Công nghệ thông tin - Điện tử tổ chức.',
  },
  {
    date: '27-01-2023',
    name: 'Nghệ thuật & nhiếp ảnh',
    thumbnail: 'https://itc.edu.vn/Data/Sites/1/News/4114/thuvienitc-web.png',
    desc: 'Sáng nay ngày 17/02/2023, tại Thư viện ITC (Lầu 5 dãy B) đã diễn ra buổi Khai mạc cuộc thi "Viết phần mềm quản lý thư viện ITC" do Khoa Công nghệ thông tin - Điện tử tổ chức.',
  },
  {
    date: '27-01-2023',
    name: 'Nghệ thuật & nhiếp ảnh',
    thumbnail: 'https://itc.edu.vn/Data/Sites/1/News/4101/20209252146107tb-20220721055929-e.png',
    desc: 'Sáng nay ngày 17/02/2023, tại Thư viện ITC (Lầu 5 dãy B) đã diễn ra buổi Khai mạc cuộc thi "Viết phần mềm quản lý thư viện ITC" do Khoa Công nghệ thông tin - Điện tử tổ chức.',
  },
];
