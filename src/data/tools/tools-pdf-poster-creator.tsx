import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/pdf-poster-creator",
    navName: "PDF Poster Creator",
    navDescription: "Tile a PDF page across multiple sheets for poster printing.",
    name: "PDF Poster Creator - Split Page for Poster Printing Online",
    description: "Split a single PDF page across multiple sheets in a 2x2, 3x3, or 4x4 grid — perfect for printing a large poster on a home printer. Free, private, runs entirely in your browser.",
    navCategory: "PDF Tools",
    shellCategory: "Tools",
    icon: <PictureAsPdfIcon fontSize="large" color="primary"/>,
    seoTitle: "PDF Poster Creator - Split Page for Poster Printing Online",
    seoDescription: "Split a single PDF page across multiple sheets for poster printing. Choose 2x2, 3x3, or 4x4 grid. Free online tool.",
    keywords: ["pdf poster", "poster creator pdf", "print poster from pdf", "tile pdf page", "pdf poster printer", "split pdf page for poster", "pdf large print", "pdf poster maker", "print large pdf on multiple pages", "pdf banner printer", "tile pdf for printing", "pdf poster tiler", "pdf poster splitter", "pdf poster printing tool", "print poster from pdf free", "pdf large format printer", "pdf tile multiple pages", "pdf poster grid tool", "pdf oversized print tool", "pdf poster assembly", "pdf wall art printer", "pdf poster from single page", "split pdf page into tiles", "print poster at home pdf", "pdf poster maker online free", "tile pdf page for poster printing online free"],
    ogTitle: "PDF Poster Creator - Split Page for Poster Printing Online | ToolZoneX",
    ogDescription: "Split a single PDF page across multiple sheets for poster printing. 2x2, 3x3, or 4x4 grids. Free, private, runs in your browser.",
    schemaName: "PDF Poster Creator",
    schemaDescription: "Split a single PDF page across multiple sheets for poster printing.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does this use only the first page?", answer: "Yes — the poster is created from the first page of the uploaded PDF." }, { question: "How do I assemble the printed tiles?", answer: "Print all pages, then arrange them in grid order (top-left first) and tape or glue the edges together." }, { question: "Is my file uploaded anywhere?", answer: "No — all processing is done entirely in your browser." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
