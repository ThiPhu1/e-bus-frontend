import styles from "./styles.module.scss";

import { useState } from "react";

import InfoCard from "./InfoCard";
import CheckoutCard from "./CheckoutCard";
import OptionsCard from "./OptionsCard";

import { checkout } from "utils/constant/checkout";

export default function CheckoutPage({ route }) {
    const [itemInfo, setItemInfo] = useState({
        routeId: route?._id,
        orderType: checkout?.paymentMethods[0]?.value,
        ticketType: checkout?.ticketTypes[0]?.value,
        amount: route?.route_price,
        paymentService: {
            bankCode: "",
            orderDescription: `Thanh toan ve xe ${route.route_name}`,
            locale: "vn",
        }
    });

    const updateIntemInfo = (field, value) => {
        setItemInfo((prevObj) => {
            const newObj = { ...prevObj }
            newObj[field] = value;
            return newObj;
        })
    }

    return (
        <div className={styles["chekout-container"]}>
            <div className={styles["chekout-container__left"]}>
                <OptionsCard
                    route={route}
                    checkoutConst={checkout}
                    updateIntemInfo={updateIntemInfo}
                    itemInfo={itemInfo}
                />
            </div>
            <div className={styles["chekout-container__right"]}>
                <InfoCard route={route} itemInfo={itemInfo} checkoutConst={checkout}/>
                <CheckoutCard itemInfo={itemInfo} />
            </div>
        </div>
    );
}