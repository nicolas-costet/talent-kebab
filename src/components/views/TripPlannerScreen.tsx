import React, {useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import {Layout, Typography, Image, Form, Input, Button, Space} from "antd";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import {apiKey, modelApiUrl} from "src/utils/constants";

interface TripPlannerData {
    cityQuery: string;
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

const TripPlannerScreen: FunctionComponent = () => {
    const {t} = useTranslation();

    const [result, setResult] = useState<string | undefined>();

    const handleSubmit =  (values: TripPlannerData) => {
        const cityQuery = values['cityQuery'];
        fetch(`${modelApiUrl}`, {
            method: "POST",
            headers: {
                ["Access-Control-Allow-Origin"]: "*",
                ["x-api-key"]: apiKey,
                ["Content-Type"]: "application/json",
                mode: "no-cors"
            },
            body: JSON.stringify({
                data: cityQuery
            }),

        }).then((response) => {
            return response.text().then((text) => {
                const data = (text && JSON.parse(text));
                console.log(data);
                setResult(data);
            });
        });

    }

    return (
        <Layout className="layout">
            <Header style={headerStyle}>
                <Typography.Title style={subTitleStyle} level={2}>{t("common.title2")}</Typography.Title>
                <Typography.Title style={titleStyle} level={1}>{t("common.title1")}</Typography.Title>

            </Header>
            <Content style={contentStyle}>
                <>
                    <div style={cityContainerStyle}>
                        <Image
                            height={212}
                            src="/img/image 1.svg"
                        />
                        <Image
                            src="/img/ellipse.svg"
                        />
                    </div>
                        <Form layout={"vertical"} style={formStyle}  onFinish={handleSubmit}>
                            <Typography.Text>{t("common.city")}</Typography.Text>
                            <Space.Compact style={{width: '100%'}}>
                                <Form.Item
                                    name="cityQuery"
                                    rules={[{required: true, message: 'Renseigner un pain'}]}
                                    style={{width: '70%'}}
                                >
                                    <Input style={{width: '100%'}}/>
                                </Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Space.Compact>
                        </Form>
                    {result &&
                        <><Typography.Text>{t("common.result")}</Typography.Text>
                            <div>
                        <Typography.Text>{result}</Typography.Text>
                            </div>
                    </>}
                </>
            </Content>
        </Layout>
    );
}

export default TripPlannerScreen;
