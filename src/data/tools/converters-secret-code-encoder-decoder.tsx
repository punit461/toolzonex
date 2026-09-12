import VpnKeyIcon from '@mui/icons-material/VpnKey';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/secret-code-encoder-decoder",
    navName: "Secret Code Encoder/Decoder",
    navDescription: "Convert text to numbers (A=1, B=2...) and back.",
    name: "Secret Code Encoder/Decoder - A1Z26 Cipher",
    description: "Encode text into numbers (A=1, B=2, ... Z=26) or decode a number sequence back into text, using the classic A1Z26 substitution cipher.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <VpnKeyIcon fontSize="large" color="primary"/>,
    seoTitle: "Secret Code Encoder/Decoder - Free A1Z26 Cipher Tool",
    seoDescription: "Free secret code encoder and decoder using the A1Z26 cipher (A=1, B=2...Z=26). Encode text to numbers or decode numbers back to text instantly.",
    keywords: ["secret code generator", "secret message encoder", "secret message decoder", "a1z26 cipher", "number cipher translator"],
    ogTitle: "Secret Code Encoder/Decoder - Free A1Z26 Cipher Tool | ToolZoneX",
    ogDescription: "Encode text to numbers or decode numbers back to text instantly.",
    schemaName: "Secret Code Encoder/Decoder",
    schemaDescription: "Encode text into numbers (A=1, B=2, ... Z=26) or decode a number sequence back into text.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Why does this need separate Encode and Decode modes, unlike ROT13?", answer: "ROT13 is self-inverse — applying it twice returns the original text, so one box can handle both directions. This number cipher isn't self-inverse: turning \"HI\" into \"8 9\" and then treating \"8 9\" as more letters to encode would produce nonsense, so an explicit mode toggle is required to pick the correct direction." }, { question: "What happens to spaces and punctuation?", answer: "A space in your original text becomes a forward slash (\"/\") in the encoded output so word boundaries aren't lost, and any other character (punctuation, digits) passes through unchanged as its own token in the sequence." }, { question: "Is this cipher secure?", answer: "No — like ROT13, this is a simple, well-known substitution meant for casual fun and puzzles, not real security. Anyone familiar with the A=1, B=2 convention can decode it instantly." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
