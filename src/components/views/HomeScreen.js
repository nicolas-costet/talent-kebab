import {Content, Footer, Header} from "antd/es/layout/layout";
import {Button, Form, Input, Layout, Menu, message, Switch, Table} from "antd";
import {columns} from "../kebabs/columns/KebabsColumn";
import {useEffect, useState} from "react";
import {kebabsApiUrl} from "../../utils/constants";

export const HomeScreen = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [kebabs, setKebabs] = useState([])
    const [selectedKebab, setSelectedKebab] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    // const [sorter, setSorter] = useState({
    //     columnKey: "orderer",
    //     order: "ascend",
    // });
    //
    // const handleTableChange = (
    //     pagination,
    //     filters,
    //     sorter
    // ) => {
    //     if (sorter.column) {
    //         setSorter(sorter);
    //     }
    // };

    useEffect(() => {
        loadOrderers()
    }, []);

    const loadOrderers = () => {
        setIsLoading(true);
        fetch(`${kebabsApiUrl}`, {
            method: "GET",
        }).then((response) => {
            return response.text().then((text) => {
                const data = (text && JSON.parse(text));
                setKebabs(data.data)
                setIsLoading(false)
            });
        });
    }

    const onUpdateKebab = (values) => {
        const orderer = values['orderer'];
        const bread = values['bread'];
        const salad = values['salad'];
        const tomato = values['tomato'];
        const onion = values['onion'];
            fetch(`${kebabsApiUrl}/${selectedKebab.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    orderer,
                    bread,
                    salad,
                    tomato,
                    onion
                }),

            }).then((response) => {
                return response.text().then((text) => {
                    const data = (text && JSON.parse(text));
                    setSelectedKebab({
                        ...selectedKebab,
                        data
                    })
                    messageApi.info("Commande mise à jour avec succès");
                    loadOrderers();
                });
            });
    };

    return (
        <Layout className="layout">
            {contextHolder}
            <Header>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            label: "Kebabs"
                        }
                    ]}
                />
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Table
                    loading={isLoading}
                    columns={columns(loadOrderers)}
                    style={{whiteSpace: "break-spaces"}}
                    dataSource={kebabs}
                    onRow={(record) => {
                        return {
                            onClick: () => setSelectedKebab(record)
                        };
                    }}
                    loadOrderers={loadOrderers}
                    // onChange={handleTableChange}
                />
                {selectedKebab && (
                    <>
                        <Form
                            name="basic"
                            labelCol={{span: 8}}
                            wrapperCol={{span: 16}}
                            style={{maxWidth: 600}}
                            initialValues={{
                                ...selectedKebab
                            }}
                            onFinish={onUpdateKebab}
                            autoComplete="off"

                        >
                            <Form.Item
                                label="Client"
                                name="orderer"
                                rules={[{required: true, message: 'Renseigner votre nom'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Pain"
                                name="bread"
                                rules={[{required: true, message: 'Renseigner un pain'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Meat"
                                name="meat"
                                rules={[{required: true, message: 'Renseigner une viande'}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Oignon"
                                name="onion"
                                rules={[{required: true, message: 'Oignon ?'}]}
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                label="Salade"
                                name="salad"
                                rules={[{required: true, message: 'Salade ?'}]}
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item
                                label="Tomate"
                                name="tomato"
                                rules={[{required: true, message: 'Tomate ?'}]}
                            >
                                <Switch />
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                                <Button type="primary" htmlType="submit" loading={isLoading}>
                                    Mettre à jour
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
}
