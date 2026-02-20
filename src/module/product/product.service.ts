const products = [
    { id: 1, name: 'Product 1', price: 10.99, categoryId: 1, active: true },
    { id: 2, name: 'Product 2', price: 19.99, categoryId: 1, active: true },
    { id: 3, name: 'Product 3', price: 5.99, categoryId: 2, active: false },
    { id: 4, name: 'Product 4', price: 15.99, categoryId: 2, active: true },
    { id: 5, name: 'Product 5', price: 20.99, categoryId: 3, active: true }
]

export class ProductService {
    async getProducts() {
        return products
    }

    async getProductById(id: number) {
        return products.find(p => p.id === id)
    }

    async createProduct(product: { name: string, price: number, categoryId: number, active: boolean }) {
        const newProduct = { id: products.length + 1, ...product }
        products.push(newProduct)
        return newProduct
    }

    async updateProduct(id: number, product: { name?: string, price?: number, categoryId?: number, active?: boolean }) {
        const existingProduct = products.find(p => p.id === id)
        if (!existingProduct) return null
        Object.assign(existingProduct, product)
        return existingProduct
    }

    async deleteProduct(id: number) {
        const index = products.findIndex(p => p.id === id)
        if (index === -1) return false
        products.splice(index, 1)
        return true
    }
}