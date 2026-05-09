"use server";

import prisma from "@/lib/prisma";
import { auth, signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function toggleSaveCollege(collegeId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("You must be logged in to save colleges.");
  }

  const userId = session.user.id;

  const existing = await prisma.savedCollege.findUnique({
    where: {
      userId_collegeId: { userId, collegeId },
    },
  });

  if (existing) {
    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: { userId, collegeId },
      },
    });
  } else {
    await prisma.savedCollege.create({
      data: { userId, collegeId },
    });
  }

  revalidatePath("/saved");
  revalidatePath(`/colleges/${collegeId}`);
}

export async function registerUser(formData: FormData) {
  console.log("--- Registering User Start ---");
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    console.log("Error: Missing fields");
    return { error: "Please fill all fields" };
  }

  console.log("Checking for existing user:", email);
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Error: User already exists");
    return { error: "User already exists" };
  }

  console.log("Hashing password...");
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Creating user in database...");
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  console.log("--- Registering User Success ---");
  return { success: "Account created! You can now login." };
}


export async function loginUser(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}
