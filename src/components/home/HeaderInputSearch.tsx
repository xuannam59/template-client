import { replaceName } from "@/utils/replaceName";
import { Drawer, Input } from "antd"
import { useState } from "react";
import { TbSearch } from "react-icons/tb"
import { useNavigate } from "react-router";

interface IProps {
    openDrawer: boolean
    onClose: () => void;
}

const HeaderInputSearch = (props: IProps) => {
    const { openDrawer, onClose } = props
    const [valueKey, setValueKey] = useState("");
    const navigate = useNavigate();


    const onPressEnter = () => {
        if (valueKey.length > 0) {
            const slug = replaceName(valueKey);
            navigate(`products/${slug}`);
            setValueKey("");
            onClose();
        }
    }
    return (
        <>
            <Drawer
                title={"Tìm kiếm sản phẩm"}
                open={openDrawer}
                placement={"top"}
                closeIcon={false}
                onClose={onClose}
                height={150}
            >
                <div className="d-flex justify-content-center">
                    <Input
                        suffix={<TbSearch />}
                        maxLength={128}
                        value={valueKey}
                        onChange={(e) => setValueKey(e.target.value)}
                        placeholder="Nhập từ khoá."
                        style={{ borderRadius: "20px", width: "80%" }}
                        onPressEnter={onPressEnter}
                    />
                </div>
            </Drawer>
        </>
    )
}

export default HeaderInputSearch