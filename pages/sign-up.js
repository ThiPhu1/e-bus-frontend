import MainLayout from "layouts/Main";
import AuthForm from "components/AuthForm";

import authServices from "utils/services/auth";

import { notification } from "antd";

import { authFormFields } from "utils/constant/authFormFields";
import { useState } from "react";

import { useRouter } from "next/router";

// const bcrypt = require('bcryptjs');
// const b_salt = process.env.NEXT_PUBLIC_API_BCRYPT_SALT;

export default function SignUpPage() {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const [isSubmitting, setSubmitState] = useState(false);

    const onSignUpHandle = async ({ username, fullname, phoneNumber, password }) => {
        setSubmitState(true);

        // const salt = bcrypt.genSaltSync(parseInt(b_salt));
        // const hashedPwd = bcrypt.hashSync(password, salt)

        const body = {
            phoneNumber,
            username,
            fullname,
            password: password,
        }

        const res = await authServices.signUp({ body });
        
        const { data } = res;
        if (data.success) {
            router.push("/sign-in");
        } else {
            api.error({
                message: "Error",
                description: data.message,
            });
        }
        setSubmitState(false);
    }

    return (
        <>
            {contextHolder}
            <div className="container--fluid center">
                <AuthForm
                    formType="sign-up"
                    formName="Đăng kí"
                    fields={authFormFields?.signUp}
                    onSubmitHandle={onSignUpHandle}
                    submitText="Tạo Tài Khoản"
                    isSubmitting={isSubmitting}
                />
            </div>
        </>
    );
}

SignUpPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    );
}