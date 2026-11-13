import { Avatar } from "@heroui/react";

interface InitialsAvatarProps {
  initials: string;
  name?: string;
  src?: string;
  size?: "sm" | "md";
  className?: string;
}

export function InitialsAvatar({ initials, name, src, size = "md", className = "" }: InitialsAvatarProps) {
  return (
    <Avatar aria-label={name} className={`${size === "sm" ? "size-8" : "size-9"} shrink-0 ${className}`}>
      {src ? <Avatar.Image alt={name ?? initials} src={src} /> : null}
      <Avatar.Fallback className="text-xs font-medium">{initials}</Avatar.Fallback>
    </Avatar>
  );
}
