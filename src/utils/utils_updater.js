const updateAt = (list, index, updatedItem) => {
	return [...list.map((curItem, i) => (i === index ? updatedItem : curItem))];
};

const insertAt = (list, index, itemToInsert) => {
	return [...list.slice(0, index), itemToInsert, ...list.slice(index)];
};

const removeAt = (list, index) => {
	return [...list.slice(0, index), ...list.slice(index + 1)];
};
