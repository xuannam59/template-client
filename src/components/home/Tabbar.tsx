import { Typography } from "antd";
import { ReactNode } from "react"

interface IProps {
    title: string,
    icon?: ReactNode
    level?: 1 | 2 | 3 | 4 | 5 | undefined;
    textAlign?: "center" | "start" | "end" | undefined
}

const { Title } = Typography;

const Tabbar = (props: IProps) => {
    const { title, level, icon, textAlign } = props
    return (
        <>
            <div className="container">
                <div className={`${textAlign && `text-${textAlign}`}`}>
                    {icon}
                    <Title
                        style={{ fontWeight: 400, marginBottom: 0 }}
                        level={level ?? 1}>
                        {title}
                    </Title>
                </div>
            </div>
        </>
    )
}

export default Tabbar