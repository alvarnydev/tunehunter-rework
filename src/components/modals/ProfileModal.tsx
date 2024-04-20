import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { type FC } from "react";
import ProfileMenu from "../interactive/ProfileMenu";
import SignInForm from "../interactive/SignInForm";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ProfileModal: FC<IProps> = ({ open, setOpen }) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div
      className={cn(
        "menu-transition page-container absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center",
        open ? "opacity-100 delay-100" : "pointer-events-none opacity-0 delay-0",
      )}
    >
      {isLoggedIn ? <ProfileMenu setOpen={setOpen} /> : <SignInForm />}
    </div>
  );
};
export default ProfileModal;
