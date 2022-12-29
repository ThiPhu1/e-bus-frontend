
export const authFormFields = {
    signUp: [
        {
            name: "username",
            label: "Tên người dùng",
            rules: [
                { required: true, message: `Vui lòng cung cấp tên người dùng` },
            ],
        },
        {
            name: "fullname",
            label: "Họ và Tên",
            rules: [
                { required: true, message: `Vui lòng cung cấp họ và tên` },
            ],
        },
        {
            name: "phoneNumber",
            label: "Số điện thoại",
            rules: [
                { required: true, message: `Vui lòng cung cấp số điện thoại` },
            ],
        },
        {
            name: "password",
            label: "Mật khẩu",
            rules: [
                { required: true, message: `Vui lòng nhập mật khẩu` },
            ],
            inputType: "password",
        },
        {
            name: "passwordConfirm",
            label: "Nhập lại mật khẩu",
            rules: [
                { required: true, message: `Vui lòng cung cấp họ và tên` },
            ],
            dependencies: ['password'],
            hasFeedback: true,
            rules:
                [
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ],
            inputType: "password",
        },
    ],
    signIn: [
        {
            name: "phoneNumber",
            label: "Số điện thoại",
            rules: [
                { required: true, message: `Vui lòng cung cấp số điện thoại` },
            ],
        },
        {
            name: "password",
            label: "Mật khẩu",
            rules: [
                { required: true, message: `Vui lòng nhập mật khẩu` },
            ],
            inputType: "password",
        },
    ],
    resetPassword: [
        {
            name: "phoneNumber",
            label: "Số điện thoại đăng kí",
            rules: [
                { required: true, message: `Vui lòng cung cấp số điện thoại` },
            ],
        },
    ]
}
