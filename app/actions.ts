"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/config/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const login = async (
  initial: { success: boolean; message: string },
  formData: FormData
) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await signIn("credentials", {
    username,
    password,
    redirect: true,
    redirectTo: "/",
  });

  return { success: true, message: "Login Successful" };
};

export const createBranch = async (
  initial: { success: boolean; message: string },
  formData: FormData
) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const name = formData.get("name") as string;

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.branch.create({
    data: { name, username, address, phone, password: hashedPassword },
  });
  redirect("/");
  return { success: true, message: "Branch Created" };
};

export const logout = async () => {
  await signOut({ redirect: true, redirectTo: "/login" });
};
