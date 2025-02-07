interface ITree {
    _id: string,
    label: JSX.Element,
    key: string;
    parentId?: string;
    children?: any
}

const createTree = (arr: ITree[], parentId: string = "") => {
    const tree: ITree[] = [];
    arr.forEach(item => {
        if (item.parentId == parentId) {
            const newItem = item;
            const children = createTree(arr, item._id);
            if (children.length > 0) {
                newItem.children = children;
            }
            delete newItem.parentId;
            tree.push(newItem);
        }
    })
    return tree;
}

export const tree = (array: ITree[], parentId: string = "") => {
    return createTree(array, parentId);
}