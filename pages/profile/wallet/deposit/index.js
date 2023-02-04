import WalletDepositPage from "components/Profile/WalletDepositPage";
import ProfileLayout from "layouts/Profile";

export default function MyWallet() {
    
    return <WalletDepositPage/>;
}

MyWallet.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}

