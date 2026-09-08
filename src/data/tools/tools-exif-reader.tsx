import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/exif-reader",
    navName: "EXIF Reader",
    navDescription: "Read image metadata and camera info.",
    name: "EXIF Reader",
    description: "Extract and view EXIF metadata from images. See camera settings, lens information, and photo details instantly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "EXIF Reader - Read Image Metadata Online",
    seoDescription: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
    keywords: ["EXIF reader", "read image metadata", "EXIF data", "image metadata", "camera settings", "GPS coordinates", "photo information", "EXIF viewer", "view exif online", "view exif data online", "check exif data online", "exif viewer online free"],
    ogTitle: "EXIF Reader - Read Image Metadata Online | ToolZoneX",
    ogDescription: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
    schemaName: "EXIF Reader",
    schemaDescription: "Read and display EXIF metadata from images. Free online EXIF reader tool to extract camera settings, GPS coordinates, and image information.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool upload my photo anywhere?", answer: "No — the image and its metadata are read entirely in your browser and never leave your device." }, { question: "Can I view EXIF online without installing any software?", answer: "Yes — this page lets you view exif online directly: just select a photo from your device and the camera settings, timestamp, and GPS data (if present) appear instantly. Nothing to install, no account needed." }, { question: "What image formats does this EXIF viewer support?", answer: "It reads EXIF metadata from JPEG, TIFF, and most RAW-derived formats exported by cameras and phones. PNG and WebP files usually don't carry EXIF data unless it was specifically preserved during export." }, { question: "Why does my photo show no EXIF data?", answer: "Many apps and social platforms strip EXIF data on upload or export for privacy. Screenshots and edited/re-saved images also typically lose their original metadata." }, { question: "Can I see GPS location data from a photo?", answer: "Yes, if the photo has location data embedded (common on smartphones with location services enabled), the latitude and longitude coordinates are displayed alongside the other EXIF fields." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
