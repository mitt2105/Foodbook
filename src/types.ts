export type Eatery = {
  id: string
  name: string
  category: string
  has_vegetarian_options: boolean
  description: string
  best_sellers: string[]
  price_min: number
  price_max: number
  address: string
  ward: string
  old_district: string
  city: string
  maps_url: string
  cover_image: string
  gallery: string[]
  note: string
  featured: boolean
  active: boolean
  created_at?: string
}

export const categories = ['Tất cả', 'Món Việt', 'Cơm', 'Phở & bún', 'Lẩu', 'Nướng', 'Hải sản', 'Món Nhật', 'Món Hàn', 'Ăn vặt', 'Cà phê & bánh', 'Khác']
export const oldDistricts = ['Tất cả khu vực', 'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Bình Tân', 'Thủ Đức', 'Bình Chánh', 'Nhà Bè', 'Hóc Môn', 'Củ Chi', 'Cần Giờ']
