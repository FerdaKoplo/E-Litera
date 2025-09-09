import { FaHome, FaInfoCircle, FaCommentDots, FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import { FiMail } from "react-icons/fi"
import { FaWhatsapp, FaInstagram, FaXTwitter } from "react-icons/fa6"

export const NavConstant = [
    {
        icon: <FaHome />,
        label: "Home",
        key: "home",
    },
    {
        icon: <FaInfoCircle />,
        label: "About",
        key: "about",
    },
    {
        icon: <FaCommentDots />,
        label: "Testimoni",
        key: "testimoni",
    },
    {
        icon: <FaQuestionCircle />,
        label: "Faq",
        key: "faq",
    },
    {
        icon: <FaEnvelope />,
        label: "Contact",
        key: "contact",
    },
]

export const Facts = [
    {
        id: "item-1",
        question: "What is E-Litera?",
        answer:
            "E-Litera is a modern digital library platform where you can explore, learn, and access a wide collection of books and resources anytime, anywhere.",
    },
    {
        id: "item-2",
        question: "Why choose E-Litera?",
        answer:
            "We combine accessibility, variety, and simplicity. Whether you’re a student, professional, or just curious, E-Litera makes knowledge easy to reach.",
    },
    {
        id: "item-3",
        question: "Is it free to use?",
        answer:
            "Yes, E-Litera provides free access to a large part of our library, with premium options available for advanced features and exclusive content.",
    },
]

export const Testimonials = [
    {
        id: 1,
        name: "Alice",
        feedback: "Amazing platform! I never thought learning online could be this engaging. The lessons are clear, interactive, and actually keep me motivated to continue. I’ve gained so much confidence in my skills since joining.",
        role: "Student"
    },
    {
        id: 2,
        name: "John",
        feedback: "Helped me learn so much! The content is structured in a way that makes complex topics simple to understand. I really appreciate how supportive the community is, and the projects helped me apply my knowledge in real situations.",
        role: "Developer"
    },
    {
        id: 3,
        name: "Sara",
        feedback: "A must-use app for learners. I’ve tried several platforms before, but none of them felt this personal and well thought out. The combination of practical examples, engaging materials, and accessible design makes learning both fun and effective.",
        role: "Designer"
    },
]

export const FAQ = [
    {
        id: 1,
        question: "What is E-Litera?",
        answer:
            "E-Litera is a digital library platform where you can explore, read, and download books across various topics to support your learning journey.",
    },
    {
        id: 2,
        question: "Is E-Litera free to use?",
        answer:
            "Yes! You can access a wide collection of free books. However, premium content or features may require a subscription in the future.",
    },
    {
        id: 3,
        question: "Can I download books offline?",
        answer:
            "Absolutely. Once downloaded, books can be accessed offline so you can continue learning anytime, anywhere.",
    },
    {
        id: 4,
        question: "Who can use E-Litera?",
        answer:
            "E-Litera is designed for students, professionals, and lifelong learners who want quick and easy access to knowledge.",
    },
    {
        id: 5,
        question: "How often is the library updated?",
        answer:
            "Our library is updated regularly with new resources, ensuring fresh content is always available for your learning needs.",
    },
]


export const ContactConstant = [
    {
        id: 1,
        label: "Email",
        value: "support@elitera.com",
        link: "mailto:support@elitera.com",
        icon: <FiMail />,
    },
    {
        id: 2,
        label: "WhatsApp",
        value: "+62 812-3456-7890",
        link: "https://wa.me/6281234567890",
        icon: <FaWhatsapp />,
    },
    {
        id: 3,
        label: "Instagram",
        value: "@elitera.app",
        link: "https://instagram.com/elitera.app",
        icon: <FaInstagram />,
    },
    {
        id: 4,
        label: "X (Twitter)",
        value: "@elitera_app",
        link: "https://x.com/elitera_app",
        icon: <FaXTwitter />,
    },
]
