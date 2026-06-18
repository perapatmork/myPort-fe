import './Button.css';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  icon,
  disabled = false,
  loading = false,
  ...rest
}) {
  const classNames = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    loading && 'btn--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon && <span className="btn__icon">{icon}</span>}
      {children}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classNames} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classNames}
      onClick={!loading && !disabled ? onClick : undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;
