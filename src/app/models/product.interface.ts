export interface Product {
    title: string,
    description: string,
    sku?: string,
    salePrice: number,
    offerPrice?: number,
    endDateOffer?: string,
    urlImages?: any[]
}