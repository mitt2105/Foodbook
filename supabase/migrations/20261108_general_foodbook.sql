-- Upgrade an existing FOODBOOK V1 vegetarian-only database to the general Foodbook model.
ALTER TABLE public.eateries
  ADD COLUMN IF NOT EXISTS has_vegetarian_options boolean NOT NULL DEFAULT false;

ALTER TABLE public.eateries
  DROP CONSTRAINT IF EXISTS eateries_vegetarian_category_check;

UPDATE public.eateries
SET has_vegetarian_options = true
WHERE category IN (
  'Cơm chay', 'Món Việt chay', 'Lẩu chay', 'Món nước chay',
  'Món Nhật chay', 'Món Hàn chay', 'Ăn vặt chay', 'Cà phê & bánh chay'
);

UPDATE public.eateries
SET category = CASE category
  WHEN 'Cơm chay' THEN 'Cơm'
  WHEN 'Món Việt chay' THEN 'Món Việt'
  WHEN 'Lẩu chay' THEN 'Lẩu'
  WHEN 'Món nước chay' THEN 'Phở & bún'
  WHEN 'Món Nhật chay' THEN 'Món Nhật'
  WHEN 'Món Hàn chay' THEN 'Món Hàn'
  WHEN 'Ăn vặt chay' THEN 'Ăn vặt'
  WHEN 'Cà phê & bánh chay' THEN 'Cà phê & bánh'
  ELSE category
END
WHERE category IN (
  'Cơm chay', 'Món Việt chay', 'Lẩu chay', 'Món nước chay',
  'Món Nhật chay', 'Món Hàn chay', 'Ăn vặt chay', 'Cà phê & bánh chay'
);
