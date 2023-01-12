import Link from "next/link";
import { Button } from "antd";

export default function DefaultSecondaryNav() {
    return (
        <>
            <Link
                href="/sign-in"
            >
                <Button type="text" size="large">Đăng nhập</Button>
            </Link>
            <Link
                href="/sign-up"
            >
                <Button type="primary" size="large">Đăng kí</Button>
            </Link>
        </>
    );
}