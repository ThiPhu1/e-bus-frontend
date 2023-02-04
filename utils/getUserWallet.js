import userService from "utils/services/user";

export default async function getUserWallet({ accessToken }) {
    let result;
    const res = await userService?.wallet?.get(accessToken);
    if (res.status === 200 || res?.data?.success) {
        result = res?.data?.user_wallet;
    }
    return result;
}