import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button";

export function MyDialog() {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>open</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader></DialogHeader>
                    <DialogTitle>你好啊🫲</DialogTitle>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    );
}