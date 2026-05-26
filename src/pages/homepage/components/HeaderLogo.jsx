import React from "react";

const HeaderLogo = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-4xl font-black text-primary tracking-tighter flex items-center gap-1 justify-center">
        UniPay{" "}
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
      </h1>
    </div>
  );
};

export default HeaderLogo;
