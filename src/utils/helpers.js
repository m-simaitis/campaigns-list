export const sortByDate = (a, b) => {
    const a1 = new Date(a).getTime();
    const b1 = new Date(b).getTime();
    if (a1 < b1) return 1;
    else if (a1 > b1) return -1;
    else return 0;
};

export const sortByStatus = (a, b) => {
    const a1 = Number(a.props['data-sort']);
    const b1 = Number(b.props['data-sort']);
    if (a1 < b1) return 1;
    else if (a1 > b1) return -1;
    else return 0;
};

export const sortByBudget = (a, b) => {
    const a1 = parseInt(a);
    const b1 = parseInt(b);
    if (a1 < b1) return 1;
    else if (a1 > b1) return -1;
    else return 0;
};