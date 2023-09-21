import React from "react";
import {Button, Modal, message} from "antd";
import {DeleteOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {kebabsApiUrl} from "../../../utils/constants";

const { confirm } = Modal;
export const DeleteKebabButton = (props
) => {
    const [messageApi, contextHolder] = message.useMessage();
    const {
        kebabId,
        loadOrderers
    } = props;
    return (
        <>

        {contextHolder}
        <Button
            icon={<DeleteOutlined />}
            size={ "middle"}
            className={"btn-danger"}
            onClick={() =>
                confirm({
                    title: "Supprimer la commande ?",
                    icon: <QuestionCircleOutlined />,
                    okText: (
                        <span>{"Confirmer"}</span>
                    ),
                    cancelText: (
                        <span>{"Annuler"}</span>
                    ),
                    centered: true,
                    onOk() {
                        fetch(`${kebabsApiUrl}/${kebabId}`, {
                            method: "DELETE"
                        }).then((response) => {
                            return response.text().then((text) => {
                                messageApi.info("Commande supprimée avec succès");
                                loadOrderers();
                            });
                        })
                    },
                })
                }
        />
        </>
    );
};
