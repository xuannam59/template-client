import { Typography } from "antd";
import { ReactNode } from "react"

interface IProps {
    title: string,
    icon?: ReactNode
    level?: 1 | 2 | 3 | 4 | 5 | undefined;
    align?: "center" | "start" | "end" | undefined
}

const { Title } = Typography;

const Tabbar = (props: IProps) => {
    const { title, level, icon, align } = props
    return (
        <>
            <div className="container">
                <div className={`d-flex align-items-center ${align && `justify-content-${align}`}`}>
                    {icon &&
                        <div className="me-1">
                            {icon}
                        </div>
                    }

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