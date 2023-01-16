import { UserOutlined, ShoppingOutlined } from '@ant-design/icons';

export const settingMenu = [
    {
        title: "Tài khoản của tôi",
        pathName: "/profile/about",
        icon: <UserOutlined />,
    },
    {
        title: "Lịch sử mua vé",
        pathName: "/profile/my-booking",
        icon: <ShoppingOutlined />,
    },
];