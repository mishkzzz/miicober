type LogoProps = {
  size?: number;
  className?: string;
};

// Two rotated rounded rectangles forming the MiiCober mark.
export default function Logo({ size = 28, className }: LogoProps) {
  return (
    <span
      className={className ? `logo-mark ${className}` : 'logo-mark'}
      style={{ width: size, height: size }}
      aria-label="MiiCober mark"
    >
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(-35 16 16)">
          <rect
            x="6"
            y="3"
            width="20"
            height="11"
            rx="5.5"
            fill="currentColor"
          />
          <rect
            x="6"
            y="18"
            width="20"
            height="11"
            rx="5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
        </g>
      </svg>
    </span>
  );
}
