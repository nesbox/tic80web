import React from 'react';
import type { User } from '../types';

interface UserAvatarProps {
  user: User;
  size?: number;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 128, className = '' }) => {
  const defaultAvatar = "AJUlEQVR4nGJ4BwVYGf////+PygAx0RggGpWBaSAxasAAEAAA///oM3hVfkWIyAAAAABJRU5ErkJggg==";

  return (
    <img
      src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAMFBMVEUaHCxdJ12xPlPvfVf/zXWn8HA4t2QlcXkpNm87XclBpvZz7/f09PSUsMJWbIYzPFcHRRrAAAAA${user.avatar || defaultAvatar}`}
      alt={`${user.name} avatar`}
      title={`${user.name} avatar`}
      width={size}
      height={size}
      className={className}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default UserAvatar;
