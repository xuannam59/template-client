import { Drawer, Input } from "antd"
import { TbSearch } from "react-icons/tb"

interface IProps {
    openDrawer: boolean
    onClose: () => void;
}

const HeaderInputSearch = (props: IProps) => {
    const { openDrawer, onClose } = props
    let timeoutId: ReturnType<typeof setTimeout>;
    // const [result, setResult] = useState(0);


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 3) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                console.log(value);
            }, 3000);
        }
    }
    const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value.trim();
        console.log(value);
    }
    return (
        <>
            <Drawer
                title={"Tìm kiếm"}
                open={openDrawer}
                placement={"top"}
                closeIcon={false}
                onClose={onClose}
                height={120}
            >
                <div className="d-flex justify-content-center">
                    <Input
                        suffix={<TbSearch />}
                        maxLength={128}
                        placeholder="Nhập từ khoá."
                        style={{ borderRadius: "20px", width: "80%" }}
                        onChange={onChange}
                        onPressEnter={onPressEnter}

                    />
                </div>
            </Drawer>
        </>
    )
}

export default HeaderInputSearch