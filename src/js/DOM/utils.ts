function getRowColFromDataset(dataset: DOMStringMap) {
    return [parseInt(dataset.row, 10), parseInt(dataset.col, 10)];
}

function enableBtn(btn: HTMLElement) {
    btn.classList.add('btn--enabled');
    btn.classList.remove('btn--disabled');
}

function disableBtn(btn: HTMLElement) {
    btn.classList.add('btn--disabled');
    btn.classList.remove('btn--enabled');
}

export { getRowColFromDataset, enableBtn, disableBtn };
