export default class Direction {
    static Up = 'up';
    static Down = 'down';
    static Left = 'left';
    static Right = 'right';

    static getOpposite(direction) {
        switch (direction) {
            case this.Up: return this.Down;
            case this.Down: return this.Up;
            case this.Right: return this.Left;
            case this.Left: return this.Right;
        }
    }

    static isVertical(direction) {
        switch (direction) {
            case this.Up:
            case this.Down:
                return true;
            case this.Right:
            case this.Left:
                return false;
        }
    }
}