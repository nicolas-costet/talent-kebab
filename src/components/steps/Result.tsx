import {FunctionComponent} from "react";
import {Button, Typography, Space} from "antd";
import {useTranslation} from "react-i18next";

const Result: FunctionComponent = () => {
    const {t} = useTranslation();

    return (
        <>
            <Typography.Text>{t("common.confirm")}</Typography.Text>
            <div>
                <Space.Compact style={{width: '100%'}}>
                    <Button type="primary" htmlType="submit">{t("common.yes")}</Button>
                    <Button type="text" >{t("common.no")}</Button>
                </Space.Compact>
            </div>
        </>
    )
}

export default Result;
