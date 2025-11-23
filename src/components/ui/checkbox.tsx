"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional label displayed next to the checkbox */
    label?: string;
    /** Tailwind classes for the outer container */
    containerClassName?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, containerClassName, label, ...props }, ref) => {
        return (
            <label className={cn("inline-flex items-center space-x-2", containerClassName)}>
                <input
                    type="checkbox"
                    ref={ref}
                    className={cn(
                        "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary",
                        className
                    )}
                    {...props}
                />
                {label && <span className="text-sm text-muted-foreground">{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
