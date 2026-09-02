import { Link } from 'react-router-dom';
import {
  Search, ArrowRight, ShieldCheck, CalendarCheck, Star,
  Users, CheckCircle2, Sparkles, ChevronRight
} from 'lucide-react';
import CategoryCard from '../components/CategoryCard';
import VendorCard from '../components/VendorCard';
import categories from '../data/categories';
import vendors from '../data/vendors';
import './HomePage.css';

const stats = [
  { value: '500+', label: 'Verified Vendors' },
  { value: '2,000+', label: 'Events Planned' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const howItWorks = [
  {
    icon: Search,
    title: 'Discover',
    desc: 'Browse verified vendors by category, location, and budget. Read real reviews from past clients.',
  },
  {
    icon: CalendarCheck,
    title: 'Book',
    desc: 'Send booking requests, compare quotes, and secure your preferred vendors for your event date.',
  },
  {
    icon: Sparkles,
    title: 'Celebrate',
    desc: 'Enjoy your perfectly planned event with confidence, knowing every detail is handled by professionals.',
  },
];

const testimonials = [
  {
    quote: 'CereMoni made planning our wedding so much easier. We found all our vendors in one place and the quality was exceptional.',
    author: 'Adaeze & Chinedu',
    event: 'Wedding, Lagos 2026',
    rating: 5,
  },
  {
    quote: 'During a very difficult time, CereMoni connected us with compassionate and professional vendors who handled my father\'s ceremony with dignity.',
    author: 'Tunde Ajayi',
    event: 'Memorial Service, Abuja 2026',
    rating: 5,
  },
  {
    quote: 'The verified vendor system gave us so much peace of mind. Every vendor we booked through CereMoni exceeded our expectations.',
    author: 'Folake & David',
    event: 'Wedding, Port Harcourt 2026',
    rating: 5,
  },
];

export default function HomePage() {
  const featuredVendors = vendors.filter(v => v.featured);

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <div className="hero__badge animate-fade-in-down">
            <ShieldCheck size={14} />
            <span>Nigeria's #1 Trusted Event Marketplace</span>
          </div>
          <h1 className="hero__title animate-fade-in-up">
            Your Perfect Event,{' '}
            <span className="text-gradient">Trusted Vendors</span>
          </h1>
          <p className="hero__subtitle animate-fade-in-up animate-delay-2">
            Connect with verified, top-rated vendors for weddings and ceremonies.
            Plan with confidence, celebrate with joy.
          </p>
          <div className="hero__ctas animate-fade-in-up animate-delay-3">
            <Link to="/vendors?eventType=wedding" className="btn btn-accent btn-lg">
              Plan a Wedding
              <ArrowRight size={18} />
            </Link>
            <Link to="/vendors?eventType=burial" className="btn btn-outline-light btn-lg">
              Plan a Ceremony
            </Link>
          </div>
          <div className="hero__trust animate-fade-in-up animate-delay-5">
            <div className="hero__avatars">
              {['AN', 'TO', 'FK', 'CH', 'EM'].map((initials, i) => (
                <div key={i} className="hero__avatar">{initials}</div>
              ))}
            </div>
            <span>Join 2,000+ happy clients who found their perfect vendors</span>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="stats-bar" id="stats-bar">
        <div className="container stats-bar__grid">
          {stats.map((stat, i) => (
            <div key={i} className="stats-bar__item animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <span className="stats-bar__value">{stat.value}</span>
              <span className="stats-bar__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="section how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How CereMoni Works</h2>
            <p>Three simple steps to your perfect event</p>
            <span className="accent-line" />
          </div>
          <div className="how-it-works__grid">
            {howItWorks.map((step, i) => (
              <div key={i} className="how-it-works__step animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="how-it-works__number">{i + 1}</div>
                <div className="how-it-works__icon-wrap">
                  <step.icon size={28} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section categories-section" id="categories">
        <div className="container">
          <div className="section-header">
            <h2>Browse by Category</h2>
            <p>Find the perfect vendors for every aspect of your event</p>
            <span className="accent-line" />
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} animDelay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Vendors ── */}
      <section className="section featured-section" id="featured-vendors">
        <div className="container">
          <div className="section-header">
            <h2>Featured Vendors</h2>
            <p>Hand-picked, top-rated professionals for your special occasion</p>
            <span className="accent-line" />
          </div>
          <div className="featured-grid">
            {featuredVendors.map((vendor, i) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
          <div className="featured-cta">
            <Link to="/vendors" className="btn btn-primary btn-lg">
              View All Vendors
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section testimonials-section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p>Real stories from real celebrations</p>
            <span className="accent-line" />
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <Star key={j} size={16} fill="var(--color-accent-400)" color="var(--color-accent-400)" />
                  ))}
                </div>
                <blockquote className="testimonial-card__quote">"{t.quote}"</blockquote>
                <div className="testimonial-card__author">
                  <span className="testimonial-card__name">{t.author}</span>
                  <span className="testimonial-card__event">{t.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner" id="cta-banner">
        <div className="container cta-banner__content">
          <h2>Ready to Start Planning?</h2>
          <p>Join thousands of happy clients and find your perfect vendors today.</p>
          <div className="cta-banner__buttons">
            <Link to="/vendors" className="btn btn-accent btn-lg">
              Find Vendors
              <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg">
              Join as a Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
