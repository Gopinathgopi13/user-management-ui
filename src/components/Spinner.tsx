import { Loader } from "lucide-react";

function Spinner({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
      {isLoading && <Loader className="animate-spin w-8 h-8 text-primary" />}
    </div>
  );
}

export default Spinner;
