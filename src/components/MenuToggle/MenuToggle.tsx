import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MenuToggleProps {
}
export  const  MenuToggle : React.FC<MenuToggleProps> = ({
}) => {
  return(
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 px-0">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetFooter>
          <SheetClose asChild>
            <Button >Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
