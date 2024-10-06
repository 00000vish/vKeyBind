export default class Direction {
    static Up = 'up';
    static Down = 'down';
    static Left = 'left';
    static Right = 'right';

    static opposite(direction) {
        switch (direction) {
            case this.Up: return this.Down;
            case this.Down: return this.Up;
            case this.Right: return this.Left;
            case this.Left: return this.Right;
        }
    }
}