import React from 'react';
import clsx from 'clsx'; // Optionally use clsx for conditional class handling

const Button = ({ variant = 'default', size = 'default', className, children, ...props }) => {
  // Define variant styles
  const variantStyles = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white',
    outline: 'border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800',
  };

  // Define size styles
  const sizeStyles = {
    default: 'px-4 py-2',
    icon: 'w-10 h-10 p-0 flex items-center justify-center',
  };

  // Combine styles
  const buttonClasses = clsx(
    'inline-flex items-center justify-start font-medium rounded-md transition-colors duration-200', 
    variantStyles[variant], 
    sizeStyles[size], 
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
