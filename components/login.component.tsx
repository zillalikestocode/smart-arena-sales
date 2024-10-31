"use client";

import { login } from "@/app/actions";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useFormState, useFormStatus } from "react-dom";
import image from "../assets/images/login.png";
import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";

export default function LoginComponent() {
  const [state, formAction] = useFormState(login, {
    success: false,
    message: "",
  });
  const [showPassword, setShow] = useState(false);

  return (
    <div className="flex justify-center max-w-6xl p-10 h-full m-auto items-center flex-col">
      <div className="grid bg-[#e9e9e9] h-full p-2.5 rounded-3xl grid-cols-5 items-center">
        <div className="col-span-3">
          <img src={image.src} className="h-full w-full" alt="" />
        </div>

        <form
          autoComplete="off"
          action={formAction}
          className="flex items-center rounded-xl bg-white h-full justify-center px-16 col-span-2 flex-col gap-5"
        >
          <div className="text-center gap-1 flex flex-col items-center">
            <h4 className="font-semibold text-2xl tracking-[-0.04em]">
              Welcome Back
            </h4>
            <p className="text-foreground-500 text-sm">
              Please enter your details
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-2.5">
            <Input
              radius="lg"
              required
              isRequired
              variant="bordered"
              name="username"
              type="username"
              label="Username"
              size="sm"
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
                <button type="button" onClick={() => setShow(!showPassword)}>
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              }
            />
          </div>
          <SubmitButton />
        </form>
      </div>
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
      Login
    </Button>
  );
};
