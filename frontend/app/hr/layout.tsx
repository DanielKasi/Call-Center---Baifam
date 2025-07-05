"use client";

import hrReducers from "@/app/hr/store/hrReducers";
import { store } from "@/store";
import { useEffect } from "react";



export default function HrLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        // Inject HR reducers into the store
        Object.entries(hrReducers).forEach(([key, reducer]) => {
            console.log(`Adding HR reducer: ${key}`);
            (store as any).reducerManager.add(key, reducer);
            console.log(`\nStore state after adding ${key}:`, (store as any).getState());
        });
    }, []);

    return <>{children}</>;
}   