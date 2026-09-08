import FaceIcon from '@mui/icons-material/Face';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/face-shape-detector",
    navName: "Face Shape Detector",
    navDescription: "Find your face shape from a photo.",
    name: "Face Shape Detector",
    description: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <FaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Face Shape Calculator - Detect Your Face Shape Free",
    seoDescription: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Free face shape calculator that runs entirely in your browser.",
    keywords: ["face shape detector", "what is my face shape", "face shape calculator", "find my face shape online", "face measurement tool", "faceshape finder online", "determine face shape online", "face shape calculator female", "face shape calculator online free"],
    ogTitle: "Face Shape Calculator - Detect Your Face Shape Free | ToolZoneX",
    ogDescription: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser.",
    schemaName: "FaceShapeDetector",
    schemaDescription: "Upload a photo to estimate your face shape -- Oval, Round, Square, Heart, Diamond, or Oblong. Runs entirely in your browser.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is my photo uploaded to a server?", answer: "No — face detection and measurement both run entirely in your browser using an on-device model. Your photo never leaves your device." }, { question: "How accurate is this face shape calculator?", answer: "This is a proportion-based estimate, like most face-shape tools (including commercial ones) — it's meant to be informative and fun, not a precise medical or biometric measurement." }, { question: "Why didn't it detect a face?", answer: "Use a clear, front-facing, well-lit photo where your whole face is visible, without sunglasses or heavy shadows." }, { question: "Is this the same as the Omni face shape calculator?", answer: "No — this is ToolZoneX's own free face shape calculator, a separate tool from Omni Calculator's face shape calculator. Both work on the same general idea of estimating a face shape from proportions, but this one runs entirely in your browser using on-device photo measurement rather than manual inputs." }, { question: "Does this work as a face shape calculator for women and men?", answer: "Yes — the measurement is based on facial geometry (length, cheekbone width, jaw width, forehead width), not gender, so it works the same way as a face shape calculator for any face, male or female." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
