import clsx from 'clsx';
import css from './Button.module.scss';

interface ButtonProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  selected = false,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(css.btn, { [css.isSelected]: selected })}
      type={type}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
