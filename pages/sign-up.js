import MainLayout from "layouts/Main";
import AuthForm from "components/AuthForm";

import { authFormFields } from "utils/constant/authFormFields";

export default function SignUpPage() {

    const onSigInSuccessHandle = (values) => {
        console.log("submitted", values);
    }

    return (
        <div className="container--fluid center">

            <AuthForm
                formType="sign-up"
                formName="Đăng kí"
                fields={authFormFields?.signIn}
                onSubmitHandle={onSigInSuccessHandle}
                submitText="Tạo Tài Khoản"
            />
        </div>
    );
}

SignUpPage.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    );
}