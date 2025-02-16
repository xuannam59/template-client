import { Checkbox, List, Typography } from "antd";

const { Title } = Typography
const ListProductFilter = ({ title, items, filterKey, filters, setFilters }: {
    title: string;
    items: string[];
    filterKey: keyof typeof filters;
    filters: { ram: string[], chip: string[], ssd: string[] };
    setFilters: React.Dispatch<React.SetStateAction<{ ram: string[], chip: string[], ssd: string[] }>>;
}) => {
    return (
        <List
            header={<Title level={5} className="m-0">{title}</Title>}
            dataSource={items}
            renderItem={(item) => (
                <List.Item>
                    <Checkbox
                        checked={filters[filterKey].includes(item)}
                        onChange={(e) => {
                            setFilters(prev => ({
                                ...prev,
                                [filterKey]: e.target.checked
                                    ? [...prev[filterKey], item]
                                    : prev[filterKey].filter(value => value !== item)
                            }));
                        }}
                    >
                        {item}</Checkbox>
                </List.Item>
            )}
        />
    )
}

export default ListProductFilter