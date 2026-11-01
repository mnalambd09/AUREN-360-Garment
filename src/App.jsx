import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown, ArrowRight, ArrowUpRight, Search, ShoppingBag, Menu, X,
  Plus, Minus, Sun, Moon, Trash2, SlidersHorizontal, MoveUpRight, Rotate3D
} from 'lucide-react';
import FashionScene from './Scene.jsx';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: 'Essential Heavy Hoodie', category: 'Hoodies', price: 89, color: 'Stone', tag: 'BESTSELLER', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Everyday Boxy Tee', category: 'T-Shirts', price: 42, color: 'Washed Black', tag: 'NEW', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Studio Zip Jacket', category: 'Outerwear', price: 128, color: 'Charcoal', tag: 'LIMITED', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Relaxed Utility Pants', category: 'Bottoms', price: 96, color: 'Olive', tag: '', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Core Crew Sweatshirt', category: 'Hoodies', price: 76, color: 'Oat', tag: 'NEW', image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Minimal Logo Cap', category: 'Accessories', price: 34, color: 'Black', tag: '', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'AUREN Premium Hoodie', category: 'Hoodies', price: 110, color: 'Midnight Black', tag: 'EXCLUSIVE', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85' }
];
const categories = ['All', 'Hoodies', 'T-Shirts', 'Outerwear', 'Bottoms', 'Accessories'];

