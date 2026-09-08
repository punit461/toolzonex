import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/algorithm-visualizer",
    navName: "Algorithm Visualizer",
    navDescription: "Watch sorting algorithms in real-time.",
    name: "Sorting Algorithm Visualizer - Learn Sorting Online",
    description: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "Sorting Algorithm Visualizer - Learn Sorting Online",
    seoDescription: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time. Interactive educational tool.",
    keywords: ["sorting algorithm visualizer", "bubble sort visualization", "selection sort", "learn sorting online", "algorithm visualizer", "online sort algorithm", "sorting algorithm visualiser", "algorithm visualizer online", "sort visualizer online", "visualise sorting algorithm"],
    ogTitle: "Sorting Algorithm Visualizer - Learn Sorting Online | ToolZoneX",
    ogDescription: "Visualize how popular sorting algorithms like Bubble Sort and Selection Sort work in real-time. Interactive educational tool.",
    schemaName: "Sorting Algorithm Visualizer",
    schemaDescription: "Visualize how popular sorting algorithms work in real-time.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "Which sorting algorithm is fastest?", answer: "It depends on the input size and data — for large datasets, algorithms like Merge Sort or Quick Sort generally outperform simpler ones like Bubble Sort, which this visualizer helps make visible." }, { question: "Is this an online sort algorithm tool, or do I need to install anything?", answer: "It's fully online — this algorithm visualizer runs entirely in your browser, with nothing to download or install. Just pick an algorithm and press play." }, { question: "Is there a sorting algorithm visualiser with adjustable speed?", answer: "Yes — use the Animation Speed slider to slow the visualiser down and study each comparison and swap step by step, or speed it up to see the full sort complete in a couple of seconds." }, { question: "Is this algorithm visualizer online free to use?", answer: "Yes, it's completely free with no sign-up — generate a new random array and run Bubble Sort, Selection Sort, or Insertion Sort as many times as you like." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
