type TopProducts = {
    id: number,
    name: string,
    category: string,
    times_sold: number
}

type TopProductsByVolume = {
    id: number,
    name: string,
    category: string,
    volume: number
}

export {TopProducts, TopProductsByVolume}