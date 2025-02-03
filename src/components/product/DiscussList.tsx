import { callGetDiscuss } from "@/apis/api";
import { IDiscuss } from "@/types/backend";
import { List } from "antd";
import { useEffect, useState } from "react";
import DiscussItem from "./DiscussItem";

interface IProps {
    parentId: string;
}

const DiscussList = (props: IProps) => {
    const { parentId } = props
    const [isLoading, setIsLoading] = useState(false);
    const [dataDiscuss, setDataDiscuss] = useState<IDiscuss[]>([]);
    const [isPageSize, setIsPageSize] = useState(true);

    useEffect(() => {
        getDiscuss()
    }, [parentId]);

    const getDiscuss = async () => {
        setIsLoading(true);
        try {
            const res = await callGetDiscuss(
                `parent_id=${parentId}${isPageSize ? "&pageSize=5" : ''}`
            );
            if (res.data) {
                setDataDiscuss(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    return (dataDiscuss.length > 0 ?
        <List
            loading={isLoading}
            itemLayout="vertical"
            dataSource={dataDiscuss}
            renderItem={(item) => <div className="ms-4" key={item._id}>
                <DiscussItem
                    item={item}
                    onAddNew={getDiscuss}
                />
            </div>
            }
        />
        : null
    )
}

export default DiscussList