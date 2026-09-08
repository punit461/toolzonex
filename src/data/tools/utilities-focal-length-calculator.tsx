import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/focal-length-calculator",
    navName: "Focal Length Calculator",
    navDescription: "Find the focal length needed for a shot.",
    name: "Focal Length Calculator",
    description: "Calculate the focal length needed for a desired field of view, or to frame a subject at a given distance.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Focal Length Calculator - Find the Right Lens Focal Length",
    seoDescription: "Free focal length calculator. Find the focal length needed for a desired field of view and sensor size, or to frame a subject at a known distance.",
    keywords: ["focal length calculator", "camera focal length calculator", "lens focal length calculator", "field of view to focal length", "photography focal length"],
    ogTitle: "Focal Length Calculator - Find the Right Lens Focal Length | ToolZoneX",
    ogDescription: "Find the focal length needed for a desired field of view or subject framing.",
    schemaName: "Focal Length Calculator",
    schemaDescription: "Calculate the focal length required for a desired field of view and sensor size, or subject distance and framing.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from a field-of-view calculator?", answer: "A field-of-view calculator starts from a known focal length and tells you the resulting angle of view. This calculator works the other way: you specify the field of view or framing you want, and it tells you the focal length required to achieve it." }, { question: "Why does sensor size matter?", answer: "A smaller sensor captures a narrower slice of the same lens's image circle, so it needs a shorter focal length than a full-frame sensor to achieve the same field of view — this is often described using a camera's \"crop factor.\"" }, { question: "Which mode should I use?", answer: "Use the field-of-view mode when you know how wide a scene you want to capture. Use the subject-framing mode when you know how far away your subject will be and how large you want it to appear in the frame, such as for wildlife or sports photography." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
