"use client";

import type { User } from "@prisma/client";
import Link from "next/link";
import Button from "@/app/components/buttons/Button";
import H3 from "@/app/components/typography/H3";
import ProductListGrid from "@/app/components/ProductListGrid";
import UserInfo from "@/app/components/UserInfo";
import UserEdit from "@/app/components/UserEdit";
import { ProductWithRelations } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type DashboardProps = {
  user: User;
  products: ProductWithRelations[];
};

export default function Dashboard({ user, products }: DashboardProps) {
  const [modal, setmodal] = useState(false);
  const toggleModal = () => {
    setmodal(!modal);
  };

  return (
    <section className="flex relative flex-col w-full py-12 lg:px-28 rounded-xl gap-8 ">
      <section className="w-full flex justify-between items-center gap-8">
        <Link href="dashboard/createproduct">
          <Button type="button">Create product</Button>
        </Link>
        <H3>Good day {user?.name}!</H3>
        <button onClick={toggleModal}>
          <UserEdit />
          <AnimatePresence>
            {modal && (
              <>
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
                  className="bg-white absolute top-[2%] left-[5%] right-[5%] bottom-[10%] rounded-xl z-50 overflow-auto h-full shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] p-8"
                >
                  <div className="flex justify-end">
                    <button onClick={toggleModal}>Close</button>
                  </div>
                  <section>
                    <UserInfo user={user} />
                  </section>
                </motion.section>
              </>
            )}
          </AnimatePresence>
        </button>
      </section>
      <section className="flex flex-col w-full gap-8">
        <H3>My artwork:</H3>
        <ProductListGrid products={products} user={user} />
      </section>
    </section>
  );
}
