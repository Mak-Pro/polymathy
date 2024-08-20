import { HTMLAttributeAnchorTarget } from "react";

export interface TagProps {
  id: string | number;
  name: string;
  textColor?: string;
  bgColor?: string;
  isRemovable?: boolean;
  onClick?: (val?: string | number) => void;
}

export interface TagSimpleProps {
  id: number | string;
  name: string;
}

export interface ExpertProps {
  id: string | number;
  avatar?: string | null | undefined;
  name: string;
  description?: string;
  hour_price?: number | string;
  tags?: TagSimpleProps[];
  location?: string;
}

export interface FriendProps {
  id: string | number;
  avatar?: string | null | undefined;
  name: string;
  invited_count?: number;
  coins_count?: number;
}

export interface InvitedProps {
  id: string | number;
  first_name: string;
  last_name?: string;
  invites_count: number;
  photo_url?: string | null | undefined;
  username?: string;
}

export interface JobPostProps {
  id: string | number;
  name: string;
  price?: string | number;
  description?: string;
  tags?: TagSimpleProps[];
  applicants_count?: number;
  views_count?: number;
  outerHref?: string;
  expired_date: string;
}

export interface ProfileProps {
  id: number;
  uuid: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  balance?: number;
  posts_count?: number;
  posts?: JobPostProps[];
}

export interface TopControlAreaProps {
  back?: boolean;
  children?: React.ReactNode;
  backHandler?: () => void;
}

type ButtonType = "small" | "medium" | "large";
type ButtonVariant = "text" | "outlined" | "filled";

export interface ButtonProps {
  type?: ButtonType;
  variant?: ButtonVariant;
  href?: string;
  target?: HTMLAttributeAnchorTarget;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  color?: string;
  reset?: boolean;
  submit?: boolean;
}

export interface EndProps {
  icon?: string;
  text: string;
}

export interface ExpanderProps {
  title?: string;
  text?: string;
  className?: string;
  opened: boolean;
}

export interface NoteProps {
  icon?: React.ReactNode;
  text: string | number;
}

export interface TabProps {
  icon?: string;
  text: string;
  link?: string;
  inActive?: boolean;
}

export type StatusBarType = "success" | "loading" | "error" | undefined;

export interface StatusBarProps {
  children: React.ReactNode;
  status?: StatusBarType;
  show: boolean;
}

export interface JobPostDetailsProps {
  id: string | number;
  applicants_count?: number;
  expired_date: string;
  views_count?: number;
  name: string;
  price: string | number;
  tags: TagProps[];
  description?: string;
  is_already_apply: boolean;
  is_yours?: boolean;
  individual?: boolean;
}

export interface JobPostEditProps {
  id: string | number;
  name: string;
  price: string | number;
  tags: TagProps[];
  description: string;
}

export interface SplashScreenProps {
  id: string | number;
  image?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
  title?: string;
}
