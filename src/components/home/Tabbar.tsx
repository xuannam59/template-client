import { Typography } from "antd";
import { ReactNode } from "react"

interface IProps {
    title: string,
    right?: ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | undefined;
}

const { Title } = Typography;

const Tabbar = (props: IProps) => {
    const { title, right, level } = props
    return (
        <>
            <div className="row">
                <div className={`col ${!right && "text-center"}`}>
                    <Title style={{ fontWeight: 300 }} level={level ?? 1}>{title} </Title>
                </div>
                {right && right}
            </div>
        </>
    )
}

export default Tabbar