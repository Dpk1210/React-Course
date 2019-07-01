import _ from 'lodash';
export function paginate(items, pageNumbar, pageSize) {
    const startIndex = (pageNumbar - 1) * pageSize;
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}