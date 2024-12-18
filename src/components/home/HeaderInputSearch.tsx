import { Input } from "antd"
import { TbSearch } from "react-icons/tb"

const HeaderInputSearch = () => {
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

            <Input
                suffix={<TbSearch />}
                maxLength={128}
                placeholder="Search product..."
                style={{ borderRadius: "20px" }}
                onChange={onChange}
                onPressEnter={onPressEnter}
            />

        </>
    )
}

export default HeaderInputSearch