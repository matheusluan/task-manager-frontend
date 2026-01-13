import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Page() {

    return (
        <div className="p-4">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Task</h2>
                    <span className="text-gray-500">Manage your task's here</span>
                </div>

                <Link href="/tasks/create">
                    <Button type="button" size="icon"  /* onClick={deleteUser} disabled={deleting} */>
                        {/*   {deleting ? <Loader2 className="animate-spin" /> : <Trash />} */}
                        <Plus />
                    </Button>
                </Link>
            </div>
        </div>
    )
}