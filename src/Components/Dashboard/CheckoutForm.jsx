import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../Hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";

const CheckoutForm = ({ selectedclasses, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [AXIOS] = useAxios();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [cardError, setCardError] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (price > 0) {
            AXIOS.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [price, AXIOS]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setCardError('');
        const { error: methodError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (methodError) {
            setCardError(methodError.message);
            return;
        }

        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'Anonymous User',
                        name: user?.displayName || 'Anonymous User',
                    },
                },
            },
        );

        setProcessing(false);

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (!paymentIntent || paymentIntent.status !== 'succeeded') return;

        setTransactionId(paymentIntent.id);

        const classId = selectedclasses.map(selectedClass => selectedClass.classId);

        const payment = {
            email: user?.email,
            transactionId: paymentIntent.id,
            price,
            date: new Date(),
            quantity: selectedclasses.length,
            status: 'Payment Confirmed! Service Pending....',
            class: selectedclasses.map(selectedClass => selectedClass._id),
            classId,
            className: selectedclasses.map(selectedClass => selectedClass.name),
            classImage: selectedclasses.map(selectedClass => selectedClass.image)
        };

        AXIOS.post('/payment', payment)
            .then(res => {
                if (res.data.result.insertedId && res.data.deleteResult) {
                    AXIOS.patch('/classes-update-enroll', classId)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                Swal.fire({
                                    title: 'Payment Successful!',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    background: '#1e293b',
                                    color: '#f1f5f9',
                                });
                            }
                        });
                }
                navigate('/dashboard/enrolledclass');
            });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 focus-within:border-orange-500 transition-colors">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '15px',
                                color: '#f1f5f9',
                                '::placeholder': {
                                    color: '#64748b',
                                },
                                iconColor: '#fb923c',
                            },
                            invalid: {
                                color: '#ef4444',
                                iconColor: '#ef4444',
                            },
                        },
                    }}
                />
            </div>
            {cardError && <p className="text-red-400 mt-2 text-xs">{cardError}</p>}
            
            <motion.button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                whileHover={(!stripe || !clientSecret || processing) ? {} : { scale: 1.02 }}
                whileTap={(!stripe || !clientSecret || processing) ? {} : { scale: 0.98 }}
                className="w-full mt-4 flex items-center justify-center gap-2 btn-brand py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                <FaLock className="text-xs opacity-70" />
                {processing ? 'Processing Payment...' : `Pay $${price.toFixed(2)}`}
            </motion.button>
            
            {transactionId && (
                <p className="text-green-400 mt-3 text-xs text-center">
                    Payment successful. TXN: {transactionId}
                </p>
            )}
        </form>
    );
};

export default CheckoutForm;
