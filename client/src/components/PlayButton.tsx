import { PlayIcon } from 'lucide-react';

export interface PlayButtonProps {
    onClick: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function PlayButton({
    onClick,
    className = '',
    size = 'md'
}: PlayButtonProps) {
    const sizeClasses = {
        sm: 'p-2',
        md: 'p-3',
        lg: 'p-4'
    };

    const iconSizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8'
    };

    const baseClasses = 'absolute bottom-2 right-2 bg-green-500 hover:bg-green-400 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200';

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${sizeClasses[size]} ${className}`}
        >
            <PlayIcon className={`${iconSizes[size]} text-black`} />
        </button>
    );
};
