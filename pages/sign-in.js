import MainLayout from "layouts/Main";
import AuthForm from "components/AuthForm";

import { authFormFields } from "utils/constant/authFormFields";

export default function SignInPage() {

    const onSigUpSuccessHandle = (values) => {
        console.log("submitted", values);
    }

    return (
        <div className="container--fluid center">
            <AuthForm
                formType="sign-in"
                formName="Đăng nhập"
                fields={authFormFields?.signUp}
                onSubmitHandle={onSigUpSuccessHandle}
                submitText="Đăng Nhập"
            />
        </div>
    );
}

SignInPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    );
}