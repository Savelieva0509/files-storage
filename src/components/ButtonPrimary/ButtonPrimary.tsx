import css from './ButtonPrimary.module.scss';

interface ButtonPrimaryProps {
  type: 'submit' | 'button';
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  type,
  children,
  width = 'auto',
  ...otherProps
}) => {
  const buttonStyle = {
    width,
  } as React.CSSProperties;
  return (
    <button
      className={css.buttonPrimary}
      type={type}
      {...otherProps}
      style={buttonStyle}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
