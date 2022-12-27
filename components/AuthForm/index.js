import { Form, Input, Button } from "antd";
import Link from "next/link";
import { useCallback, useMemo } from "react";

import styles from "./styles.module.scss";

export default function AuthForm({ formType, formName, fields, onSubmitHandle, submitText, isSubmitting }) {

    const renderInputType = useCallback((inputType) => {
        switch (inputType) {
            case "password":
                return <Input.Password />
            default: return <Input />
        }
    }, [])

    const renderFormAdditionFeat = useMemo(() => {
        switch (formType) {
            case "sign-in":
                return <Link href="/forgot-password">
                    <a href="/forgot-password">
                        Quên mật khẩu
                    </a>
                </Link>
            case "sign-up":
                return <span>
                    Đã có tài khoản ? <Link href="/sign-in">
                        <a href="/sign-in">
                            Đăng nhập
                        </a>
                    </Link>
                </span>
            default: break;
        }
    }, [])

    return (
        <div className={styles["auth-form-wrapper"]}>
            <div className={styles["auth-form"]}>
                <h1 className={styles["auth-form__heading"]}>{formName}</h1>
                <Form
                    name={formName}
                    layout="vertical"
                    onFinish={onSubmitHandle}
                    disabled={isSubmitting}
                >
                    <>
                        {
                            fields?.map((field, index) => {
                                return (
                                    <Form.Item
                                        label={field?.label}
                                        name={field?.name}
                                        rules={field?.rules}
                                        dependencies={field?.dependencies ? field.dependencies : []}
                                        hasFeedback={field?.hasFeedback ? field.hasFeedback : false}
                                        key={`${field?.name}${index}`}
                                    >
                                        {renderInputType(field?.inputType)}
                                    </Form.Item>
                                );
                            })
                        }
                    </>
                    <div className={styles["form-addition"]}>
                        {renderFormAdditionFeat}
                    </div>
                    <Form.Item>
                        <div className={styles["submit_btn"]}>
                            <Button type="primary" htmlType="submit" size="large" block>
                                {submitText}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}