import { ShipInfo } from '../newTypes';

function clickBoard(shipInfo: ShipInfo, event: MouseEvent) {
    const target = event.target;
    if (target instanceof HTMLElement) {
        const row = target.dataset.row;
        const col = target.dataset.col;
        const rowFactor = shipInfo.isVertical ? 10 : 0;
        const colFactor = shipInfo.isVertical ? 0 : 1;
    }
}
