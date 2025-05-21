import { Product } from '@prisma/client';

export const products: Omit<Product, 'userId' | 'updatedAt'>[] = [
  {
    id: '1',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation...',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Track your health and fitness with advanced sensors...',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    createdAt: new Date('2024-02-14'),
  },
  {
    id: '3',
    title: 'Ultra-Slim Laptop',
    description: '13-inch lightweight laptop with powerful performance and all-day battery life.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    createdAt: new Date('2024-02-13'),
  },
  {
    id: '4',
    title: 'Wireless Charging Pad',
    description:
      'Fast wireless charging pad compatible with all Qi-enabled devices, featuring LED indicators.',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '5',
    title: 'Smart Home Security Camera',
    description:
      '1080p HD security camera with night vision, two-way audio, and motion detection alerts.',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb',
    createdAt: new Date('2024-02-14'),
  },
  {
    id: '6',
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with customizable keys and premium switches.',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212',
    createdAt: new Date('2024-02-13'),
  },
  {
    id: '7',
    title: 'Portable Power Bank',
    description:
      '20000mAh high-capacity power bank with fast charging support and multiple USB ports.',
    image: 'https://images.unsplash.com/photo-1609592786331-b7f6f1cc2083',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '8',
    title: 'Wireless Gaming Mouse',
    description:
      'Ultra-responsive gaming mouse with customizable DPI settings and ergonomic design.',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db',
    createdAt: new Date('2024-02-14'),
  },
  {
    id: '9',
    title: 'Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour playback time.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
    createdAt: new Date('2024-02-13'),
  },
];
