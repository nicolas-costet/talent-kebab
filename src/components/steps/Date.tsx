import {FunctionComponent} from "react";
import {Button, DatePicker, Form, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {StepPropsType} from "@components/steps/step.props";

const { RangePicker } = DatePicker;
const Destination: FunctionComponent<StepPropsType> = ({ next, form, tripPlanner, setTripPlanner }) => {
    const {t} = useTranslation();

    const handleNext = () => {
        form.validateFields().then(() => {
                const date = form.getFieldValue("date")
                if (date) {
                    setTripPlanner({
                        ...tripPlanner,
                        days: 2,
                    });
                    next();
                }
            }
        ).catch(() => null)
    }

    return (
        <>
            <Typography.Text>{t("common.participants")}</Typography.Text>
            <Space.Compact style={{width: '100%'}}>
                <Form.Item
                    name="date"
                    rules={[{required: true, message: t("common.empty")}]}
                    style={{width: '70%'}}
                >
                    <RangePicker />
                </Form.Item>
                <Button type="primary" icon={<SendOutlined/>} onClick={handleNext}/>
            </Space.Compact>
        </>
    )
}

export default Destination;
