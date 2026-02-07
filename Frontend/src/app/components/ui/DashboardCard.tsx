import React, { ReactNode } from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
    actionLabel?: string;
    actionHref?: string;
    onClick?: () => void;
}

export default function DashboardCard({
    title,
    description,
    icon: Icon,
    iconColor = "text-primary",
    iconBgColor = "bg-primary/10",
    actionLabel,
    actionHref,
    onClick
}: DashboardCardProps): React.ReactNode {
    const content = (
        <div className="bg-dark-light/50 border border-white/5 rounded-3xl p-8 hover:border-secondary/30 transition-all group h-full flex flex-col">
            <div className={`w-12 h-12 rounded-2xl ${iconBgColor} flex items-center justify-center mb-6 group-hover:opacity-80 transition-opacity`}>
                <Icon className={`${iconColor} w-6 h-6`} />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-6 flex-grow">{description}</p>

            {actionLabel && (
                <div className="mt-auto">
                    {actionHref ? (
                        <Link href={actionHref} className="text-secondary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            {actionLabel} →
                        </Link>
                    ) : (
                        <button onClick={onClick} className="text-secondary font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                            {actionLabel} →
                        </button>
                    )}
                </div>
            )}
        </div>
    );

    return content;
}
