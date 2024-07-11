import { motion } from "framer-motion";
import Image from "next/image";

interface SignUpProps {
  handleRedirectSignIn: () => void;
}

const SignUp = ({ handleRedirectSignIn }: SignUpProps) => {
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
        />
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
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Username
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text"
            placeholder="Username"
          />
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
        />
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
        />
      </div>
      <div className="mb-8">
        <button className="bg-gray-700 text-white font-normal py-2 px-4 w-full rounded hover:bg-gray-600">
          Sign Up
        </button>
      </div>
    </motion.div>
  );
};

export default SignUp;
