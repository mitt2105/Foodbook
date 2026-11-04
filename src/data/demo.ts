import type { Eatery } from '../types'

// Dữ liệu minh họa món chay; thay bằng địa điểm thực tế của bạn khi sử dụng.
export const demoEateries: Eatery[] = [
  {
    id: 'demo-1', name: 'Bếp Chay An Nhiên', category: 'Cơm chay',
    description: 'Mâm cơm chay nhà làm với rau củ theo mùa, đậu hũ và nấm tươi.',
    best_sellers: ['Cơm gạo lứt nấm kho', 'Đậu hũ sốt sả', 'Canh rau củ'],
    price_min: 45000, price_max: 95000, address: '12 Nguyễn Thị Minh Khai',
    ward: 'Phường Sài Gòn', old_district: 'Quận 1', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=vegetarian+food+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — hãy thay bằng quán chay bạn yêu thích.', featured: true, active: true
  },
  {
    id: 'demo-2', name: 'Lẩu Nấm Thuần Chay', category: 'Lẩu chay',
    description: 'Nồi lẩu rau nấm thanh vị, dùng nước hầm rau củ, phù hợp đi cùng bạn bè.',
    best_sellers: ['Lẩu nấm rau theo mùa', 'Đậu hũ non', 'Bún tươi'],
    price_min: 85000, price_max: 180000, address: '58 Nguyễn Thiện Thuật',
    ward: 'Phường Bàn Cờ', old_district: 'Quận 3', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=vegetarian+hotpot+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — hãy thay bằng quán chay bạn yêu thích.', featured: true, active: true
  },
  {
    id: 'demo-3', name: 'Mì Chay Kumo', category: 'Món nước chay',
    description: 'Tô mì rau nấm với nước dùng thực vật, thêm đậu hũ và rau xanh.',
    best_sellers: ['Ramen miso rau nấm', 'Gyoza rau củ', 'Trà lúa mạch'],
    price_min: 55000, price_max: 115000, address: '101 Võ Văn Tần',
    ward: 'Phường Xuân Hòa', old_district: 'Quận 3', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=vegetarian+ramen+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — hãy thay bằng quán chay bạn yêu thích.', featured: false, active: true
  },
  {
    id: 'demo-4', name: 'Bếp Cuốn Xanh', category: 'Món Việt chay',
    description: 'Món cuốn và gỏi chay tươi mát, nhiều rau thơm và nguyên liệu thực vật.',
    best_sellers: ['Gỏi cuốn nấm', 'Gỏi ngó sen chay', 'Chả giò rau củ'],
    price_min: 50000, price_max: 120000, address: 'Đường Trường Sa',
    ward: 'Phường Gia Định', old_district: 'Bình Thạnh', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=vegetarian+restaurant+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — hãy thay bằng quán chay bạn yêu thích.', featured: false, active: true
  }
]
