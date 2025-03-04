import { callGetDiscuss } from "@/apis/api";
import { IDiscuss } from "@/types/backend";
import { List } from "antd";
import { useEffect, useState } from "react";
import DiscussItem from "./DiscussItem";

interface IProps {
    parentId: string;
    data?: IDiscuss;
    limit?: number;
}

const DiscussList = (props: IProps) => {
    const { parentId, data, limit } = props
    const [isLoading, setIsLoading] = useState(false);
    const [dataDiscuss, setDataDiscuss] = useState<IDiscuss[]>([]);

    useEffect(() => {
        if (data) {
            setDataDiscuss(previous => [data, ...previous]);
        } else {
            getDiscuss()
        }
    }, [parentId, data, limit]);

    const getDiscuss = async () => {
        setIsLoading(true);
        try {
            const res = await callGetDiscuss(
                `parent_id=${parentId}&pageSize=${limit ? limit : 5}`
            );
            if (res.data) {
                setDataDiscuss(res.data);
            }
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (dataDiscuss.length > 0 ?
        <>
            <List
                itemLayout="vertical"
                loading={isLoading}
                dataSource={dataDiscuss}
                renderItem={(item) =>
                    <>
                        <DiscussItem item={item} setDataDiscuss={setDataDiscuss} />
                    </>
                }
            />
        </>
        : null
    )
}

export default DiscussList