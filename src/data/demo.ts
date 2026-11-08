import type { Eatery } from '../types'

// Dữ liệu minh họa tổng hợp: có cả địa điểm phổ thông và địa điểm có món chay.
export const demoEateries: Eatery[] = [
  {
    id: 'demo-1', name: 'Bếp Nhà Lục Tỉnh', category: 'Món Việt', has_vegetarian_options: true,
    description: 'Mâm cơm miền Tây đậm vị, có lựa chọn món chay và món nhà làm.',
    best_sellers: ['Cá kho tộ', 'Canh chua cá hú', 'Đậu hũ kho nấm'],
    price_min: 55000, price_max: 160000, address: '12 Nguyễn Thị Minh Khai',
    ward: 'Phường Sài Gòn', old_district: 'Quận 1', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Vietnamese+restaurant+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — thay bằng thông tin quán bạn yêu thích.', featured: true, active: true
  },
  {
    id: 'demo-2', name: 'Lẩu Nấm Góc Phố', category: 'Lẩu', has_vegetarian_options: true,
    description: 'Quán lẩu đi nhóm, có cả nước lẩu nấm rau củ và lựa chọn lẩu truyền thống.',
    best_sellers: ['Lẩu nấm rau theo mùa', 'Lẩu bò', 'Đậu hũ non'],
    price_min: 85000, price_max: 220000, address: '58 Nguyễn Thiện Thuật',
    ward: 'Phường Bàn Cờ', old_district: 'Quận 3', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=hotpot+restaurant+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — thay bằng thông tin quán bạn yêu thích.', featured: true, active: true
  },
  {
    id: 'demo-3', name: 'Mì Nhật Kumo', category: 'Món Nhật', has_vegetarian_options: true,
    description: 'Quán mì Nhật với nhiều loại nước dùng và lựa chọn ramen rau nấm.',
    best_sellers: ['Tonkotsu ramen', 'Ramen miso rau nấm', 'Gyoza rau củ'],
    price_min: 65000, price_max: 145000, address: '101 Võ Văn Tần',
    ward: 'Phường Xuân Hòa', old_district: 'Quận 3', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Japanese+restaurant+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — thay bằng thông tin quán bạn yêu thích.', featured: false, active: true
  },
  {
    id: 'demo-4', name: 'Hải Sản Bờ Kè', category: 'Hải sản', has_vegetarian_options: false,
    description: 'Hải sản chế biến tại chỗ, thực đơn phong phú cho những buổi tụ họp.',
    best_sellers: ['Tôm nướng muối ớt', 'Sò điệp mỡ hành', 'Mực hấp gừng'],
    price_min: 120000, price_max: 350000, address: 'Đường Trường Sa',
    ward: 'Phường Gia Định', old_district: 'Bình Thạnh', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=seafood+restaurant+Ho+Chi+Minh+City',
    cover_image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=1000',
    gallery: [], note: 'Dữ liệu minh họa — thay bằng thông tin quán bạn yêu thích.', featured: false, active: true
  }
]
