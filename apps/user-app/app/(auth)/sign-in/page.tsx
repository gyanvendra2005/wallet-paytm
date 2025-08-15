"use client";
import React, { useState } from "react";
// import { Label } from "../../../components/ui/label";
// import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
// import { useToast } from '@/hooks/use-toast';
// import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
// import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!email || !password) {
            // toast({
            //     title: "Error",
            //     description: "Both email and password are required",
            //     variant: "destructive",
            // });
            setIsSubmitting(false);
            return;
        }

        const response = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        console.log(response);
        console.log("hi");
        
        

        if (response?.error) {
            // toast({
            //     title: "Login Failed",
            //     description: "Invalid Credentials",
            //     variant: "destructive",
            // });
            console.log("failed");
            
        } else {
            console.log("successful");
            
            // toast({
            //     title: "Login Successful",
            //     description: "Welcome back!",
            // });
        }

        if (response?.url) {
            router.replace('/');
        }

        setIsSubmitting(false);
    };

    return (
        <div className="w-full h-auto p-4 shadow-input bg-gradient-to-br from-purple-100 to-purple-200 dark:from-gray-900 dark:to-gray-800">
  <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-6 md:p-8 m-8 shadow-lg bg-white dark:bg-black">
    <h2 className="font-extrabold text-2xl text-center text-neutral-800 dark:text-neutral-200">
      Welcome to PayWallet
    </h2>
    <p className="text-neutral-600 text-center text-sm max-w-sm mt-2 dark:text-neutral-400">
      Sign In to your account to continue using our services. If you don't have an account, <Link href="/sign-up" className="text-purple-600 hover:underline dark:text-purple-400">sign up</Link> now.
    </p>

    <form className="my-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Email Address
        </label>
        <input
          id="email"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700"
          placeholder="projectmayhem@fc.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Password
        </label>
        <input
          id="password"
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-500 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700"
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        className="w-full h-10 flex justify-center items-center text-white bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-lg shadow-md transition-all duration-300 disabled:opacity-50"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? <span>Loading...</span> : "Sign In"}
      </button>
    </form>

    <div className="my-6">
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
    </div>

    <div className="flex flex-col space-y-4">
      {["GitHub", "Google", "Facebook"].map((provider) => (
        <button
          key={provider}
          className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg shadow transition-all duration-300"
          onClick={provider === "Google" ? () => signIn("google") : undefined}
        >
          <span className={`icon-brand-${provider.toLowerCase()} h-4 w-4`} />
          <span className="text-sm">{provider}</span>
        </button>
      ))}
    </div>
  </div>
</div>

    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
