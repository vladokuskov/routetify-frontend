export type TButton = {
  variant?: 'text' | 'icon' | 'iconWithText';
  text?: string;
  icon?: '' | null;
  full?: boolean;
  size?: 'sm1' | 'sm2' | 'sm3' | 'md1' | 'md2' | 'md3' | 'xl1' | 'xl2' | 'xl3';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  status?: 'default' | 'error' | 'success';
  rotate?: boolean;
};
