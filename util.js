/**
 * @param {Number} n
 * @returns Random Integer Between 0 and n-1
 */
export const randomInt = n => Math.floor(Math.random() * n);

/**
 * @param {Number} n
 * @returns Random Number Between start and end
 */
export const randomIntRange = (start, end) => Math.random() * (end - start) + start;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @returns String that can be used as a rgb web color
 */
export const rgb = (r, g, b) => `rgba(${r}, ${g}, ${b})`;

/**
 * @param {Number} r Red Value
 * @param {Number} g Green Value
 * @param {Number} b Blue Value
 * @param {Number} a Alpha Value
 * @returns String that can be used as a rgba web color
 */
export const rgba = (r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${a})`;

/**
 * @param {Number} h Hue
 * @param {Number} s Saturation
 * @param {Number} l Lightness
 * @returns String that can be used as a hsl web color
 */
export const hsl = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`;

/**
 * Returns distance from two points
 * @param {Number} p1, p2 Two objects with x and y coordinates
 * @returns Distance between the two points
 */
export const getDistance = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

/**
 * Checks if two circles are colliding
 * @param {Object} circle1 First circle { x, y, radius }
 * @param {Object} circle2 Second circle { x, y, radius }
 * @returns {Boolean} True if the circles are colliding, otherwise false
 */
export const isColliding = (circle1, circle2) => {
    let distance = getDistance(circle1, circle2);
    return distance < (circle1.radius + circle2.radius);
};