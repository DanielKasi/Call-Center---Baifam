import Link, { LinkProps } from "next/link";
import { buildHrPath } from "@/lib/buildHrPath";
import React from "react";

export type HrLinkProps = LinkProps & {
    children: React.ReactNode;
    className?: string;
};

export function HrLink({ href, children, className, ...props }: HrLinkProps) {
    const builtHref =
        typeof href === "string"
            ? buildHrPath(href)
            : { ...href, pathname: href && buildHrPath(href.pathname ?? "") };
    return (
        <Link href={builtHref} className={className} {...props}>
            {children}
        </Link>
    );
}
