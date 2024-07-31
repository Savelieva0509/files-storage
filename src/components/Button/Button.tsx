import css from './Button.module.scss';

interface ButtonProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
    ...otherProps
}) => {
  return (
    <button className={css.button} type={type} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
