import { FaHome, FaInfoCircle, FaCommentDots, FaQuestionCircle, FaEnvelope } from "react-icons/fa";

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
