// components/ui/CoinIcon.tsx
// The coin image everywhere a coin amount is shown (guideline section 14:
// "use the coin image, not an emoji"). Shows 🪙 until /public/coins/coin.svg exists.
import AssetImage from "@/components/ui/AssetImage";

export const COIN_IMAGE = "/coins/coin.svg";

export default function CoinIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return <AssetImage src={COIN_IMAGE} fallback="🪙" alt="coins" size={size} className={className} />;
}
