import Razorpay from "razorpay";

let razorpayInstance: Razorpay | null = null;

function getRazorpayInstance(): Razorpay {
  if (razorpayInstance) {
    return razorpayInstance;
  }

  const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
  const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

  if (!RAZORPAY_KEY_ID) {
    throw new Error(
      "RAZORPAY_KEY_ID is required but not set in environment variables. Please configure it in your .env file."
    );
  }

  if (!RAZORPAY_KEY_SECRET) {
    throw new Error(
      "RAZORPAY_KEY_SECRET is required but not set in environment variables. Please configure it in your .env file."
    );
  }

  razorpayInstance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });

  return razorpayInstance;
}

export { getRazorpayInstance };

// Lazy initialization: only create instance when first accessed
export const rz_instance = new Proxy({} as Razorpay, {
  get(_target, prop) {
    const instance = getRazorpayInstance();
    const value = instance[prop as keyof Razorpay];
    // Bind methods to preserve 'this' context
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
