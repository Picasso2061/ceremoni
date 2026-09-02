import './Badge.css';

export default function Badge({ variant = 'category', children, icon: Icon }) {
  return (
    <span className={`badge badge-${variant}`}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
