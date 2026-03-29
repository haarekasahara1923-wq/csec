"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const ReferralTracker = () => {
    const searchParams = useSearchParams();
    const ref = searchParams.get("ref");

    useEffect(() => {
        if (ref && ref.startsWith("CSEC-")) {
            // Set cookie for 30 days
            const d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            const expires = "expires=" + d.toUTCString();
            document.cookie = "csec_ref=" + ref + ";" + expires + ";path=/";
            
            // Also store in localStorage for extra persistence
            localStorage.setItem("csec_ref", ref);
        }
    }, [ref]);

    return null;
};
