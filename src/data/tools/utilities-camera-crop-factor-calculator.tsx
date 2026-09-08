import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/camera-crop-factor-calculator",
    navName: "Camera Crop Factor Calculator",
    navDescription: "Full-frame equivalent focal length by sensor.",
    name: "Camera Crop Factor Calculator",
    description: "Calculate crop factor and full-frame-equivalent focal length from sensor format (or custom diagonal) and lens focal length.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Camera Crop Factor Calculator - Equivalent Focal Length",
    seoDescription: "Free camera crop factor calculator. Select sensor format and focal length to calculate crop factor and full-frame-equivalent focal length.",
    keywords: ["camera crop factor calculator", "full frame equivalent focal length calculator", "aps-c crop factor calculator", "sensor crop factor calculator", "focal length equivalent calculator"],
    ogTitle: "Camera Crop Factor Calculator - Equivalent Focal Length | ToolZoneX",
    ogDescription: "Calculate crop factor and full-frame-equivalent focal length from sensor format and lens focal length.",
    schemaName: "Camera Crop Factor Calculator",
    schemaDescription: "Calculate crop factor as 43.3mm divided by sensor diagonal, and full-frame-equivalent focal length as lens focal length times crop factor.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Circle of Confusion Calculator?", answer: "The Circle of Confusion Calculator is also sensor-format-based, but it's for a completely different purpose — finding the correct circle-of-confusion value used in depth-of-field and hyperfocal distance calculations. This tool is about focal-length equivalence, used for comparing field of view and framing across different sensor sizes." }, { question: "Why do Canon and Nikon/Sony APS-C cameras have different crop factors?", answer: "Canon's APS-C sensors are physically slightly smaller (diagonal ~26.8mm) than Nikon and Sony's APS-C sensors (diagonal ~28.2mm), giving Canon a 1.6x crop factor versus roughly 1.5x for the others, even though both are called \"APS-C.\"" }, { question: "Does crop factor change the lens's actual focal length?", answer: "No — the lens's physical focal length and aperture don't change. Crop factor only describes how much of the lens's image circle the smaller sensor captures, which affects field of view (framing) but not the lens's true optical properties like depth of field at a given aperture." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
