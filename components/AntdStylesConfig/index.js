import { ConfigProvider } from "antd";

export default function AntdStylesConfig({ children }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#78BBE0"
                }
            }}
        >
            {children}
        </ConfigProvider>
    );
}