function App() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [dark, setDark] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const rootRef = useRef(null);
  const visibleProducts = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase()))
  ), [category, query]);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const scrollToShop = () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-copy-block > *', { y: 30, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15 });
      gsap.from('.hero-scene-wrap', { opacity: 0, scale: 0.92, duration: 1.35, ease: 'power3.out', delay: 0.25 });
      gsap.utils.toArray('.reveal').forEach(el => gsap.from(el, {
        y: 48, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true }
      }));
      gsap.to('.hero-scene-wrap', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = gsap.utils.toArray('.product-card');
    gsap.fromTo(cards, { y: 25, opacity: 0.45 }, {
      y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out', clearProps: 'all'
    });
  }, [category, query]);

  function addToCart(product) {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...current, { ...product, qty: 1 }];
    });
    setQuickView(null);
    setCartOpen(true);
  }
  function changeQty(id, amount) {
    setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0));
  }

  return <div className={dark ? 'site dark' : 'site light'} ref={rootRef}>
    <div className="announcement">COMPLIMENTARY SHIPPING ON ORDERS OVER $150 <span>✳</span> DESIGNED TO MOVE WITH YOU</div>
    <header className="header">
      <button className="icon-btn mobile-toggle" aria-label="Open menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
      <a className="wordmark" href="#top">AUREN<span>®</span></a>
      <nav className={mobileMenu ? 'nav nav-open' : 'nav'}>
        <a href="#shop" onClick={() => setMobileMenu(false)}>Shop</a><a href="#experience" onClick={() => setMobileMenu(false)}>Experience</a><a href="#story" onClick={() => setMobileMenu(false)}>Our story</a>
      </nav>
      <div className="header-actions">
        {searchOpen && <input className="search-input" autoFocus placeholder="Search pieces..." value={query} onChange={e => { setQuery(e.target.value); scrollToShop(); }} />}
        <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}><Search size={19} /></button>
        <button className="icon-btn theme-btn" aria-label="Toggle theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
        <button className="bag-btn" onClick={() => setCartOpen(true)} aria-label="Open shopping bag"><ShoppingBag size={18} /><span>Bag ({cartCount})</span></button>
      </div>
    </header>

    <main id="top">
      <section className="hero" id="experience">
        <div className="hero-copy-block">
          <p className="eyebrow"><span className="eyebrow-dot" /> THE NEW EVERYDAY UNIFORM — VOL. 01</p>
          <h1>Less, but<br /><em>better.</em></h1>
          <p className="hero-copy">Considered essentials. Elevated silhouettes. Made for the in-between moments that make up your everyday.</p>
          <div className="hero-actions"><button className="primary-btn" onClick={scrollToShop}>Explore collection <ArrowUpRight size={17} /></button><a className="text-link" href="#story">Discover AUREN <ArrowRight size={15} /></a></div>
          <div className="hero-foot"><span>01 / 03</span><span className="hero-foot-line" /><span>CURATED FOR EVERY DAY</span></div>
        </div>
        <div className="hero-scene-wrap">
          <FashionScene />
          <div className="scene-caption"><span>FORM STUDY / 001</span><span>360° OVERSIZED TEE MODEL</span></div>
          <div className="scene-stamp"><span>NEW SEASON</span><strong>01—26</strong><span>OBJECTS OF<br />EVERYDAY</span></div>
          <div className="scene-side-note">SEOUL · EVERYWHERE</div>
          <div className="scene-instruction"><Rotate3D size={14} /> DRAG TO ROTATE · SCROLL TO ZOOM</div>
        </div>
        <a className="scroll-cue" href="#shop"><ArrowDown size={14} /> SCROLL TO EXPLORE</a>
      </section>

      <section className="ticker"><div className="ticker-track">{Array.from({ length: 4 }).map((_, i) => <span key={i}>BUILT FOR THE EVERYDAY <b>✳</b> QUIETLY DIFFERENT <b>✳</b> MADE TO MOVE <b>✳</b></span>)}</div></section>

      <section className="experience-band section-pad reveal">
        <div><p className="eyebrow">AUREN / DIGITAL ATELIER</p><h2>Designed to be<br /><em>experienced.</em></h2><p>Rotate the garment, inspect its silhouette and zoom in for a closer look. A new perspective on everyday essentials.</p><a className="text-link" href="#shop">Explore the collection <ArrowUpRight size={15} /></a></div>
        <div className="experience-orbit"><div className="orbit-core">A.</div><span className="orbit-word">FORM · FUNCTION · FEEL</span></div>
      </section>

      <section className="shop-section section-pad" id="shop">
        <div className="section-heading reveal"><div><p className="eyebrow">THE AUREN EDIT / 001</p><h2>Everyday <em>essentials.</em></h2></div><p className="section-description">A focused collection of pieces you'll reach for, again and again.</p></div>
        <div className="shop-toolbar"><div className="category-list">{categories.map(cat => <button key={cat} className={category === cat ? 'category active' : 'category'} onClick={() => setCategory(cat)}>{cat}</button>)}</div><span className="result-count"><SlidersHorizontal size={14} /> {visibleProducts.length} PIECES</span></div>
        <div className="product-grid">
          {visibleProducts.map((product, index) => <article className="product-card" key={product.id}>
            <div className="product-image" onClick={() => setQuickView(product)} role="button" tabIndex="0" onKeyDown={e => e.key === 'Enter' && setQuickView(product)}>
              <img src={product.image} alt={product.name} loading="lazy" />
              {product.tag && <span className="product-tag">{product.tag}</span>}
              <button className="quick-add" onClick={e => { e.stopPropagation(); addToCart(product); }}>Quick add <Plus size={15} /></button>
              <span className="product-index">0{index + 1}</span>
            </div>
            <div className="product-info"><div><h3>{product.name}</h3><p>{product.color} / {product.category}</p></div><strong>${product.price}</strong></div>
          </article>)}
        </div>
        {visibleProducts.length === 0 && <div className="empty-state">No pieces found. Try another search.</div>}
        <div className="view-all-wrap"><button className="outline-btn" onClick={() => { setCategory('All'); setQuery(''); }}>View all pieces <ArrowUpRight size={16} /></button></div>
      </section>

      <section className="manifesto" id="story">
        <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85" alt="Streetwear editorial campaign" loading="lazy" /></div>
        <div className="manifesto-content"><p className="eyebrow">A NOTE ON LESS</p><h2>Make room<br />for <em>more.</em></h2><p>We believe getting dressed should feel effortless. So we focus on fewer, better things: thoughtful shapes, tactile fabrics and details that earn their place in your wardrobe.</p><a href="#journal" className="text-link">The AUREN point of view <ArrowUpRight size={16} /></a><span className="manifesto-mark">A.</span></div>
      </section>

      <section className="feature-strip" id="journal"><div><span>01 — MATERIAL</span><h3>Feel-good<br />fabric.</h3><p>Soft hand-feel. Considered weight. Everyday comfort.</p></div><div><span>02 — DESIGN</span><h3>Quietly<br />considered.</h3><p>Clean lines and versatile shapes, without the noise.</p></div><div><span>03 — PURPOSE</span><h3>Wear it<br />on repeat.</h3><p>Made to become part of your everyday rotation.</p></div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div><a className="wordmark footer-logo" href="#top">AUREN<span>®</span></a><p>Less, but better. Everyday, elevated.</p></div><div className="footer-links"><a href="#shop">Shop</a><a href="#story">Our story</a><a href="mailto:hello@auren.example">Contact</a><a href="#top">Instagram <MoveUpRight size={13} /></a></div><div className="newsletter"><label htmlFor="email">NOTES FROM AUREN</label><div><input id="email" type="email" placeholder="Your email address" /><button aria-label="Subscribe"><ArrowRight /></button></div><small>Occasional updates. No noise.</small></div></div><div className="footer-bottom"><span>© 2026 AUREN STUDIO</span><span>SEOUL · EVERYWHERE</span><a href="#top">BACK TO TOP ↑</a></div></footer>

    {cartOpen && <div className="overlay" onMouseDown={e => e.target === e.currentTarget && setCartOpen(false)}><aside className="drawer">
      <div className="drawer-head"><div><p className="eyebrow">YOUR SELECTION</p><h2>Shopping bag <span>({cartCount})</span></h2></div><button className="icon-btn" onClick={() => setCartOpen(false)} aria-label="Close bag"><X /></button></div>
      {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={32} /><h3>Your bag is waiting.</h3><p>Find something you'll wear on repeat.</p><button className="primary-btn" onClick={() => { setCartOpen(false); scrollToShop(); }}>Explore collection <ArrowRight size={16} /></button></div> :
        <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt={item.name} /><div className="cart-item-info"><h3>{item.name}</h3><p>{item.color}</p><strong>${item.price}</strong><div className="qty"><button onClick={() => changeQty(item.id, -1)}><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)}><Plus size={13} /></button></div><button className="remove-item" onClick={() => setCart(prev => prev.filter(x => x.id !== item.id))}><Trash2 size={14} /> Remove</button></div></div>)}</div>
          <div className="cart-summary"><div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="primary-btn checkout-btn" onClick={() => alert('Demo store: checkout is not connected yet.')}>Continue to checkout <ArrowRight size={16} /></button></div></>}
    </aside></div>}

    {quickView && <div className="overlay quick-overlay" onMouseDown={e => e.target === e.currentTarget && setQuickView(null)}><div className="quick-modal"><button className="icon-btn close-quick" onClick={() => setQuickView(null)}><X /></button><img src={quickView.image} alt={quickView.name} /><div className="quick-details"><p className="eyebrow">{quickView.category} / AUREN 001</p><h2>{quickView.name}</h2><p>{quickView.color}</p><strong>${quickView.price}</strong><button className="primary-btn" onClick={() => addToCart(quickView)}>Add to bag <ShoppingBag size={16} /></button></div></div></div>}
  </div>;
}

export default App;