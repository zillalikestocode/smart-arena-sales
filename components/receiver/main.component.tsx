"use client";
import { createReceiver } from "@/app/actions";
import { Button } from "@nextui-org/button";
import {
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { Receiver } from "@prisma/client";
import { Add } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ReceiverMain({ receivers }: { receivers: Receiver[] }) {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const [state, formAction] = useFormState(createReceiver, {
    success: false,
    message: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [state]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-2xl">Sample Receivers</h4>
        <Button
          onClick={onOpen}
          color="primary"
          radius="full"
          size="sm"
          variant="flat"
          endContent={<Add size={16} />}
        >
          Create
        </Button>
      </div>
      <div className="divide-y mt-5 grid md:grid-cols-y gap-2.5">
        {receivers.map((item, i) => (
          <div key={i} className="py-2.5">
            <h4 className="text-lg font-semibold">{item.fullName}</h4>
            <h4>{item.phoneNumber}</h4>
            <h4 className="text-xs font-semibold text-foreground-500 uppercase">
              {item.address}
            </h4>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form action={formAction}>
              <ModalHeader className="font-semibold tracking-tighter">
                Create Receiver
              </ModalHeader>
              <ModalBody>
                <div className="space-y-2.5">
                  <Input
                    size="sm"
                    name="fullName"
                    label="Full Name"
                    isRequired
                    required
                  />
                  <Input
                    size="sm"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    isRequired
                    required
                  />
                  <Input size="sm" name="address" label="Address" />
                </div>
              </ModalBody>
              <ModalFooter>
                <SubmitButton />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={status.pending}
      isDisabled={status.pending}
      isLoading={status.pending}
      color="primary"
      radius="full"
      className="font-semibold w-full"
    >
      Create
    </Button>
  );
};
