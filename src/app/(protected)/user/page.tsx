"use client";

import { userStore } from "@/lib/stores/user.store";

export default function Page() {
    const { user } = userStore()
    return (
        <section className="bg-background rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Welcome back, {user?.name}!!</h2>
                    <span className="text-gray-500">Find your most important tasks</span>
                </div>
            </div>


        </section>
    );
}
