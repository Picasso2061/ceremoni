import { Link } from 'react-router-dom';
import './CategoryCard.css';

export default function CategoryCard({ category, animDelay = 0 }) {
  const Icon = category.icon;

  return (
    <Link
      to={`/vendors?category=${category.id}`}
      className="category-card animate-fade-in-up"
      style={{
        animationDelay: `${animDelay}ms`,
        backgroundImage: category.image
          ? `url(${category.image})`
          : category.gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      id={`category-card-${category.id}`}
    >
      {/* Gradient overlay for readability */}
      <div className="category-card__overlay" />
      <div className="category-card__content">
        <div className="category-card__icon">
          <Icon size={32} strokeWidth={1.5} />
        </div>
        <h3 className="category-card__name">{category.name}</h3>
        <p className="category-card__desc">{category.description}</p>
        <span className="category-card__count">{category.count} vendors</span>
      </div>
      <div className="category-card__shine" />
    </Link>
  );
}
