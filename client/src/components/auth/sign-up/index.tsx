import signUp from "@/actions/sign-up";
import toast from "@/components/toast";
import { SignUpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignUpProps {
  handleRedirectSignIn: () => void;
}

const SignUp = ({ handleRedirectSignIn }: SignUpProps) => {
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      names: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    startTransition(() => {
      signUp(values)
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
      <p className="text-2xl text-black font-semibold mb-4">
        Create an account
      </p>

      <p className="text-sm mb-10">
        <span className="text-gray-600 font-light">Back to</span>&nbsp;
        <button
          type="button"
          onClick={handleRedirectSignIn}
          className="text-gray-800 font-bold"
        >
          Sign up
        </button>
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Full Name
        </label>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="text"
          placeholder="Full Name"
          {...register("names")}
          disabled={isPending}
        />
        {errors.names && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.names.message}
          </p>
        )}
      </div>
      <div className="mb-4 flex flex-row justify-between gap-x-2">
        <div className="w-1/2">
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
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text"
            placeholder="Username"
            {...register("username")}
            disabled={isPending}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="password"
          placeholder="Password"
          {...register("password")}
          disabled={isPending}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password Confirmation
          </label>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="password"
          placeholder="Password Confirmation"
          {...register("confirmPassword")}
          disabled={isPending}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="mb-8">
        <button
          className="bg-gray-700 text-white font-normal py-2 px-4 w-full rounded hover:bg-gray-600"
          type="submit"
          disabled={isPending}
        >
          Sign Up
        </button>
      </div>
    </motion.form>
  );
};

export default SignUp;
