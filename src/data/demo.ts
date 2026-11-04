import type { Eatery } from '../types'

export const demoEateries: Eatery[] = [
  {
    id: 'demo-1', name: 'Bếp Nhà Lục Tỉnh', category: 'Món Việt',
    description: 'Mâm cơm miền Tây đậm vị, không gian ấm cúng và gần gũi.',
    best_sellers: ['Cá kho tộ', 'Canh chua cá hú', 'Ba rọi cháy cạnh'],
    price_min: 55000, price_max: 160000, address: '12 Nguyễn Thị Minh Khai',
    ward: 'Phường Sài Gòn', old_district: 'Quận 1', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=12+Nguyen+Thi+Minh+Khai+Ho+Chi+Minh',
    cover_image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1000',
    gallery: [], note: 'Gợi ý trải nghiệm bữa trưa cùng bạn bè.', featured: true, active: true
  },
  {
    id: 'demo-2', name: 'Lẩu Bò Góc Phố', category: 'Lẩu',
    description: 'Nồi lẩu bò nóng hổi, nước dùng đậm đà, hợp đi nhóm.',
    best_sellers: ['Lẩu bò thập cẩm', 'Gân bò', 'Đuôi bò hầm'],
    price_min: 90000, price_max: 220000, address: '58 Nguyễn Thiện Thuật',
    ward: 'Phường Bàn Cờ', old_district: 'Quận 3', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Nguyen+Thien+Thuat+Ho+Chi+Minh',
    cover_image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000',
    gallery: [], note: 'Nên đi từ 2–4 người.', featured: true, active: true
  },
  {
    id: 'demo-3', name: 'Mì Nhật Kumo', category: 'Món Nhật',
    description: 'Quán nhỏ chuyên ramen với nước dùng ninh kỹ.',
    best_sellers: ['Tonkotsu ramen', 'Gyoza áp chảo', 'Trà lúa mạch'],
    price_min: 65000, price_max: 145000, address: '101 Võ Văn Tần',
    ward: 'Phường Xuân Hòa', old_district: 'Quận 3', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Vo+Van+Tan+Ho+Chi+Minh',
    cover_image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1000',
    gallery: [], note: 'Phù hợp cho bữa ăn nhanh, gọn.', featured: false, active: true
  },
  {
    id: 'demo-4', name: 'Hải Sản Bờ Kè', category: 'Hải sản',
    description: 'Hải sản chế biến tại chỗ, thực đơn phong phú.',
    best_sellers: ['Tôm nướng muối ớt', 'Sò điệp mỡ hành', 'Mực hấp gừng'],
    price_min: 120000, price_max: 350000, address: 'Đường Trường Sa',
    ward: 'Phường Gia Định', old_district: 'Bình Thạnh', city: 'TP. Hồ Chí Minh',
    maps_url: 'https://www.google.com/maps/search/?api=1&query=Truong+Sa+Binh+Thanh',
    cover_image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=1000',
    gallery: [], note: 'Nên hỏi giá theo thời điểm trước khi gọi món.', featured: false, active: true
  }
]
