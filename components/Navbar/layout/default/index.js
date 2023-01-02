import Link from "next/link";
import { Button } from "antd";

export default function DefaultSecondaryNav() {
    return (
        <>
            <Link
                href="/sign-in"
            >
                <a href="/sign-in">
                    <Button type="text" size="large">Đăng nhập</Button>
                </a>
            </Link>
            <Link
                href="/sign-up"
            >
                <a href="/sign-up">
                    <Button type="primary" size="large">Đăng kí</Button>
                </a>
            </Link>
        </>
    );
}