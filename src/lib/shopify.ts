import { Product } from '@/models/Product';

export class ShopifyAdapter {
  static toShopify(product: Product) {
    return {
      title: product.name,
      body_html: product.description,
      vendor: 'BandayGlam',
      product_type: 'Apparel',
      status: 'active',
      variants: [
        {
          price: product.price.toString(),
          inventory_management: 'shopify',
          inventory_policy: 'deny',
          inventory_quantity: 100,
          requires_shipping: true,
          option1: product.colors[0] || 'Default',
          option2: product.sizes[0] || 'One Size'
        }
      ],
      options: [
        {
          name: 'Color',
          values: product.colors.length > 0 ? product.colors : ['Default']
        },
        {
          name: 'Size',
          values: product.sizes.length > 0 ? product.sizes : ['One Size']
        }
      ]
    };
  }

  static fromShopify(shopifyProduct: any): Product {
    return {
      name: shopifyProduct.title,
      description: shopifyProduct.body_html,
      price: parseFloat(shopifyProduct.variants[0].price),
      image: shopifyProduct.images[0]?.src || '',
      colors: shopifyProduct.options.find((opt: any) => opt.name === 'Color')?.values || [],
      sizes: shopifyProduct.options.find((opt: any) => opt.name === 'Size')?.values || [],
      shopifyId: shopifyProduct.id.toString(),
      createdAt: new Date(shopifyProduct.created_at),
      updatedAt: new Date(shopifyProduct.updated_at)
    };
  }
} 