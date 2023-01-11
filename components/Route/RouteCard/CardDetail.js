import { Steps } from "antd";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export default function CardDetail({ isActive, route }) {
    const [stations, setStations] = useState();
    const [currentStep,setCurrentStep] = useState();

    useEffect(() => {
        const stationList = route?.stations?.map((station) => ({ title: station?.station_name }))
        setStations(stationList);
    }, [route]);

    return (
        <div className={`${styles["route-detail"]} ${isActive ? styles["route-detail--active"] : ""}`}>
            <Steps
                  progressDot
                  current={currentStep}
                  onChange={(value)=>{setCurrentStep(value)}}
                  direction="vertical"
                  items={stations}
            >
            </Steps>
        </div>
    );
}