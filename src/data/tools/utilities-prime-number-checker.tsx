import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/prime-number-checker",
    navName: "Prime Number Checker",
    navDescription: "Check prime or composite.",
    name: "Prime Number Checker",
    description: "Check if a number is a prime number instantly online. Free math utility to find out if a number is prime or composite.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Prime Number Checker - Check Primes Online",
    seoDescription: "Check if a number is a prime number instantly online. Free math utility to find out if a number is prime or composite.",
    keywords: ["prime number checker", "is it prime", "prime calculator", "prime or composite", "prime counter", "prime number counter", "check if number is prime online", "is this number prime"],
    ogTitle: "Prime Number Checker - Check Primes Online | ToolZoneX",
    ogDescription: "Check if a number is a prime number instantly online.",
    schemaName: "Prime Number Checker",
    schemaDescription: "Check if a number is a prime number instantly online.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Is 1 a prime number?", answer: "No — by definition, prime numbers must be greater than 1, so 1 is neither prime nor composite." }, { question: "Is this a prime counter that lists all primes in a range?", answer: "This tool checks one number at a time rather than counting or listing every prime within a range — enter each number you want checked and it instantly reports whether it's prime, plus a factor if it isn't." }, { question: "Is 2 a prime number, since it's even?", answer: "Yes — 2 is prime and is the only even prime number. Every other even number is divisible by 2, which disqualifies it, but 2 itself only has the divisors 1 and 2." }, { question: "What's the largest number this checker can handle?", answer: "It works reliably up to Number.MAX_SAFE_INTEGER (about 9 quadrillion) in the browser. Beyond that, floating-point precision limits make the result unreliable, so the tool shows a warning instead of a potentially wrong answer." }, { question: "Why isn't 0 a prime number?", answer: "0 has infinitely many divisors (every whole number divides evenly into 0), which contradicts the definition of a prime having exactly two divisors — 1 and itself. So 0 is neither prime nor composite." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
