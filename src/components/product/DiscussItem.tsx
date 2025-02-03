import { useAppSelector } from "@/redux/hook";
import { IDiscuss } from "@/types/backend";
import { Avatar, Button, Divider, Input, List, notification, Pagination, Typography } from "antd"
import dayjs from "dayjs";
import { TbClock, TbSend } from "react-icons/tb";
import Comment from "./Comment";
import { useState } from "react";
import DiscussList from "./DiscussList";
import { callCreateDiscuss } from "@/apis/api";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime);

interface IProps {
    item: IDiscuss,
    onAddNew: () => void
}

const { Text } = Typography;

const DiscussItem = (props: IProps) => {
    const { item, onAddNew } = props;
    const user = useAppSelector(state => state.auth.user);
    const [isRely, setIsRely] = useState(false);
    const [comment, setComment] = useState("");

    const handleReply = async () => {
        if (comment.length < 3)
            return
        try {
            const res = await callCreateDiscuss(comment, item._id);
            if (res.data) {
                setComment("");
                onAddNew();
            } else {
                notification.error({
                    message: "Trả lời thất bại",
                    description: res.message
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <List.Item
            key={item._id}
        >
            <List.Item.Meta
                className="review-title"
                avatar={
                    <Avatar
                        size={40}
                        src={item.created_by.avatar ? item.created_by.avatar : "/images/avatar-user1.png"}
                    />
                }
                title={<div className="d-flex align-items-center">
                    <Text style={{ fontSize: "16px" }}>
                        {item.created_by._id === user._id ? "Me" : item.created_by.name}
                    </Text>
                    <TbClock className="mx-1" size={14} />
                    <Text type="secondary" style={{ fontSize: "12px" }}>
                        {dayjs(item.createdAt).fromNow()}
                    </Text>
                </div>}
                description={
                    <>
                        <Comment comment={item.comment} />
                        <div
                            className="text-info mb-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsRely(!isRely)}>Trả lời</div>
                        {
                            isRely &&
                            <>
                                <Input
                                    onPressEnter={handleReply}
                                    value={comment}
                                    onChange={value => setComment(value.target.value)}
                                    allowClear
                                    suffix={<Button
                                        type="text"
                                        icon={<TbSend className="text-info" size={20} />}
                                        onClick={handleReply}
                                    />}
                                />
                            </>
                        }
                    </>
                }
            />
            <DiscussList parentId={item._id} />
        </List.Item>
    )
}

export default DiscussItem