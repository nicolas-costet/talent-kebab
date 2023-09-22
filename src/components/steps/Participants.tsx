import {FunctionComponent} from "react";
import {Button, Form, InputNumber, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {SendOutlined} from "@ant-design/icons";
import {StepPropsType} from "src/components/steps/step.props";


const Destination: FunctionComponent<StepPropsType> = ({ next, form, tripPlanner, setTripPlanner }) => {
    const {t} = useTranslation();

    const handleNext = () => {
        form.validateFields().then(() => {
                const persons = form.getFieldValue("participants")
                if (persons) {
                    setTripPlanner({
                        ...tripPlanner,
                        persons,
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
                    name="participants"
                    rules={[{required: true, message: t("common.empty")}]}
                    style={{width: '70%'}}
                >
                    <InputNumber style={{width: '100%'}} placeholder="Indiquer ici le nombre de participants"/>
                </Form.Item>
                <Button type="primary" icon={<SendOutlined/>} onClick={handleNext}/>
            </Space.Compact>
        </>
    )
}

export default Destination;
