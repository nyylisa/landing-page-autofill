"use client";
import type { ReactNode } from "react";
import { Settings, User, Wand2 } from "lucide-react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

function IconBox({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600">
      {children}
    </div>
  );
}

export default function ExtensionPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isFilling, setIsFilling] = useState(false);
  const [isClickAnim, setIsClickAnim] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const mock = {
    username: "johndoe",
    email: "john.doe@example.com",
    password: "P@ssw0rd!",
  };

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  async function typeToField(key: keyof typeof mock, text: string) {
    for (let i = 1; i <= text.length; i++) {
      setValues((prev) => ({ ...prev, [key]: text.slice(0, i) }));
      await sleep(50);
    }
    await sleep(200);
  }

  async function handleAutoFill() {
    if (isFilling) return;
    setIsFilling(true);
    setIsClickAnim(true);
    await sleep(220);
    setIsClickAnim(false);

    await typeToField("username", mock.username);
    await typeToField("email", mock.email);
    await typeToField("password", mock.password);

    setIsFilling(false);
  }

  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    let mounted = true;

    (async function loopAutoFill() {
      await sleep(600);

      while (mounted) {
        setIsClickAnim(true);
        await sleep(800);
        setIsClickAnim(false);

        if (!isFilling) {
          handleAutoFill();
        }

        while (mounted && isFilling) {
          await sleep(200);
        }
        if (!mounted) break;

        await sleep(2000);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#1a1f3a] via-[#2d2550] to-[#3d2d5f] overflow-x-hidden">
      <div className="fixed w-full z-50">
        <Header />
      </div>
      <div>
        <h1 className="heading-2 text-center text-white pt-32">
          Extension Preview
        </h1>
      </div>
      <div>
        <motion.section
          // section stays non-interactive so users cannot interact
          className="container mx-auto px-6 py-20 md:py-32 pointer-events-none relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-4xl mx-auto text-center w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden relative">
            <div className="p-4 space-y-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IconBox>
                    <Wand2 size={18} className="text-white" />
                  </IconBox>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Auto Fill Extension
                  </h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Click the button to auto-fill your credentials into fields
                </p>
              </div>

              <div className="space-y-3 relative">
                <div>
                  <motion.button
                    ref={buttonRef as any}
                    onClick={handleAutoFill}
                    className={`text-lg flex items-center justify-center gap-2 p-2 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition`}
                    aria-label="AutoFill"
                    disabled={isFilling}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={
                      isFilling
                        ? {
                            scale: [1, 0.98, 1],
                            boxShadow: "0 12px 40px rgba(99,102,241,0.22)",
                          }
                        : isClickAnim
                        ? { y: -3 }
                        : { y: 0 }
                    }
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                  >
                    <motion.span
                      initial={{ y: 0 }}
                      animate={isClickAnim ? { y: -3 } : { y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center pointer-events-none"
                    >
                      <Wand2 className="w-4 h-4" />
                      <span className="font-semibold">AutoFill</span>
                    </motion.span>

                    <motion.span
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={isFilling ? { opacity: 0 } : { opacity: 1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="absolute -top-3 -left-6 w-6 h-6 bg-white/25 rounded-full blur-xl animate-pulse" />
                      <span className="absolute -bottom-2 -right-6 w-4 h-4 bg-white/20 rounded-full blur-md animate-pulse" />
                    </motion.span>
                  </motion.button>
                </div>

                <div className="space-y-2"></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden mt-10 flex flex-col pointer-events-none">
            <form className="flex justify-center items-center flex-col gap-4 p-4">
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                className="w-60"
                value={values.username}
                readOnly
              />
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-60"
                value={values.email}
                readOnly
              />
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                className="w-60"
                value={values.password}
                readOnly
              />
            </form>
          </div>
        </motion.section>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
