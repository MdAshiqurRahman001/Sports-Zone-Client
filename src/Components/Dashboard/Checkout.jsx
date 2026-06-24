import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import useSelectedClasses from "../../Hooks/useSelectedClasses";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const Checkout = () => {

    const [selectedclasses] = useSelectedClasses();
    const total = selectedclasses.reduce((sum, classs) => sum + classs.price, 0);
    const price = parseFloat(total.toFixed(2));

    return (
        <div className="w-full">
            <Helmet>
                <title>Sports Zone | Payment</title>
            </Helmet>
            <h1 className="text-2xl text-center font-bold mb-10">Confirm Your Payment</h1>

            <div className="mx-44">
                <Elements stripe={stripePromise}>
                    <CheckoutForm selectedclasses={selectedclasses} price={price}></CheckoutForm>
                </Elements>
            </div>

        </div>
    );
};

export default Checkout;