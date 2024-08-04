import css from './ButtonSecondary.module.scss';

interface ButtonSecondaryProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  type,
  children,
  color = '#FFFFFF',
  ...otherProps
}) => {
  return (
    <button
      className={css.buttonSecondary}
      type={type}
      {...otherProps}
      style={{ color }}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
