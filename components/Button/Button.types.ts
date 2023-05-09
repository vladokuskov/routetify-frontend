import { IBoolean } from '@/types/global/index.types';

export type Button = {
  variant?: 'text' | 'icon' | 'iconWithText';
  text?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | null;
  full?: IBoolean;
  size?: 'sm1' | 'sm2' | 'sm3' | 'md1' | 'md2' | 'md3' | 'xl1' | 'xl2' | 'xl3';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  isDisabled?: IBoolean;
  status?: 'default' | 'error' | 'success';
  rotate?: IBoolean;
};
