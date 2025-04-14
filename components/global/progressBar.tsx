"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "components/lib/utils";

/**
 * @name 根据路由变化，显示进度条
 * @returns 进度条
 */
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [scope, animate] = useAnimate();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 路由变化监听
  useEffect(() => {
    const startLoading = () => {
      setProgress(30);
      animate(scope.current, { opacity: 1 }, { duration: 0.3 });
    };

    const completeLoading = () => {
      setProgress(100);
      animate(scope.current, { opacity: 0 }, { duration: 0.5, delay: 0.2 });
      setTimeout(() => setProgress(0), 700);
    };

    startLoading();
    const timeout = setTimeout(completeLoading, 500);

    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // 智能进度模拟
  useEffect(() => {
    if (progress <= 0 || progress >= 100) return;

    const increment = progress < 50 ? 0.8 : 0.3;
    const timer = setInterval(() => {
      setProgress(p => Math.min(p + increment, 95));
    }, 600);

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <motion.div
      ref={scope}
      initial={{ opacity: 0 }}
      className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none"
    >
      <div className="relative h-full overflow-hidden">
        <motion.div
          className={cn(
            "absolute h-full w-full",
            "bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500",
            "shadow-[0_0_10px_2px_rgba(96,165,250,0.3)]"
          )}
          style={{ width: `${progress}%` }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 100,
          }}
        />
        <motion.div
          className="absolute top-0 right-0 h-full w-8 bg-white"
          animate={{
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProgressBar;

