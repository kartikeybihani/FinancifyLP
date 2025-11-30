import Image from "next/image";

interface FinnyAvatarProps {
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  className?: string;
}

export default function FinnyAvatar({
  size = "md",
  priority = false,
  className = "",
}: FinnyAvatarProps) {
  const sizeMap = {
    sm: { width: 28, height: 28, containerClass: "w-7 h-7", sizes: "28px" },
    md: {
      width: 32,
      height: 32,
      containerClass: "w-7 h-7 sm:w-8 sm:h-8",
      sizes: "(max-width: 640px) 28px, 32px",
    },
    lg: {
      width: 90,
      height: 90,
      containerClass: "w-12 sm:w-16 h-12 sm:h-16",
      sizes: "(max-width: 640px) 48px, 64px",
    },
  };

  const config = sizeMap[size];

  return (
    <div
      className={`${config.containerClass} shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-[#4A90E2] to-blue-600 flex items-center justify-center ${className}`}
    >
      <Image
        src="/mascot1.jpg"
        alt="Finny Mascot"
        width={config.width}
        height={config.height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={config.sizes}
        className="w-full h-full object-cover scale-x-[-1]"
      />
    </div>
  );
}
