import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

const slides = [
    {
        id: 'slide1',
        prev: 0,
        next: 1,
        img: 'https://cdn.firstcry.com/education/2022/04/24114827/1026630514.jpg',
        badge: 'Premier Sports Academy',
        title: 'Enjoy Your Summer\nWith Sports',
        subtitle: 'Winning isn\'t everything, but wanting to win is.',
    },
    {
        id: 'slide2',
        prev: 0,
        next: 2,
        img: 'https://www.unesco.org/sites/default/files/shutterstock_599738306.jpg',
        badge: 'Elite Coaching',
        title: 'Pain is Temporary.\nVictory is Forever.',
        subtitle: 'Train with the best. Become the best.',
    },
    {
        id: 'slide3',
        prev: 1,
        next: 3,
        img: 'https://live-production.wcms.abc-cdn.net.au/7236af9487a73ebb646bac7269457feb?impolicy=wcms_crop_resize&cropH=1080&cropW=1918&xPos=1&yPos=0&width=862&height=485',
        badge: 'World Class Training',
        title: 'Hours of Practice\nMake Champions',
        subtitle: 'Develop your skills through focused, professional coaching.',
    },
    {
        id: 'slide4',
        prev: 2,
        next: 0,
        img: 'https://www.brampton.ca/EN/residents/Recreation/PublishingImages/AnnouncementImages/1903_SportsDayImage.jpg',
        badge: 'Join the Zone',
        title: 'Unleash the Best\nAthlete in You',
        subtitle: 'Never doubt yourself. Your potential is limitless.',
    },
];

const Banner = () => {
    const [current, setCurrent] = useState(0);
    const timerRef = useRef(null);

    const goTo = (index) => {
        setCurrent(index);
        resetTimer();
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);
    };

    useEffect(() => {
        resetTimer();
        return () => clearInterval(timerRef.current);
    }, []);

    const slide = slides[current];

    return (
        <div className="relative w-full h-[75vh] md:h-screen overflow-hidden bg-slate-950">
            {/* Background Images */}
            {slides.map((s, i) => (
                <motion.div
                    key={s.id}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === current ? 1 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}>
                    <img
                        src={s.img}
                        alt={s.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            ))}

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
                    <AnimatedContent key={current} slide={slide} goTo={goTo} />
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === current ? 'w-8 bg-orange-500' : 'w-2 bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>

            {/* Nav Arrows */}
            <button
                onClick={() => goTo((current - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass
                           flex items-center justify-center text-white hover:bg-orange-600/80 transition-all duration-200">
                ❮
            </button>
            <button
                onClick={() => goTo((current + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass
                           flex items-center justify-center text-white hover:bg-orange-600/80 transition-all duration-200">
                ❯
            </button>
        </div>
    );
};

const AnimatedContent = ({ slide, goTo }) => (
    <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl">
        <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="badge-brand text-xs uppercase tracking-widest mb-4 inline-flex">
            {slide.badge}
        </motion.span>
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-white leading-[1.05] mb-4"
            style={{ whiteSpace: 'pre-line' }}>
            {slide.title}
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-slate-300 text-lg md:text-xl mb-8 max-w-lg">
            {slide.subtitle}
        </motion.p>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-wrap gap-4">
            <Link to="/classes">
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-brand text-base px-8 py-3.5 shadow-glow-orange">
                    Enroll Now →
                </motion.button>
            </Link>
            <Link to="/instructors">
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-outline-brand text-base px-8 py-3.5">
                    Meet Instructors
                </motion.button>
            </Link>
        </motion.div>
    </motion.div>
);

export default Banner;