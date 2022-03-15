import React from "react";
import { useTranslation } from 'react-i18next';
import DescImage from "../../image/get-started-v2.jpg"

import "./HowToUse.scss"

export function HowToUse() {
    const { t, i18n } = useTranslation();

    return (
    <div className="get-started-block">
        <h2>{t("get-start")}</h2>
        <div className="get-started-desc">
            <div className="desc-block-1">
                <div className="get-started-text-block">
                    <h3>{t("get-start-one")}</h3>
                    <p>{t("get-start-one-desc")}</p>
                </div>
                <div className="get-started-text-block">
                    <h3>{t("get-start-two")}</h3>
                    <p>{t("get-start-two-single")}</p>
                    <p>{t("get-start-two-batch")}</p>
                </div>
                <div className="get-started-text-block">
                    <h3>{t("get-start-three")}</h3>
                    <p>{t("get-start-three-desc")}</p>
                </div>
                <div className="get-started-text-block">
                    <h3>{t("get-start-four")}</h3>
                    <p>{t("get-start-four-desc")}</p>
                </div>
            </div>
        </div>
    </div>
    );
}