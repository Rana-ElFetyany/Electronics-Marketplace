export interface Review {
  rating: number;
  comment: string;
  date: string; // ISO 8601 format
  reviewerName: string;
  reviewerEmail: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}
export interface Product {
  // Core Properties
  id: number;
  title: string;
  description: string;
  category: 'laptops' | 'tablets' | 'smartphones';
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;

  // Logistics
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Out of Stock' | 'Preorder';

  // Customer Feedback
  reviews: Review[];

  // Policies
  returnPolicy: string;
  minimumOrderQuantity: number;

  // Metadata
  meta: ProductMeta;

  // Media
  images: string[];
  thumbnail: string;

  // Optional: Product-Specific Fields
  color?: string; // For color variants like "Starlight"
  modelYear?: number; // For model years like "2021"
}
// For Laptops (MacBook Pro)
export interface LaptopProduct extends Product {
  category: 'laptops';
  processor?: string; // e.g., "M1 Pro"
  screenSize?: number; // e.g., 14
}

// For Tablets (iPad Mini)
export interface TabletProduct extends Product {
  category: 'tablets';
  hasCellular?: boolean;
  penCompatible?: boolean;
}

// For Smartphones
export interface SmartphoneProduct extends Product {
  category: 'smartphones';
  os?: 'iOS' | 'Android';
  screenSize?: number;
}