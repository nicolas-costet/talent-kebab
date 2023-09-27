import {FunctionComponent} from "react";
import {Button, Form, InputNumber, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {StepPropsType} from "src/components/steps/step.props";
import {stepsTitleStyle} from "src/views/TripPlannerScreen/TripPlannerScreen";

const Destination: FunctionComponent<StepPropsType> = ({next, form, tripPlanner, setTripPlanner}) => {
    const {t} = useTranslation();

    const handleNext = () => {
        form.validateFields().then(() => {
                const budget = form.getFieldValue("budget")
                if (budget) {
                    setTripPlanner({
                        ...tripPlanner,
                        budget,
                    });
                    next();
                }
            }
        ).catch(() => null)
    }

    return (
        <>
            <Typography.Text style={stepsTitleStyle}>{t("common.budget")}</Typography.Text>
            <Space.Compact style={{width: '100%'}}>
                <Form.Item
                    name="budget"
                    rules={[{required: true, message: t("common.empty")}]}
                    style={{width: '70%'}}
                >
                    <InputNumber style={{width: '100%'}} placeholder="Indiquer ici votre budget en euros"/>
                </Form.Item>
                <Button type="primary" icon={<SendOutlined/>} onClick={handleNext}/>
            </Space.Compact>
        </>
    )
}

export default Destination;
