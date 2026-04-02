import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

interface CardProps {
    children: ReactNode;
    className?: string;
    variant?: 'default' | 'glass' | 'glass-strong';
    hover?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className,
    variant = 'default',
    hover = false,
    onClick,
}: CardProps) {
    const variants = {
        default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md',
        glass: 'glass shadow-glass dark:shadow-glass-dark',
        'glass-strong': 'glass-strong shadow-glass dark:shadow-glass-dark',
    };

    const Component = hover || onClick ? motion.div : 'div';
    const motionProps = hover || onClick
        ? {
            whileHover: { scale: 1.02, y: -2 },
            transition: { duration: 0.2 },
        }
        : {};

    return (
        <Component
            className={cn(
                'rounded-xl p-6 transition-shadow duration-200',
                variants[variant],
                hover && 'cursor-pointer',
                className
            )}
            onClick={onClick}
            {...motionProps}
        >
            {children}
        </Component>
    );
}
