"use client";

import { UserRoundPen } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
};

type UserEditProps = {
  user: User;
};

export default function UserEdit({ user }: UserEditProps) {
  const [modal, setmodal] = useState(false);

  const toggleModal = () => {
    setmodal(!modal);
  };

  return (
    <article className="flex flex-col">
      <button onClick={toggleModal}>
        <UserRoundPen size={40} />
      </button>
      <AnimatePresence>
        {modal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={toggleModal}
            />

            <motion.section
              initial={{
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
              }}
              animate={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              }}
              exit={{
                clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="bg-white absolute top-[20%] left-[10%] right-[10%] bottom-[10%] rounded-xl z-50 overflow-auto h-screen shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] p-6"
            >
              <div className="flex justify-between">
                <div>Edit</div>
                <button onClick={toggleModal}>Close</button>
              </div>
              <section>
                <div>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                  <p>{user?.role}</p>
                </div>
              </section>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </article>
  );
}
