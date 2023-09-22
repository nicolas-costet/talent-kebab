import React, {useState} from "react";
import {Content, Header} from "antd/es/layout/layout";
import {Layout, Typography, Image, Form, Input, Button, Space, Spin, Alert} from "antd";
import {FunctionComponent} from "react";
import {useTranslation} from "react-i18next";
import {apiKey, modelApiUrl} from "src/utils/constants";
import {
    SendOutlined
} from "@ant-design/icons";

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

    const [result, setResult] = useState<string | undefined>();
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleSubmit = (values: TripPlannerData) => {
        setLoading(true);
        const cityQuery = values['cityQuery'];
        fetch(`${modelApiUrl}`, {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'X-Api-Key': apiKey},
            body: JSON.stringify({
                destination: cityQuery,
                budget: "20",
                persons: "1",
                days: "2"
            }),

        }).then((response) => {
            return response.text().then((text) => {
                setResult(text);
                setLoading(false)
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
                    <Form layout={"vertical"} style={formStyle} onFinish={handleSubmit}>
                        <Typography.Text>{t("common.city")}</Typography.Text>
                        <Space.Compact style={{width: '100%'}}>
                            <Form.Item
                                name="cityQuery"
                                rules={[{required: true, message: 'Renseigner un pain'}]}
                                style={{width: '70%'}}
                            >
                                <Input style={{width: '100%'}}/>
                            </Form.Item>
                            <Button type="primary" icon={<SendOutlined />} htmlType="submit" />
                        </Space.Compact>
                    </Form>
                    </Spin>
                    {result &&
                        <div style={resultContainerStyle}>
                            <Typography.Text>{t("common.result")}</Typography.Text>
                            <div>
                                <Alert style={{ whiteSpace: 'pre-line' }}  message={result} type="info" />
                            </div>
                        </div>}
                </>
            </Content>
        </Layout>
    );
}

export default TripPlannerScreen;
