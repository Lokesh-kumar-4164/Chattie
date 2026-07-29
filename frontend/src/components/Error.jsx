import { X, WifiOff } from "lucide-react";

function ErrorPopup({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            
            {/* Popup */}
            <div className="relative w-[90%] max-w-md rounded-3xl bg-white p-8 shadow-xl border border-yellow-200">
                
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full bg-yellow-100 p-2 hover:bg-yellow-200"
                >
                    <X size={22} />
                </button>


                {/* Icon */}
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
                    <WifiOff className="text-yellow-500" size={32}/>
                </div>


                <h2 className="text-center text-2xl font-bold text-gray-800">
                    Oops! Something went wrong
                </h2>

                <p className="mt-3 text-center text-gray-500">
                    {message || "Unable to complete your request. Please try again."}
                </p>


                <button
                    onClick={onClose}
                    className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-semibold text-gray-900 hover:bg-yellow-500"
                >
                    Try Again
                </button>

            </div>
        </div>
    );
}

export default ErrorPopup;