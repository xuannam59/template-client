import { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";

export const handleChangeUpload = (setState: React.Dispatch<React.SetStateAction<UploadFile[]>>) =>
    ({ fileList: newFileList }: UploadChangeParam<UploadFile>) =>
        setState(newFileList.map((item) => ({
            ...item,
            url: item.originFileObj ? URL.createObjectURL(item.originFileObj) : item.url,
            status: 'done'
        })));