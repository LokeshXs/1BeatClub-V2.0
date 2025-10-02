import React, { Dispatch, SetStateAction, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { QRCode } from "react-qrcode-logo";
import { useMusicClubs } from "@/store/useMusicClubs";
import { IconCheck, IconCopy } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";

function QrCodeModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const selectedClub = useMusicClubs((state) => state.selectedClub);
  const clubInviteUrl = `http://localhost:3000/club-invite/${selectedClub?.id}`;
  const [copied, setCopied] = useState(false);

  function copyInviteLink(invite: string) {
    navigator.clipboard
      .writeText(invite)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => toast.error("Failed to copy"));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="  inset-shadow-custom-hover    border border-muted-foreground   p-6 bg-radial-[100%_100%_at_50%_0%] from-gradient-start/20 to-background flex flex-col items-center  ">
        <p className=" text-xl max-sm:text-base font-semibold">Scan, Tap, Join the Club 🚀</p>
        <QRCode
          size={200}
          bgColor="transparent"
          fgColor="#e7727b"
          qrStyle="dots"
          value={clubInviteUrl}
        />

        <Button
          onClick={() => {
            copyInviteLink(clubInviteUrl);
          }}
          className=" bg-gradient-to-br from-gradient-start via-gradient-via to-gradient-end flex items-center bg-[length:200%_100%] bg-right  cursor-pointer  group w-full hover:bg-[length:100%_100%] hover:bg-center  transition-all duration-500  "
        >
          Copy Invite Link{" "}
          <div className=" relative w-5 h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className=" absolute"
                >
                  <IconCheck />
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className=" absolute"
                >
                  <IconCopy />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default React.memo(QrCodeModal);
