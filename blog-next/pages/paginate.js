import _ from "lodash";

export default function paginte  (items, pageNumber, pageSize) {
    const startIndex =  (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
};