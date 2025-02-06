import { useAppSelector } from "@/redux/hook";
import { IDiscuss } from "@/types/backend";
import { Avatar, Button, Dropdown, Input, List, message, notification, Space, Typography } from "antd"
import dayjs from "dayjs";
import { TbClock, TbDots, TbSend, TbTrash } from "react-icons/tb";
import Comment from "./Comment";
import { useState } from "react";
import DiscussList from "./DiscussList";
import { callCreateDiscuss, callDeleteDiscuss } from "@/apis/api";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);


interface IProps {
    item: IDiscuss,
    setDataDiscuss: React.Dispatch<React.SetStateAction<IDiscuss[]>>
}

const { Text } = Typography;

const DiscussItem = (props: IProps) => {
    const { item, setDataDiscuss } = props;
    const [isRely, setIsRely] = useState(false);
    const [comment, setComment] = useState("");
    const [dataRely, setDataRely] = useState<IDiscuss>();

    const user = useAppSelector(state => state.auth.user);

    const handleReply = async () => {

        try {
            const res = await callCreateDiscuss(comment, item._id);
            if (res.data) {
                const data: IDiscuss = {
                    _id: res.data._id,
                    comment: comment,
                    parent_id: item._id,
                    created_by: {
                        _id: user._id,
                        name: user.name,
                        avatar: user.avatar
                    },
                    isDeleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
                setComment("");
                setIsRely(false);
                setDataRely(data)
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

    const handleDelete = async () => {
        try {
            const res = await callDeleteDiscuss(item._id);
            if (res.data) {
                setDataDiscuss(previous => {
                    const result = previous.filter(discuss => discuss._id !== item._id);
                    return result;
                });
                console.log(res.data);
                message.success("Xoá thành bình luận thành công");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <List.Item
            key={item._id}
        >
            <List.Item.Meta
                className="review-title mb-0"
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
                        <Space align="center">
                            <Button
                                className="p-0"
                                size="small"
                                type="link"
                                onClick={() => setIsRely(!isRely)} >
                                Trả lời
                            </Button>
                            {(item.created_by._id === user._id || user.role.name == "ADMIN") &&
                                <Dropdown menu={{
                                    items: [
                                        {
                                            label: <span
                                                onClick={handleDelete}
                                                className="text-danger">Xoá bình luận</span>,
                                            icon: <TbTrash
                                                size={18}
                                                className="text-danger"
                                            />,
                                            key: '0',
                                        }
                                    ]
                                }} trigger={['click']}>
                                    <TbDots size={20} style={{ cursor: "pointer" }} />
                                </Dropdown>
                            }
                        </Space>
                        {
                            isRely &&
                            <>
                                <div className="row">
                                    <div className="col-12 col-md-8 col-lg-6">
                                        <Input
                                            size="small"
                                            onPressEnter={handleReply}
                                            value={comment}
                                            onChange={value => setComment(value.target.value)}
                                            allowClear
                                            suffix={<Button
                                                type="text"
                                                icon={<TbSend className="text-info" size={20} onClick={handleReply} />}
                                            />}
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }
            />
            <div className="ms-4">
                <DiscussList parentId={item._id} data={dataRely} />
            </div>
        </List.Item>
    )
}

export default DiscussItem