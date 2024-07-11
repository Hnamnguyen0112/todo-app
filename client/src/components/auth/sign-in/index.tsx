import Image from "next/image";
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { motion } from "framer-motion";

interface SignInProps {
  handleRedirectSignUp: () => void;
}

export default function SignIn({ handleRedirectSignUp }: SignInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
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
        Sign in to your account
      </p>

      <p className="text-sm mb-10">
        <span className="text-gray-600 font-light">Not a member?</span>&nbsp;
        <button
          type="button"
          onClick={handleRedirectSignUp}
          className="text-gray-800 font-bold"
        >
          Sign up
        </button>
      </p>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Email / Username
        </label>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="email"
          placeholder="Email / Username"
          name="identity"
          id="identity"
        />
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <a href="#" className="text-xs text-gray-500">
            Forget Password?
          </a>
        </div>
        <input
          className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
          type="password"
          placeholder="Password"
          name="password"
          id="password"
        />
      </div>
      <div className="mb-8">
        <button className="bg-gray-700 text-white font-normal py-2 px-4 w-full rounded hover:bg-gray-600">
          Sign In
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <a href="#" className="text-xs text-center text-gray-500 uppercase">
          or continue with
        </a>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>

      <div className="flex justify-between gap-x-4">
        <button className="bg-white text-gray-800 font-normal py-2 px-4 w-1/2 rounded border-1 justify-center flex flex-row gap-x-2 hover:bg-gray-100">
          <FcGoogle className="w-6 h-6" />
          Google
        </button>
        <button className="bg-white text-gray-800 font-normal py-2 px-4 w-1/2 rounded border-1 justify-center flex flex-row gap-x-2 hover:bg-gray-100">
          <FaGithub className="w-6 h-6" />
          Github
        </button>
      </div>
    </motion.div>
  );
}
