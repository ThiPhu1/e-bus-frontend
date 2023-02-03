import MyWalletPage from "components/Profile/MyWalletPage";
import ProfileLayout from "layouts/Profile";

export default function MyWallet() {
    
    return <MyWalletPage/>;
}

MyWallet.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}

