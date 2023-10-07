// collision detection
export function collisionDetection(first: any, second: any): boolean {
    return (
        first.x < second.x + second.width &&
        first.x + first.width > second.x &&
        first.y < second.y + second.height &&
        first.y + first.height > second.y
    )
}

export function getRandomValueFromArray<T>(arr: T[]): T {
    if (!Array.isArray(arr)) {
        throw new Error('Parameter must be an array')
    }
    if (arr.length === 0) {
        throw new Error('Array must not be empty')
    }
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}
