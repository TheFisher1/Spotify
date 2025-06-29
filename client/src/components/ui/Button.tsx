import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'play' | 'icon' | 'filter' | 'sidebar';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    icon?: LucideIcon;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'left',
    loading = false,
    fullWidth = false,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        primary: 'bg-green-500 hover:bg-green-400 text-white rounded-full',
        secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white rounded-full',
        outline: 'border border-white hover:border-green-500 hover:text-green-500 text-white rounded-full',
        ghost: 'text-zinc-400 hover:text-white',
        play: 'bg-green-500 hover:bg-green-400 text-black rounded-full shadow-lg hover:scale-105',
        icon: 'text-zinc-400 hover:text-white',
        filter: 'rounded-full px-4 py-1',
        sidebar: 'flex items-center w-full p-2 rounded-md hover:bg-zinc-800'
    };

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-lg'
    };

    const filterActiveClasses = {
        active: 'bg-white text-black',
        inactive: 'bg-zinc-800 text-white'
    };

    const sidebarActiveClasses = {
        active: 'bg-zinc-800 font-semibold',
        inactive: 'hover:bg-zinc-800'
    };

    let finalClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

    if (variant === 'filter') {
        const isActive = className.includes('bg-white');
        finalClasses = `${baseClasses} ${variantClasses.filter} ${isActive ? filterActiveClasses.active : filterActiveClasses.inactive}`;
    }

    if (variant === 'sidebar') {
        const isActive = className.includes('bg-zinc-800') && className.includes('font-semibold');
        finalClasses = `${baseClasses} ${variantClasses.sidebar} ${isActive ? sidebarActiveClasses.active : sidebarActiveClasses.inactive}`;
    }

    if (fullWidth) {
        finalClasses += ' w-full';
    }

    if (className) {
        finalClasses += ` ${className}`;
    }

    const renderIcon = () => {
        if (!Icon || loading) return null;

        const iconClasses = size === 'sm' ? 'h-4 w-4' : size === 'lg' || size === 'xl' ? 'h-6 w-6' : 'h-5 w-5';
        const iconSpacing = iconPosition === 'left' ? 'mr-2' : 'ml-2';

        return <Icon className={`${iconClasses} ${iconSpacing}`} />;
    };

    const renderLoadingSpinner = () => {
        if (!loading) return null;

        return (
            <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        );
    };

    return (
        <button
            className={finalClasses}
            disabled={disabled || loading}
            {...props}
        >
            {loading && renderLoadingSpinner()}
            {!loading && iconPosition === 'left' && renderIcon()}
            {children}
            {!loading && iconPosition === 'right' && renderIcon()}
        </button>
    );
};

export default Button;
