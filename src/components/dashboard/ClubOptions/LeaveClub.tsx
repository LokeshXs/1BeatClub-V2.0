import { removeMember } from "@/actions/removeMember";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Loader from "@/components/ui/loaders/loader1/Loader";
import { useMusicClubs } from "@/store/useMusicClubs";
import { useUser } from "@clerk/nextjs";
import { IconLogout2 } from "@tabler/icons-react";
import { AnimatePresence } from "motion/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function LeaveClub() {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const removeClub = useMusicClubs((state) => state.removeClub);
  const { user } = useUser();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const quitClubHandler = async () => {
    startTransition(async () => {
      if (!selectedClub || !user) {
        toast.error("Action Failed!");
        return;
      }
      const res = await removeMember({
        clubId: selectedClub?.id,
        userId: user?.id,
      });

      if (res.status === "success") {
        toast.success("Club Quit Successfull");
        setOpenAlertModal(false);
        removeClub(selectedClub);
        router.refresh();
      } else {
        toast.error("Club Quit Failed!");
      }
    });
  };

  return (
    <>
      <Button
        title="Leave Club"
        className=" [&_svg:not([class*='size-'])]:size-4  p-2 group inset-shadow-custom hover:inset-shadow-custom-hover "
        onClick={() => setOpenAlertModal(true)}
      >
        <IconLogout2 />
      </Button>

      <Dialog open={openAlertModal} onOpenChange={setOpenAlertModal}>
        <DialogContent className="  inset-shadow-custom-hover    border border-muted-foreground   py-4 px-0 bg-radial-[80%_80%] from-gradient-start/10 to-background min-h-[200px]  ">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.p
                key="quitting"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                }}
                className="text-center text-base font-semibold bg-gradient-to-r from-gradient-end via-gradient-via to-gradient-end text-transparent bg-clip-text"
              >
                Quitting Club...
              </motion.p>
            ) : (
              <motion.p
                key="sure?"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.3,
                }}
                className="text-center text-base font-semibold bg-gradient-to-r from-gradient-end via-gradient-via to-gradient-end text-transparent bg-clip-text"
              >
                Are you sure?
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className=" flex justify-center"
              >
                <Loader />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className=" space-y-4"
              >
                <p className="text-center">
                  Are you sure. You want to quit the club?
                </p>

                <div className=" flex justify-center items-center gap-4">
                  <Button
                    className=" bg-gradient-to-r from-gradient-start via-gradient-via  to-gradient-end bg-[length:200%_100%] bg-right  cursor-pointer  group  hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500   "
                    onClick={() => quitClubHandler()}
                  >
                    Confirm
                  </Button>

                  <Button
                    className=" bg-red-400"
                    onClick={() => setOpenAlertModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
}
