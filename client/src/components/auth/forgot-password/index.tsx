"use client";

import toast from "@/components/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import forgotPassword from "@/actions/forgot-password";
import { ForgotPasswordSchema } from "@/schemas/auth";

interface ForgotPasswordProps {
  handleRedirectSignIn: () => void;
}

const ForgotPassword = ({ handleRedirectSignIn }: ForgotPasswordProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    startTransition(() => {
      forgotPassword(values)
        .then(() => {
          toast({
            type: "success",
            message: "Account created successfully",
          });
          handleRedirectSignIn();
        })
        .catch(() => {
          toast({
            type: "error",
            message: "Something went wrong",
          });
        })
        .finally(() => {
          reset();
        });
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        src="/images/vercel.svg"
        alt="Vercel Logo"
        className="dark:invert mb-8"
        width={100}
        height={24}
        priority
      />
      <p className="text-2xl text-black font-semibold mb-4">Forgot Password</p>

      <p className="text-sm mb-10">
        <span className="text-gray-600 font-light">Back to</span>&nbsp;
        <button
          type="button"
          onClick={handleRedirectSignIn}
          className="text-gray-800 font-bold"
        >
          Sign In
        </button>
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Email Address
        </label>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="email"
          placeholder="Email Address"
          {...register("email")}
          disabled={isPending}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="mb-8">
        <button
          className="bg-gray-700 text-white font-normal py-2 px-4 w-full rounded hover:bg-gray-600"
          type="submit"
          disabled={isPending}
        >
          Forgot Password
        </button>
      </div>
    </motion.form>
  );
};

export default ForgotPassword;
