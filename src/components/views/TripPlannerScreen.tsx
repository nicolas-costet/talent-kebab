import React, {FunctionComponent, useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import {Alert, Form, FormInstance, Image, Layout, message, Spin, Steps, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {apiKey, modelApiUrl} from "src/utils/constants";
import i18n from "i18next";
import Destination from "src/components/steps/Destination";
import Participants from "src/components/steps/Participants";
import Date from "src/components/steps/Date";
import Result from "src/components/steps/Result";
import Budget from "src/components/steps/Budget";

const steps = (
    next: () => void,
    form: FormInstance,
    tripPlanner: TripPlannerData,
    setTripPlanner: (newDatas: TripPlannerData) => void
) => [
    {
        title: i18n.t("common.steps.city"),
        content: <Destination next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>
    },
    {
        title: i18n.t("common.steps.participants"),
        content: <Participants next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>,
    },
    {
        title: i18n.t("common.steps.date"),
        content: <Date next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>,
    },
    {
        title: i18n.t("common.steps.budget"),
        content: <Budget next={next} form={form} tripPlanner={tripPlanner} setTripPlanner={setTripPlanner}/>,
    },
    {
        title: i18n.t("common.steps.result"),
        content: <Result />
    },
];

export interface TripPlannerData {
    destination?: string;
    persons?: number;
    budget?: number;
    days?: number;
}

const headerStyle: React.CSSProperties = {
    paddingLeft: "10%",
    height: "10%",
    backgroundColor: '#F7F5FF',
};

const subTitleStyle: React.CSSProperties = {
    fontSize: "20px",
    marginTop: "5%",
    fontWeight: 600,
    fontStyle: "italic"
};

const titleStyle: React.CSSProperties = {
    fontSize: "30",
};

const contentStyle: React.CSSProperties = {
    paddingLeft: "10%",
    paddingRight: "10%",
    height: 200,
    lineHeight: '64px',
    backgroundColor: '#FFFFFF',
};

const formStyle: React.CSSProperties = {
    marginTop: "5%",
    width: "100%"
}

const cityContainerStyle: React.CSSProperties = {
    marginTop: "5%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-start"
}

const resultContainerStyle: React.CSSProperties = {
    paddingBottom: "5%",
    width: "fit-content"
}

const TripPlannerScreen: FunctionComponent = () => {
    const {t} = useTranslation();
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const [result, setResult] = useState<string | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<number>(0);
    const [tripPlannerDatas, setTripPlannerDatas] = useState<TripPlannerData>({});

    const handleSubmit = (values: TripPlannerData) => {
        setLoading(true);
        fetch(`${modelApiUrl}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'X-Api-Key': apiKey},
            body:  JSON.stringify(tripPlannerDatas)

        }).then((response) => {
            return response.text().then((text) => {
                setResult(text);
                setLoading(false);
                messageApi.success(t("common.success"))
            });
        });

    }

    const next =  () => {
        setCurrent(current + 1);
    }

    return (
        <Layout className="layout">
            {contextHolder}
            <Header style={headerStyle}>
                <Typography.Title style={subTitleStyle} level={2}>{t("common.title2")}</Typography.Title>
                <Typography.Title style={titleStyle} level={1}>{t("common.title1")}</Typography.Title>

            </Header>
            <Content style={contentStyle}>
                <>
                    <div style={cityContainerStyle}>
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
                        <Form layout={"vertical"} style={formStyle} onFinish={handleSubmit} form={form}>
                            <Steps current={current} items={steps(next, form, tripPlannerDatas, setTripPlannerDatas)}/>
                            <div style={contentStyle}>{steps(next, form, tripPlannerDatas, setTripPlannerDatas)[current].content}</div>
                        </Form>
                    </Spin>

                    {result &&
                        <div style={resultContainerStyle}>
                            <Typography.Text>{t("common.result")}</Typography.Text>
                            <div>
                                <Alert style={{whiteSpace: 'pre-line'}} message={result} type="info"/>
                            </div>
                        </div>}
                </>
            </Content>
        </Layout>
    );
}

export default TripPlannerScreen;
