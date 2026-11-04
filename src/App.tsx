import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowUpRight, MapPin, Search, SlidersHorizontal, Heart, Sparkles, Utensils,
  Plus, X, Map, Shuffle, ChefHat, Menu, ChevronDown,
  ExternalLink, Pencil, Trash2, Check, LockKeyhole, LogOut
} from 'lucide-react'
import { supabase, hasSupabase } from './lib/supabase'
import { demoEateries } from './data/demo'
import { categories, oldDistricts, type Eatery } from './types'

const money = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
const blank: Omit<Eatery, 'id'> = {
  name: '', category: 'Món Việt', description: '', best_sellers: [], price_min: 0, price_max: 0,
  address: '', ward: '', old_district: 'Quận 1', city: 'TP. Hồ Chí Minh', maps_url: '',
  cover_image: '', gallery: [], note: '', featured: false, active: true
}

export default function App() {
  const [places, setPlaces] = useState<Eatery[]>(demoEateries)
  const [query, setQuery] = useState('')
  const [district, setDistrict] = useState('Tất cả khu vực')
  const [category, setCategory] = useState('Tất cả')
  const [activeTab, setActiveTab] = useState('Khám phá')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selected, setSelected] = useState<Eatery | null>(null)
  const [randomPick, setRandomPick] = useState<Eatery | null>(null)
  const [showAdmin, setShowAdmin] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [form, setForm] = useState(blank)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    if (!supabase) return
    supabase.from('eateries').select('*').eq('active', true).order('created_at', { ascending: false })
      .then(({ data, error }) => { if (!error && data) setPlaces(data as Eatery[]) })
  }, [])

  const filtered = useMemo(() => {
    const source = activeTab === 'Yêu thích' ? places.filter(p => favorites.includes(p.id)) : places
    const q = query.trim().toLocaleLowerCase('vi')
    return source.filter(p => {
      const haystack = [p.name, p.description, p.address, p.ward, p.old_district, p.city, p.category, ...p.best_sellers].join(' ').toLocaleLowerCase('vi')
      return (!q || haystack.includes(q)) &&
        (district === 'Tất cả khu vực' || p.old_district === district) &&
        (category === 'Tất cả' || p.category === category)
    })
  }, [places, query, district, category, activeTab, favorites])

  const toggleFavorite = (id: string) => setFavorites(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  const chooseRandom = () => {
    if (!filtered.length) return
    const current = filtered[Math.floor(Math.random() * filtered.length)]
    setRandomPick(current)
  }

  const login = async () => {
    if (!supabase) { alert('Bạn cần cấu hình Supabase trong file .env trước khi đăng nhập quản trị.'); return }
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPass })
    if (error) { alert(error.message); return }
    setAdmin(true); setShowAdmin(false)
  }
  const logout = async () => { await supabase?.auth.signOut(); setAdmin(false) }

  const saveEatery = async () => {
    if (!form.name.trim() || !form.address.trim() || !form.old_district) { alert('Vui lòng nhập tên quán, địa chỉ và quận cũ.'); return }
    if (imageFile && !supabase) { alert('Cần cấu hình Supabase để tải ảnh lên. Bạn vẫn có thể lưu URL ảnh trong chế độ demo.'); return }
    if (imageFile && (!imageFile.type.startsWith('image/') || imageFile.size > 8 * 1024 * 1024)) { alert('Ảnh phải là tệp hình và dung lượng không quá 8 MB.'); return }
    setBusy(true)
    let coverImage = form.cover_image
    if (imageFile && supabase) {
      const ext = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage.from('foodbook-images').upload(path, imageFile, { upsert: false, contentType: imageFile.type })
      if (uploadError) { alert(`Không tải được ảnh: ${uploadError.message}`); setBusy(false); return }
      coverImage = supabase.storage.from('foodbook-images').getPublicUrl(path).data.publicUrl
    }
    const payload = { ...form, cover_image: coverImage, best_sellers: form.best_sellers.filter(Boolean) }
    if (supabase) {
      const result = editingId
        ? await supabase.from('eateries').update(payload).eq('id', editingId).select().single()
        : await supabase.from('eateries').insert(payload).select().single()
      if (result.error) { alert(result.error.message); setBusy(false); return }
      setPlaces(prev => editingId ? prev.map(p => p.id === editingId ? result.data as Eatery : p) : [result.data as Eatery, ...prev])
    } else {
      const item = { ...payload, id: editingId ?? crypto.randomUUID() } as Eatery
      setPlaces(prev => editingId ? prev.map(p => p.id === editingId ? item : p) : [item, ...prev])
      alert('Đang chạy chế độ xem thử: dữ liệu chỉ lưu tạm trong phiên này. Hãy cấu hình Supabase để lưu trực tuyến.')
    }
    setBusy(false); setShowForm(false); setEditingId(null); setForm(blank); setImageFile(null)
  }
  const editEatery = (p: Eatery) => {
    setEditingId(p.id); setForm({ ...p }); setShowForm(true); setSelected(null)
  }
  const deleteEatery = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa quán này?')) return
    if (supabase) {
      const { error } = await supabase.from('eateries').delete().eq('id', id)
      if (error) { alert(error.message); return }
    }
    setPlaces(prev => prev.filter(p => p.id !== id))
  }
  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#" onClick={() => { setActiveTab('Khám phá'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
        <span className="brand-mark"><Utensils size={19}/></span><span>FOOD<span>BOOK</span><small>THE GOOD TASTE JOURNAL</small></span>
      </a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
        {['Khám phá', 'Bản đồ', 'Yêu thích'].map(item => <button key={item} className={activeTab === item ? 'nav-active' : ''} onClick={() => { setActiveTab(item); setMobileMenu(false); if (item === 'Bản đồ') document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' }) }}>{item}</button>)}
      </nav>
      <div className="top-actions">
        {admin ? <button className="admin-pill" onClick={() => setShowForm(true)}><Plus size={16}/> Thêm quán</button> :
          <button className="admin-link" onClick={() => setShowAdmin(true)}><LockKeyhole size={15}/> Quản trị</button>}
        <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)}><Menu/></button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span/> A CURATED FOOD JOURNAL <span className="eyebrow-line"/></div>
          <h1>Mỗi món ngon<br/>là một <em>cuộc hẹn.</em></h1>
          <p>Lưu lại những địa điểm đáng thử, khám phá hương vị mới và để FOODBOOK chọn giúp bạn những ngày phân vân.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>Khám phá ngay <ArrowUpRight size={17}/></button>
            <button className="btn-quiet" onClick={chooseRandom}><Shuffle size={17}/> Chọn món ngẫu nhiên</button>
          </div>
          <div className="hero-note"><span className="note-dot"/> Một cuốn sổ tay vị giác, được cập nhật liên tục.</div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1400" alt="Món ăn hấp dẫn"/></div>
          <div className="photo-caption"><span>GOOD FOOD, GOOD MOOD</span><b>Find your next<br/>favorite place.</b></div>
          <div className="hero-stamp"><Sparkles size={17}/><span>CURATED<br/>WITH TASTE</span></div>
        </div>
        <div className="hero-bottom"><span>01 / DISCOVER</span><span>SCROLL TO EXPLORE ↓</span><span>EST. 2026</span></div>
      </section>

      <section className="search-panel" id="explore">
        <div className="search-title"><span className="section-kicker">YOUR NEXT DELICIOUS STOP</span><h2>Tìm một nơi <em>thật ngon.</em></h2></div>
        <div className="search-controls">
          <label className="search-box"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm tên quán, món ăn, địa chỉ..."/>{query && <button onClick={() => setQuery('')}><X size={16}/></button>}</label>
          <label className="select-box"><MapPin size={17}/><select value={district} onChange={e => setDistrict(e.target.value)}>{oldDistricts.map(d => <option key={d}>{d}</option>)}</select><ChevronDown size={15}/></label>
          <label className="select-box"><SlidersHorizontal size={17}/><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select><ChevronDown size={15}/></label>
        </div>
        <div className="result-meta"><span><b>{filtered.length.toString().padStart(2, '0')}</b> địa điểm phù hợp</span><span className="filter-hint">Tìm theo tên quán · món ăn · quận cũ</span></div>
      </section>

      <section className="listing-section">
        <div className="section-heading"><div><span className="section-kicker">THE FOODBOOK SELECTION</span><h2>{activeTab === 'Yêu thích' ? 'Góc <em>yêu thích.</em>' : 'Những điểm hẹn <em>đáng thử.</em>'}</h2></div><span className="heading-index">COLLECTION — 01</span></div>
        {filtered.length ? <div className="food-grid">{filtered.map((p, i) => <motion.article className="food-card" key={p.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}>
          <div className="card-image" onClick={() => setSelected(p)}><img src={p.cover_image || 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900'} alt={p.name}/><span className="card-category">{p.category}</span><button className={favorites.includes(p.id) ? 'favorite active' : 'favorite'} onClick={e => { e.stopPropagation(); toggleFavorite(p.id) }}><Heart size={17} fill={favorites.includes(p.id) ? 'currentColor' : 'none'}/></button><span className="image-count">FOODBOOK PICK</span></div>
          <div className="card-content"><div className="card-location"><MapPin size={13}/>{p.old_district} · {p.ward}</div><h3 onClick={() => setSelected(p)}>{p.name}</h3><p>{p.description}</p><div className="best-seller"><span>BEST SELLER</span>{p.best_sellers.slice(0, 3).join(' · ')}</div><div className="card-footer"><b>{money(p.price_min)} – {money(p.price_max)}</b><button onClick={() => setSelected(p)}>Khám phá <ArrowUpRight size={15}/></button></div></div>
        </motion.article>)}</div> : <div className="empty-state"><ChefHat size={35}/><h3>Chưa tìm thấy địa điểm phù hợp</h3><p>Thử đổi từ khóa hoặc bộ lọc khu vực nhé.</p><button onClick={() => { setQuery(''); setDistrict('Tất cả khu vực'); setCategory('Tất cả') }}>Xóa bộ lọc</button></div>}
      </section>

      <section className="random-banner">
        <div className="random-decoration">?</div><div className="random-copy"><span className="section-kicker">CAN'T DECIDE TODAY?</span><h2>Hôm nay ăn <em>gì nhỉ?</em></h2><p>Đôi khi lựa chọn tuyệt nhất là để FOODBOOK quyết định thay bạn.</p><button className="btn-light" onClick={chooseRandom}><Shuffle size={17}/> Chọn ngẫu nhiên cho tôi</button></div>
        <div className="random-art"><div className="plate"><span>YUM!</span><Utensils size={54}/></div><span className="random-orbit orbit-one">LET'S EAT</span><span className="random-orbit orbit-two">GOOD TASTE ONLY</span></div>
      </section>

      <section className="map-section" id="map-section"><div><span className="section-kicker">FIND YOUR WAY</span><h2>Gần bạn, hay <em>một nơi mới?</em></h2><p>Mỗi địa điểm đều có liên kết bản đồ để bạn mở đường đi chỉ với một chạm.</p></div><a className="map-cta" href="https://www.google.com/maps" target="_blank" rel="noreferrer"><Map size={20}/> Mở Google Maps <ArrowUpRight size={17}/></a></section>
    </main>

    <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Utensils size={18}/></span><span>FOOD<span>BOOK</span><small>THE GOOD TASTE JOURNAL</small></span></a><p>Curated places. Memorable tastes.</p><span>© 2026 FOODBOOK</span></footer>

    <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}><motion.div className="detail-modal" initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 25, opacity: 0 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}><X/></button><img className="detail-cover" src={selected.cover_image} alt={selected.name}/><div className="detail-body"><span className="section-kicker">{selected.category} · {selected.old_district}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="detail-row"><b>Món nên thử</b><span>{selected.best_sellers.join(' · ') || 'Chưa cập nhật'}</span></div><div className="detail-row"><b>Giá tham khảo</b><span>{money(selected.price_min)} – {money(selected.price_max)}</span></div><div className="detail-row"><b>Địa chỉ</b><span>{selected.address}, {selected.ward}, {selected.city}</span></div>{selected.note && <div className="detail-note">{selected.note}</div>}<div className="detail-actions"><a className="btn-primary" href={selected.maps_url || 'https://www.google.com/maps'} target="_blank" rel="noreferrer">Chỉ đường <ExternalLink size={16}/></a><button className="btn-outline" onClick={() => toggleFavorite(selected.id)}><Heart size={16}/> {favorites.includes(selected.id) ? 'Đã yêu thích' : 'Yêu thích'}</button>{admin && <><button className="btn-outline" onClick={() => editEatery(selected)}><Pencil size={16}/> Sửa</button><button className="btn-outline" onClick={() => { void deleteEatery(selected.id); setSelected(null) }}><Trash2 size={16}/> Xóa</button></>}</div></div></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{randomPick && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRandomPick(null)}><motion.div className="random-result" initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setRandomPick(null)}><X/></button><span className="section-kicker">FOODBOOK HAS PICKED FOR YOU</span><div className="result-spark"><Sparkles size={25}/></div><h2>Tèn ten! Hôm nay<br/><em>mình ăn ở đây nhé.</em></h2><img src={randomPick.cover_image} alt={randomPick.name}/><span className="card-location"><MapPin size={14}/>{randomPick.old_district}</span><h3>{randomPick.name}</h3><p>{randomPick.best_sellers.join(' · ')}</p><b>{money(randomPick.price_min)} – {money(randomPick.price_max)}</b><div className="detail-actions"><button className="btn-outline" onClick={chooseRandom}><Shuffle size={16}/> Chọn lại</button><button className="btn-primary" onClick={() => { setSelected(randomPick); setRandomPick(null) }}>Xem quán <ArrowUpRight size={16}/></button></div></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{showAdmin && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAdmin(false)}><motion.div className="login-modal" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowAdmin(false)}><X/></button><span className="section-kicker">PRIVATE ACCESS</span><h2>Khu vực <em>quản trị.</em></h2><p>Đăng nhập để quản lý bộ sưu tập FOODBOOK.</p><input type="email" placeholder="Email quản trị" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}/><input type="password" placeholder="Mật khẩu" value={loginPass} onChange={e => setLoginPass(e.target.value)}/><button className="btn-primary full" onClick={login}>Đăng nhập <ArrowUpRight size={16}/></button>{!hasSupabase && <small>Chế độ demo: cần cấu hình Supabase để bật đăng nhập thật.</small>}</motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{showForm && admin && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowForm(false)}><motion.div className="form-modal" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={e => e.stopPropagation()}><div className="form-head"><div><span className="section-kicker">FOODBOOK COLLECTION</span><h2>{editingId ? 'Cập nhật' : 'Thêm'} <em>quán ăn.</em></h2></div><button className="modal-close inline" onClick={() => setShowForm(false)}><X/></button></div><div className="form-grid">
      <label className="wide">Tên quán *<input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Tên quán ăn"/></label>
      <label>Danh mục<select value={form.category} onChange={e => setForm({...form, category:e.target.value})}>{categories.filter(x => x !== 'Tất cả').map(x => <option key={x}>{x}</option>)}</select></label>
      <label>Quận cũ *<select value={form.old_district} onChange={e => setForm({...form, old_district:e.target.value})}>{oldDistricts.filter(x => x !== 'Tất cả khu vực').map(x => <option key={x}>{x}</option>)}</select></label>
      <label className="wide">Địa chỉ cụ thể *<input value={form.address} onChange={e => setForm({...form, address:e.target.value})} placeholder="Số nhà, tên đường"/></label>
      <label>Phường hiện tại<input value={form.ward} onChange={e => setForm({...form, ward:e.target.value})} placeholder="Tên phường"/></label>
      <label>Tỉnh / Thành phố<input value={form.city} onChange={e => setForm({...form, city:e.target.value})} /></label>
      <label>Giá thấp nhất<input type="number" value={form.price_min} onChange={e => setForm({...form, price_min:Number(e.target.value)})}/></label>
      <label>Giá cao nhất<input type="number" value={form.price_max} onChange={e => setForm({...form, price_max:Number(e.target.value)})}/></label>
      <label className="wide">Món best seller (phân cách bằng dấu phẩy)<input value={form.best_sellers.join(', ')} onChange={e => setForm({...form, best_sellers:e.target.value.split(',').map(x=>x.trim())})} placeholder="Món 1, Món 2, Món 3"/></label>
      <label className="wide">Link Google Maps<input value={form.maps_url} onChange={e => setForm({...form, maps_url:e.target.value})} placeholder="https://maps.google.com/..."/></label>
      <label className="wide">Ảnh đại diện (tải lên Supabase Storage)<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setImageFile(e.target.files?.[0] ?? null)}/>{imageFile && <small>{imageFile.name}</small>}<span>Hoặc dán URL ảnh</span><input value={form.cover_image} onChange={e => setForm({...form, cover_image:e.target.value})} placeholder="https://..."/></label>
      <label className="wide">Mô tả<textarea value={form.description} onChange={e => setForm({...form, description:e.target.value})} rows={2}/></label>
      <label className="wide">Ghi chú<textarea value={form.note} onChange={e => setForm({...form, note:e.target.value})} rows={2}/></label>
      <label className="check-label"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured:e.target.checked})}/> Đưa lên nổi bật</label>
    </div><button className="btn-primary full" disabled={busy} onClick={saveEatery}>{busy ? 'Đang lưu...' : 'Lưu quán ăn'} <Check size={17}/></button></motion.div></motion.div>}</AnimatePresence>
    {admin && <button className="logout-fab" onClick={logout}><LogOut size={15}/> Đăng xuất quản trị</button>}
  </div>
}
