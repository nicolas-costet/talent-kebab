import "./TripPlannerScreen.css"
import React, {FunctionComponent, useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import {Alert, Form, FormInstance, Image, Layout, message, Spin, Steps, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {apiKey, modelApiUrl} from "src/utils/constants";
import Destination from "src/components/steps/Destination";
import Participants from "src/components/steps/Participants/Participants";
import Date from "src/components/steps/Date";
import Result from "src/components/steps/Result";
import Budget from "src/components/steps/Budget";

const steps = (
    next: () => void,
    form: FormInstance,
    tripPlanner: TripPlannerData,
    setTripPlanner: (newData: TripPlannerData) => void,
) => [
    {
        title: "",
        content: <Destination next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>
    },
    {
        title: "",
        content: <Participants next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>,
    },
    {
        title: "",
        content: <Date next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>,
    },
    {
        title: "",
        content: <Budget next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>,
    },
    {
        title: "",
        content: <Result tripPlanner={tripPlanner}/>,
        disabled: true
    },
];

export interface TripPlannerData {
    destination?: string;
    personsCount?: PersonsCount;
    budget?: number;
    days?: number;
}

export interface PersonsCount {
    adultsCount: number;
    childrenCount: number;
    babiesCount: number;
}

const subTitleStyle: React.CSSProperties = {
    fontSize: "20px",
    marginTop: "5%",
    fontWeight: 600,
    fontStyle: "italic"
};

const titleStyle: React.CSSProperties = {
    fontSize: "30",
};

export const stepsTitleStyle: React.CSSProperties = {
    fontSize: "18px",
    fontFamily: "Open Sans",
    color: '#2816C0',
    fontWeight: 600
}


const TripPlannerScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const [result, setResult] = useState<string | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(0);
    const [tripPlannerData, setTripPlannerData] = useState<TripPlannerData>({});

    const handleSubmit = (values: TripPlannerData) => {
        setLoading(true);
        fetch(`${modelApiUrl}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'X-Api-Key': apiKey},
            body:  JSON.stringify({
                ...tripPlannerData,
                persons: tripPlannerData.personsCount?.adultsCount
            })

        }).then((response) => {
            return response.text().then((text) => {
                setResult(text);
                setLoading(false);
                messageApi.success(t("common.success"))
            });
        });

    }

    const onStepperChange = (value: number) => {
        setCurrent(value);
    };

    const next =  () => {
        setCurrent(current + 1);
    }

    return (
        <Layout className="layout">
            {contextHolder}
            <Header className="trip-planner-screen--header">
                <Typography.Title style={subTitleStyle} level={2}>{t("common.title2")}</Typography.Title>
                <Typography.Title style={titleStyle} level={1}>{t("common.title1")}</Typography.Title>

            </Header>
            <Content className="trip-planner-screen--content">
                <>
                    <div className="trip-planner-screen--city-container">
                        <Image
                            preview={false}
                            height={212}
                            src="/img/image 1.svg"
                        />
                        <Image
                            preview={false}
                            src="/img/ellipse.svg"
                        />
                    </div>
                    <Spin tip="Loading..." spinning={isLoading}>
                        <Form layout={"vertical"} className="trip-planner-screen--form" onFinish={handleSubmit} form={form}>
                            <Steps current={current} items={steps(next, form, tripPlannerData, setTripPlannerData)} onChange={onStepperChange}/>
                            <div className="trip-planner-screen--content">{steps(next, form, tripPlannerData, setTripPlannerData)[current].content}</div>
                        </Form>
                    </Spin>

                    {result &&
                        <div className="trip-planner-screen--result">
                            <Typography.Text style={stepsTitleStyle}>{t("common.result.result")}</Typography.Text>
                            <div>
                                <Alert style={{whiteSpace: 'pre-line'}} message={result} type="warning"/>
                            </div>
                        </div>}
                </>
            </Content>
        </Layout>
    );
}

export default TripPlannerScreen;
