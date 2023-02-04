import styles from "../styles.module.scss";

import { Button, Result } from "antd";

import { useRouter } from "next/router";

import { transactionConst } from "utils/constant/transaction";

import { useSession } from "next-auth/react";
import { useAuthContext } from "contexts/auth";
import { useEffect } from "react";

// const redirectTimeOut = 5;
export default function TransactionResult({ result }) {
    const { data: sessionData } = useSession();
    const { updateUserWallet } = useAuthContext();
    const router = useRouter();

    const handleRouting = (pathname) => {
        router.push(pathname);
    }

    useEffect(() => {
        if(result?.success){
            updateUserWallet(sessionData?.accessToken)
        }
        return;
    }, [])

    // const [redirectTO,setRedirectTO] = useState(redirectTimeOut);

    // useEffect(()=>{
    //     const to = setTimeout(()=>{
    //         if(redirectTO < 0) {
    //             handleRouting("/profile/my-booking");
    //             return;
    //         }

    //         setRedirectTO(prev => prev-=1);
    //     },1000)

    //     return () => clearTimeout(to);
    // },[redirectTO])

    return (
        <div className={styles["transaction-callback-wrapper"]}>
            <div className={styles["transaction-callback"]}>
                <Result
                    status={result?.success ? "success" : "error"}
                    title={result?.message}
                    extra={[
                        <Button
                            type="primary"
                            key="primary"
                            onClick={() => handleRouting("/profile/my-ticket")}
                        >
                            {`Vé của tôi`}
                        </Button>,
                        <Button
                            key="secondary"
                            // type="secondary"
                            onClick={() => handleRouting("/")}
                        >
                            Về trang chủ
                        </Button>,
                    ]}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const { query } = ctx;
    const result = transactionConst?.walletStatus?.find((st) => st?.value === query?.code);

    return {
        props: {
            result,
        }
    }
}

TransactionResult.getLayout = function getLayout(page) {
    return page;
}
