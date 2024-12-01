export function quicksort(list: number[]): number[] {
    if (list.length <= 1) {
        return list;
    }

    const pivot = list[list.length - 1];
    const leftArr: number[] = [];
    const rightArr: number[] = [];

    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] < pivot) {
            leftArr.push(list[i]);
        } else {
            rightArr.push(list[i]);
        }
    }

    return [...quicksort(leftArr), pivot, ...quicksort(rightArr)];
}

const unsortedArray = [5, 1, 4, 2, 7, 3, 6];
console.log(quicksort(unsortedArray));