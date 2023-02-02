import MainLayout from "layouts/Main";
import AuthForm from "components/AuthForm";

import { authFormFields } from "utils/constant/authFormFields";

export default function SignInPage() {

    const onPasswordResetHandle = (values) => {
        // console.log("submitted", values);
    }

    return (
        <div className="container--fluid center">
            <AuthForm
                formType="reset-password"
                formName="Quên mật khẩu"
                fields={authFormFields?.resetPassword}
                onSubmitHandle={onPasswordResetHandle}
                submitText="Tiếp Tục"
            />
        </div>
    );
}

SignInPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    );
}