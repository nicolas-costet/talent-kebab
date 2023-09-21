import {DeleteKebabButton} from "./DeleteKebabButton";
import {DeleteOutlined} from "@ant-design/icons";

export const columns = (loadOrderers) => [
  {
    title: "orderer",
    key: "orderer",
    dataIndex: "orderer",
    ellipsis: false,
    sorter: true,
  },
  {
    title: "bread",
    key: "bread",
    dataIndex: "bread",
    ellipsis: false,
    sorter: true,
  },
  {
    title: "meat",
    key: "meat",
    dataIndex: "meat",
    ellipsis: false,
    sorter: true,
  },
  {
    title: "salad",
    key: "salad",
    dataIndex: "salad",
    ellipsis: false,
    sorter: true,
  },
  {
    title: "tomato",
    key: "tomato",
    dataIndex: "tomato",
    ellipsis: false,
    sorter: true,
  },
  {
    title: "onion",
    key: "onion",
    dataIndex: "onion",
    ellipsis: false,
    sorter: true,
  },
  {
    title: "Actions",
    key: "action",
    ellipsis: false,
    onCell: () => {
      return {
        onClick: (e) =>
            e.stopPropagation(),
      };
    },
    render: (record) => (
        <DeleteKebabButton
            kebabId={record.id}
            loadOrderers={loadOrderers}
            icon={<DeleteOutlined />}
            buttonClassName="btn-danger"
        />
    ),
  },
];
