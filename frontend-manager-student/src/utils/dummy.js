/**
 * @author Nguyễn Tiến Tài
 * @created_at 04/03/2023
 * @descriptionKey Nav Info
 */
export const navInfo = [
  {
    displayText: 'Giới thiệu',
    path: '/',
    submenu: [
      {
        displayText: 'Submenu 1',
        path: '/sub',
      },
      {
        displayText: 'Submenu 1',
        path: '/sub',
      },
      {
        displayText: 'Submenu 1',
        path: '/sub',
      },
    ],
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
      {
        displayText: 'Submenu 1',
        path: '/sub',
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
