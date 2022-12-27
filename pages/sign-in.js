import MainLayout from "layouts/Main";
import AuthForm from "components/AuthForm";

import { authFormFields } from "utils/constant/authFormFields";

import authServices from "utils/services/auth";
import { notification } from "antd";
import { useState } from "react";

import { setCookies } from "utils/cookies";

import { useAuthContext } from "contexts/auth";

import { useRouter } from "next/router";

export default function SignInPage() {
    const router = useRouter();

    const { setUser } = useAuthContext();
    const [api, contextHolder] = notification.useNotification();

    const [isSubmitting, setSubmitState] = useState(false);

    const onSignInHandle = async (values) => {
        setSubmitState(true);

        const signInBody = {
            username: values?.phoneNum,
            password: values?.password,
        }

        const res = await authServices.signIn({ body: signInBody })
        const { status, data, response } = res;
        if (status === 200) {
            setCookies("accessToken", data?.accessToken);
            setUser(data?.user);

            router.push("/");
        } else {
            api.error({
                message: "Error",
                description: response?.data?.message,
            });
        }

        setSubmitState(false);
    }

    return (
        <>
            {contextHolder}
            <div className="container--fluid center">

                <AuthForm
                    formType="sign-in"
                    formName="Đăng nhập"
                    fields={authFormFields?.signIn}
                    onSubmitHandle={onSignInHandle}
                    submitText="Đăng Nhập"
                    isSubmitting={isSubmitting}
                />
            </div>
        </>

    );
}

SignInPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    );
}