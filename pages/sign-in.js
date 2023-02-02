import MainLayout from "layouts/Main";
import AuthForm from "components/AuthForm";

import { authFormFields } from "utils/constant/authFormFields";

import { notification } from "antd";
import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/router";

export default function SignInPage() {
    const router = useRouter();

    const [api, contextHolder] = notification.useNotification();

    const [isSubmitting, setSubmitState] = useState(false);

    const onSignInHandle = async (values) => {
        setSubmitState(true);

        const res = await signIn("credentials", {
            username: values?.phoneNumber,
            password: values?.password,
            redirect: false,
        })
        
        console.log("res",res);

        if (res.status === 200) {
            const callbackUrlParams = new URLSearchParams(res.url.split("?")[1]);
            const callbackUrl = callbackUrlParams.get("callbackUrl") ? decodeURI(callbackUrlParams.get("callbackUrl")) : null;

            if(!!callbackUrl){
                router.push(callbackUrl)
            } else {
                router.push("/");
            }
        } else {
            api.error({
                message: "Error",
                description: res.error,
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