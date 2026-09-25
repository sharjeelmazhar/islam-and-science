import "react";

// Allow typed CSS custom properties in style props: style={{ "--i": 3 }}.
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
