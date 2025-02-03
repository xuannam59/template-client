import { useState } from "react";
import { Typography } from "antd";

const { Paragraph } = Typography;

const Comment = ({ comment }: { comment: string }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <Paragraph
                className="mb-0"
                ellipsis={!expanded ? { rows: 3, expandable: false } : false}
            >
                {comment}
            </Paragraph>

            {comment.length > 100 && (
                <Paragraph
                    type="secondary"
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Thu gọn" : "Xem thêm"}
                </Paragraph>
            )}
        </>
    );
};

export default Comment
