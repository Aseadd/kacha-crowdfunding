import { Button, Dropdown, Input, Spin } from "antd";
import Table from "antd/es/table";
import ForwardIcon from "src/components/Icons/ForwardIcon";
import DownIcon from "src/components/Icons/DownIcon";
import FilterIcon from "src/components/Icons/FilterIcon";
import BackwardIcon from "src/components/Icons/BackwardIcon";
import NextIcon from "src/components/Icons/NextIcon";
import PreviousIcon from "src/components/Icons/PreviousIcon";
import SearchIcon from "src/components/Icons/SearchIcon";
import FilterDrawer from "./components/FilterDrawer";
import { columns } from "./components/utility";
import useHistory from "src/hooks/useHistory";

export default function History() {
    const { isLoading, lastPage, onClose, open, showDrawer, history, setHistory, handleFiler } = useHistory();
    const sliceEnd = history.startPage + 3;

    return (
        <main className="w-full pt-10 pb-24 max-md:py-3 px-2 xs:px-8 md:py-0 md:pl-10">
            {isLoading ? (
                <div className="w-full flex min-h-screen justify-center items-center p-10">
                    <Spin tip="" size="large"></Spin>
                </div>
            ) : (
                <>
                    <h1 className="text-black font-normal text-base xs:text-[32px] md:hidden">Donation History</h1>
                    <div className="w-full flex py-8 md:py-3 justify-between items-center">
                        <div className="w-[400px]">
                            <Input
                                prefix={<SearchIcon />}
                                className="max-xs:w-[189px] max-md:w-[292px] px-4 py-2 bg-white border border-[#D0D5DD] rounded-lg text-base font-normal"
                                placeholder="Search"
                            />
                        </div>
                        <div className="xs:pr-4">
                            <Button
                                onClick={showDrawer}
                                className="h-auto px-4 py-3 xs:py-[10px] bg-white rounded-lg border border-[#D0D5DD] flex items-center gap-x-2">
                                <FilterIcon />
                                <span className="max-xs-hidden text-[#344054] text-sm font-medium">Filters</span>
                            </Button>
                            <FilterDrawer histories={history.data} onClose={onClose} open={open} handleFiler={handleFiler} />
                        </div>
                    </div>
                    <div className="w-full">
                        <Table columns={columns} dataSource={history.data} pagination={false} scroll={{ x: 881 }} />
                        {Math.ceil(history.total_count / history.per_page) > 0 && (
                            <div className="w-full py-3">
                                <div className="w-full flex flex-col-reverse gap-y-7 xs:flex-row justify-between xs:items-center py-16">
                                    <div className="flex gap-x-[10px] items-center">
                                        <span className="text-[#333] font-semibold text-sm">Page</span>
                                        <Dropdown
                                            trigger={["click"]}
                                            menu={{
                                                items: Array.from(Array(Math.ceil(history.total_count / history.per_page)).keys()).map(
                                                    (value) => ({
                                                        key: value,
                                                        onClick: () => setHistory((prev) => ({ ...prev, page: value })),
                                                        label: (
                                                            <span className="text-[#333] text-sm font-semibold text-start outline-none">
                                                                {value + 1}
                                                            </span>
                                                        ),
                                                    })
                                                ),
                                            }}
                                            placement="bottom">
                                            <Button className="flex items-center gap-x-2 bg-white border border-[#DDD] h-[42px]">
                                                <span className="text-[#333] font-semibold text-sm"> {history.page + 1}</span>
                                                <DownIcon />
                                            </Button>
                                        </Dropdown>
                                        <span className="text-[#333] font-semibold text-sm">of {lastPage}</span>
                                    </div>
                                    <div className="flex gap-x-[5px] items-center">
                                        <Button
                                            onClick={() => setHistory((prev) => ({ ...prev, page: 0 }))}
                                            className="w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold">
                                            <span>
                                                <BackwardIcon />
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                setHistory((prev) => ({
                                                    ...prev,
                                                    page: history.page - 1 > -1 ? history.page - 1 : history.page,
                                                }))
                                            }
                                            className="w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold">
                                            <span>
                                                <PreviousIcon />
                                            </span>
                                        </Button>
                                        {history.startPage > 0 && (
                                            <Button
                                                onClick={() =>
                                                    setHistory((prev) => ({
                                                        ...prev,
                                                        startPage: prev.startPage - 3 > 0 ? prev.startPage - 3 : 0,
                                                    }))
                                                }
                                                className="w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold">
                                                ...
                                            </Button>
                                        )}
                                        {Array.from(Array(lastPage).keys())
                                            .slice(history.startPage, sliceEnd)
                                            .map((value) => (
                                                <Button
                                                    key={value}
                                                    onClick={() => setHistory((prev) => ({ ...prev, page: value }))}
                                                    className={
                                                        history.page === value
                                                            ? "w-8 h-8 border border-[#F1F1F1] bg-secondary rounded-lg flex justify-center items-center text-white text-[13px] font-semibold"
                                                            : "w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold"
                                                    }>
                                                    {value + 1}
                                                </Button>
                                            ))}
                                        {sliceEnd < lastPage - 1 && (
                                            <Button
                                                onClick={() => setHistory((prev) => ({ ...prev, startPage: prev.startPage + 3 }))}
                                                className="w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold">
                                                ...
                                            </Button>
                                        )}
                                        {sliceEnd < lastPage && (
                                            <Button
                                                onClick={() => setHistory((prev) => ({ ...prev, page: lastPage - 1 }))}
                                                className={
                                                    history.page === lastPage - 1
                                                        ? "w-8 h-8 border border-[#F1F1F1] bg-secondary rounded-lg flex justify-center items-center text-white text-[13px] font-semibold"
                                                        : "w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold"
                                                }>
                                                {lastPage}
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() =>
                                                setHistory((prev) => ({
                                                    ...prev,
                                                    page: lastPage > history.page + 1 ? history.page + 1 : history.page,
                                                }))
                                            }
                                            className="w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center text-[#333] text-[13px] font-semibold">
                                            <span>
                                                <NextIcon />
                                            </span>
                                        </Button>
                                        <Button
                                            onClick={() => setHistory((prev) => ({ ...prev, page: lastPage - 1 }))}
                                            className="w-8 h-8 border border-[#F1F1F1] bg-white rounded-lg flex justify-center items-center">
                                            <span>
                                                <ForwardIcon />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}
