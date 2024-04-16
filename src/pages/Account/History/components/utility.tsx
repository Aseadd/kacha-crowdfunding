import { ColumnsType } from "antd/es/table";
import moment from "moment";
import ActiveIcon from "src/components/Icons/ActiveIcon";
import ArrowDown from "src/components/Icons/ArrowDownIcon";
import ClosedIcon from "src/components/Icons/ClosedIcon";
import { IHistory } from "src/model/campaign";

export const columns: ColumnsType<IHistory> = [
    {
        key: "1",
        title: "Causes",
        dataIndex: "cause",
        sorter: (a, b) => (a.cause.toLowerCase() > b.cause.toLocaleLowerCase() ? 1 : -1),
        sortIcon: ({ sortOrder }) => <ArrowDown />,
        align: "center",
        render: (text: string) => <div className="w-full text-left text-[#101828] font-semibold">{text}</div>,
        width: 252,
    },
    {
        key: "2",
        title: "Donation Date",
        dataIndex: "created_at",
        sorter: (a, b) => (new Date(a.created_at) > new Date(b.created_at) ? 1 : -1),
        sortIcon: ({ sortOrder }) => <ArrowDown />,
        align: "center",
        width: 130,
        render: (text: string) => <span>{moment(text).format("DD/MM/YYYY")}</span>,
    },
    {
        key: "3",
        title: "Donation Amount",
        dataIndex: "amount",
        sorter: (a, b) => a.amount - b.amount,
        sortIcon: ({ sortOrder }) => <ArrowDown />,
        align: "center",
        width: 130,
    },
    {
        key: "4",
        title: "Category",
        dataIndex: "category",
        sorter: (a, b) => (a.category.toLowerCase() > b.category.toLocaleLowerCase() ? 1 : -1),
        sortIcon: ({ sortOrder }) => <ArrowDown />,
        align: "center",
        width: 130,
    },
    {
        key: "5",
        title: "Status",
        dataIndex: "status",
        sorter: (a, b) => (a.status.toLowerCase() > b.status.toLocaleLowerCase() ? 1 : -1),
        sortIcon: ({ sortOrder }) => <ArrowDown />,
        align: "center",
        render: (text: string) =>
            text.toLocaleLowerCase() === "active" ? (
                <div className="w-full flex justify-center item-center">
                    <div className="px-2 py-1 flex items-center justify-center gap-x-[6px] bg-[#ECFDF3] rounded-2xl">
                        <ActiveIcon />
                        <span className="text-[#037847] text-xs font-normal">Active</span>
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-center item-center">
                    <div className="px-2 py-1 flex items-center justify-center gap-x-[6px] bg-[#F2F4F7] rounded-2xl">
                        <ClosedIcon />
                        <span className="text-[#364254] text-xs font-normal">Closed</span>
                    </div>
                </div>
            ),
        width: 130,
    },
];
