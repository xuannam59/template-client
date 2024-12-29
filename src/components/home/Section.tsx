import { CSSProperties, ReactNode } from "react"

interface IProps {
    children: ReactNode;
    style?: CSSProperties
}

const Section = (props: IProps) => {
    const { children, style } = props;
    return (
        <div className="section" style={style}>{children}</div>
    )
}

export default Section