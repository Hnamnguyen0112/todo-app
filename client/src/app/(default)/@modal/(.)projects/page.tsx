"use client";

import Modal from "@/components/modal";
import CreateProject from "@/components/project/create";
import { useRouter } from "next/navigation";

export default function Product() {
  const router = useRouter();

  function onDismiss() {
    router.back();
  }

  return (
    <Modal isOpen={true} setIsOpen={onDismiss} size="4xl">
      <CreateProject />
    </Modal>
  );
}
