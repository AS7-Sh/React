let sort = {
    numeric(unSortedArray, column, order) {
        unSortedArray.sort((first, second) => {
            if (first[column] > second[column]) return (
                order === "acs" ? -1 : 1
            );
            return (order === "acs" ? 1 : -1);
        })
        return unSortedArray;
    },
    text(unSortedArray, column, order) {

        unSortedArray.sort((first, second) => {
            if (column === "genre") {
                first = first[column].name;
                second = second[column].name;
            }
            else {
                first = first[column];
                second = second[column];
            }
            if (first > second) return (
                order === "acs" ? -1 : 1
            );
            return order === "acs" ? 1 : -1

        })
        return unSortedArray;
    }
}

export { sort };