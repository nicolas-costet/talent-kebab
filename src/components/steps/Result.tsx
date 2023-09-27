import {FunctionComponent} from "react";
import {Button, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {stepsTitleStyle, TripPlannerData} from "src/views/TripPlannerScreen/TripPlannerScreen";

export interface ResultPropsType {
    tripPlanner: TripPlannerData,
}

const Result: FunctionComponent<ResultPropsType> = ({tripPlanner}) => {
    const {t} = useTranslation();

    return (
        <>
            <div>
                <Typography.Text style={stepsTitleStyle}>{t("common.result.title")}</Typography.Text>
            </div>
            <div>
                <Typography.Text>{t("common.result.data", {
                    tripPlanner: tripPlanner
                })}</Typography.Text>
            </div>
            <div>
                <Typography.Text style={stepsTitleStyle}>{t("common.result.confirm")}</Typography.Text>
            </div>
            <div>
                <Button type="primary" htmlType="submit">{t("common.yes")}</Button>
                <Button type="text">{t("common.no")}</Button>
            </div>
        </>
    )
}

export default Result;
