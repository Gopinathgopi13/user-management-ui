import { Loader } from "lucide-react";

type SpinnerProps = {
  isLoading: boolean;
  fullscreen?: boolean;
};

function Spinner({ isLoading, fullscreen = true }: SpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center bg-white/60 ${
        fullscreen ? "fixed inset-0 z-50" : "absolute inset-0 z-20 rounded-xl"
      }`}
    >
      {isLoading && <Loader className="animate-spin w-8 h-8 text-primary" />}
    </div>
  );
}

export default Spinner;
