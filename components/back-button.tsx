"use client";

import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";
import { useRouter } from "next/navigation";

type Props = {
    title: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | undefined | null;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton = ({ title, className, variant, ...props }: Props) => {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            variant={variant}
            className={className}
            {...props}
        >
            {title}
        </Button>
    );
};

export default BackButton;