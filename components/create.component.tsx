"use client";

import { createBranch } from "@/app/actions";
import { Button, Card, CardBody, Input, Textarea } from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function CreateComponent() {
  const [state, formAction] = useFormState(createBranch, {
    success: false,
    message: "",
  });
  const [showPassword, setShow] = useState(false);
  return (
    <div>
      <Card>
        <CardBody className="grid border dark:border-0 h-[600px] md:grid-cols-2">
          <div className="flex flex-col justify-center px-16 space-y-5">
            <h4 className="text-xl font-semibold tracking-[-0.04em]">
              Create a branch
            </h4>
            <form
              action={formAction}
              className="flex flex-col items-center gap-5"
            >
              <div className="flex w-full flex-col items-center gap-2.5">
                <Input
                  radius="lg"
                  variant="bordered"
                  size="sm"
                  isRequired
                  required
                  name="name"
                  label="Branch Name"
                />
                <Input
                  radius="lg"
                  variant="bordered"
                  size="sm"
                  isRequired
                  required
                  name="username"
                  label="Username"
                />
                <Input
                  radius="lg"
                  variant="bordered"
                  size="sm"
                  type={showPassword ? "text" : "password"}
                  isRequired
                  required
                  name="password"
                  label="Password"
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShow(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlash size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  }
                />
                <Textarea
                  radius="lg"
                  variant="bordered"
                  size="sm"
                  name="address"
                  label="Address"
                />
                <Input
                  radius="lg"
                  variant="bordered"
                  size="sm"
                  name="phone"
                  label="Phone"
                />
              </div>
              <SubmitButton />
            </form>
          </div>
          <div className="bg-[#1a1a1a] rounded-md"></div>
        </CardBody>
      </Card>
    </div>
  );
}

const SubmitButton = () => {
  const status = useFormStatus();
  return (
    <Button
      type="submit"
      isLoading={status.pending}
      isDisabled={status.pending}
      className="font-medium w-full"
      color="primary"
    >
      Create Branch
    </Button>
  );
};
