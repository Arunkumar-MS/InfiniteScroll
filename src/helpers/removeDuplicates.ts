interface Item {
    id: string,
    url: string,
}

export const removeDuplicate = () => {
    const orignal = new Set();
    return (newList: Item[]) => {
        return newList.reduce((result, item) => {
            if (!orignal.has(item.id)) {
                result.push(item);
                orignal.add(item.id);
            }
            return result;
        }, []);
    };
}
