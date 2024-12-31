import { Typography } from "antd";
import { ReactNode } from "react"

interface IProps {
    title: string,
    icon?: ReactNode
    level?: 1 | 2 | 3 | 4 | 5 | undefined;
}

const { Title } = Typography;

const Tabbar = (props: IProps) => {
    const { title, level, icon } = props
    return (
        <>
            <div className="container">
                <div className={`d-flex justify-content-center align-items-center`}>
                    {icon}
                    <Title
                        style={{ fontWeight: 400, marginLeft: 4 }}
                        level={level ?? 1}>
                        {title}
                    </Title>
                </div>
            </div>
        </>
    )
}

export default Tabbar