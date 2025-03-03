/**
 * @param {Number} n
 * @returns Random Integer Between 0 and n-1
 */
export const randomInt = (n: number) => Math.floor(Math.random() * n);

/**
 * @param {Number} n
 * @returns Random Number Between start and end
 */
export const randomIntRange = (start: number, end: number) => Math.random() * (end - start) + start;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @returns String that can be used as a rgb web color
 */
export const rgb = (r: number, g: number, b: number) => `rgba(${r}, ${g}, ${b})`;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @param {Number} a Alpha Value
 * @returns String that can be used as a rgba web color
 */
export const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * @param {Number} h Hue
 * @param {Number} s Saturation
 * @param {Number} l Lightness
 * @returns String that can be used as a hsl web color
 */
export const hsl = (h: number, s: number, l: number) => `hsl(${h}, ${s}%, ${l}%)`;

/**
 * Returns distance from two points
 * @param {Number} p1, p2 Two objects with x and y coordinates
 * @returns Distance between the two points
 */
type Point = {
    x: number;
    y: number;
};
export const getDistance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Checks if two circles are colliding
 * @param {Object} circle1 First circle { x, y, radius }
 * @param {Object} circle2 Second circle { x, y, radius }
 * @returns {Boolean} True if the circles are colliding, otherwise false
 */
type Circle = {
    x: number;
    y: number;
    radius: number;
};
export const isColliding = (circle1: Circle, circle2: Circle) => {
    let distance = getDistance(circle1, circle2);
    return distance < (circle1.radius + circle2.radius);
};


export const pointInBoxCollision = (bx: number, by: number, bw: number, bh: number, px: number, py: number) => {
    return px > bx && px < bx + bw && py > by && py < by + bh;
}