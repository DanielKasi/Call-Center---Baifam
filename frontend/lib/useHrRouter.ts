import { useRouter } from "next/navigation";
import { buildHrPath } from "@/lib/buildHrPath";

export function useHrRouter() {
    const router = useRouter();
    return {
        ...router,
        push: (path: string) => router.push(buildHrPath(path)),
        replace: (path: string) => router.replace(buildHrPath(path)),
        // Add more overrides as needed
    };
}
