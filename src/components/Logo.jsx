import React from "react";

const Logo = () => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-black text-primary tracking-tighter flex items-center gap-1 justify-center">
        UniPay{" "}
        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
      </h1>
      <p className="text-muted-foreground text-sm font-medium mt-1">
        Campus Payments Reimagined
      </p>
    </div>
  );
};

export default Logo;
