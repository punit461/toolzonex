'use client';

import { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, Chip } from '@mui/material';
import CasinoIcon from '@mui/icons-material/Casino';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Hobby {
  name: string;
  category: string;
  description: string;
}

const HOBBIES: Hobby[] = [
  { name: 'Painting', category: 'Creative', description: 'Express yourself with acrylics, watercolors, or oils on canvas.' },
  { name: 'Journaling', category: 'Creative', description: 'Reflect on your day and thoughts through regular writing.' },
  { name: 'Photography', category: 'Creative', description: 'Capture interesting moments and scenes with a camera or phone.' },
  { name: 'Pottery', category: 'Creative', description: 'Shape clay into bowls, mugs, and sculptures on a wheel or by hand.' },
  { name: 'Calligraphy', category: 'Creative', description: 'Practice the art of beautiful, stylized handwriting.' },
  { name: 'Songwriting', category: 'Creative', description: 'Write lyrics and melodies for your own original songs.' },
  { name: 'Sketching', category: 'Creative', description: 'Draw quick studies of people, objects, or scenes with pencil.' },
  { name: 'Scrapbooking', category: 'Creative', description: 'Assemble photos and mementos into a personalized keepsake book.' },
  { name: 'Digital Art', category: 'Creative', description: 'Create illustrations and designs using a tablet and software.' },
  { name: 'Woodworking', category: 'Creative', description: 'Build furniture and small projects by hand or with power tools.' },
  { name: 'Knitting', category: 'Creative', description: 'Create scarves, sweaters, and blankets using yarn and needles.' },
  { name: 'Sewing', category: 'Creative', description: 'Make or repair clothing and other fabric projects.' },
  { name: 'Running', category: 'Physical', description: 'Build endurance and clear your head with regular jogs or races.' },
  { name: 'Weightlifting', category: 'Physical', description: 'Build strength and muscle with progressive resistance training.' },
  { name: 'Yoga', category: 'Physical', description: 'Improve flexibility and mindfulness through guided poses and breathing.' },
  { name: 'Swimming', category: 'Physical', description: 'A full-body, low-impact workout in the pool or open water.' },
  { name: 'Cycling', category: 'Physical', description: 'Explore your area or train for distance on a bike.' },
  { name: 'Martial Arts', category: 'Physical', description: 'Learn self-defense and discipline through structured training.' },
  { name: 'Rock Climbing', category: 'Physical', description: 'Challenge your strength and problem-solving on indoor or outdoor walls.' },
  { name: 'Dancing', category: 'Physical', description: 'Learn choreography or freestyle to music for fitness and fun.' },
  { name: 'Pilates', category: 'Physical', description: 'Build core strength and control with low-impact exercises.' },
  { name: 'Table Tennis', category: 'Physical', description: 'A fast-paced racket sport that sharpens reflexes.' },
  { name: 'Hiking', category: 'Outdoor', description: 'Explore trails and nature on foot, from short walks to multi-day treks.' },
  { name: 'Camping', category: 'Outdoor', description: 'Spend nights outdoors with a tent, campfire, and fresh air.' },
  { name: 'Gardening', category: 'Outdoor', description: 'Grow flowers, vegetables, or herbs in your own outdoor space.' },
  { name: 'Birdwatching', category: 'Outdoor', description: 'Observe and identify wild birds in their natural habitats.' },
  { name: 'Fishing', category: 'Outdoor', description: 'Relax by a lake or river while trying to reel in a catch.' },
  { name: 'Stargazing', category: 'Outdoor', description: 'Learn constellations and observe the night sky with or without a telescope.' },
  { name: 'Kayaking', category: 'Outdoor', description: 'Paddle across lakes, rivers, or calm coastal waters.' },
  { name: 'Geocaching', category: 'Outdoor', description: 'Use GPS coordinates to hunt for hidden containers outdoors.' },
  { name: 'Foraging', category: 'Outdoor', description: 'Learn to identify and responsibly collect wild edible plants.' },
  { name: 'Reading', category: 'Indoor', description: 'Escape into fiction or learn something new from nonfiction books.' },
  { name: 'Puzzle Solving', category: 'Indoor', description: 'Work through jigsaw puzzles, crosswords, or brain teasers.' },
  { name: 'Baking', category: 'Indoor', description: 'Practice recipes for bread, cakes, and pastries at home.' },
  { name: 'Cooking', category: 'Indoor', description: 'Experiment with new recipes and cuisines in your kitchen.' },
  { name: 'Meditation', category: 'Indoor', description: 'Practice mindfulness and relaxation techniques daily.' },
  { name: 'Video Gaming', category: 'Indoor', description: 'Play story-driven, competitive, or casual video games.' },
  { name: 'Home Brewing', category: 'Indoor', description: 'Make your own beer, kombucha, or cider at home.' },
  { name: 'Aquarium Keeping', category: 'Indoor', description: 'Design and maintain a home aquarium with fish or plants.' },
  { name: 'Origami', category: 'Indoor', description: 'Fold paper into intricate shapes and figures.' },
  { name: 'Board Games', category: 'Social', description: 'Gather friends or family for strategy, party, or card games.' },
  { name: 'Book Club', category: 'Social', description: 'Read and discuss books together with a group on a regular schedule.' },
  { name: 'Karaoke', category: 'Social', description: 'Sing your favorite songs with friends for a fun night out.' },
  { name: 'Volunteering', category: 'Social', description: 'Give your time to a cause or organization you care about.' },
  { name: 'Trivia Nights', category: 'Social', description: 'Test your general knowledge against others in a team setting.' },
  { name: 'Wine Tasting', category: 'Social', description: 'Explore different wines and learn to identify their flavor notes.' },
  { name: 'Improv Comedy', category: 'Social', description: 'Practice unscripted scenes and games with a group for fun.' },
  { name: 'Language Learning', category: 'Learning', description: 'Study a new language through apps, classes, or immersion.' },
  { name: 'Coding', category: 'Learning', description: 'Build websites, apps, or small programs to solve problems.' },
  { name: 'Chess', category: 'Learning', description: 'Sharpen strategic thinking through one of the oldest board games.' },
  { name: 'Playing an Instrument', category: 'Learning', description: 'Learn guitar, piano, or another instrument at your own pace.' },
  { name: 'Astronomy', category: 'Learning', description: 'Study celestial objects and the science of the universe.' },
  { name: 'Genealogy', category: 'Learning', description: 'Research your family history and build a family tree.' },
  { name: 'Public Speaking', category: 'Learning', description: 'Practice and improve your presentation and speaking skills.' },
  { name: 'Investing', category: 'Learning', description: 'Learn the fundamentals of stocks, funds, and personal finance.' },
  { name: 'Filmmaking', category: 'Creative', description: 'Write, shoot, and edit your own short videos or films.' },
  { name: 'Model Building', category: 'Indoor', description: 'Assemble and paint detailed scale models of vehicles or figures.' },
  { name: 'Skateboarding', category: 'Physical', description: 'Learn tricks and cruise around on a skateboard.' },
  { name: 'Surfing', category: 'Outdoor', description: 'Ride ocean waves on a surfboard, a challenging balance sport.' },
  { name: 'Journaling Bullet Journals', category: 'Creative', description: 'Design a customized planner and tracker system by hand.' },
  { name: 'Podcasting', category: 'Creative', description: 'Record and produce your own audio show on a topic you love.' },
  { name: 'Collecting Coins', category: 'Indoor', description: 'Build a collection of coins from different countries or eras.' },
  { name: 'Beekeeping', category: 'Outdoor', description: 'Maintain hives and harvest honey while supporting pollinators.' },
  { name: 'Archery', category: 'Physical', description: 'Develop focus and precision shooting a bow at a target.' },
  { name: 'Home Improvement', category: 'Indoor', description: 'Tackle DIY repairs and upgrades around your living space.' },
];

function pickRandomSet(): Hobby[] {
  const pool = [...HOBBIES];
  const picks: Hobby[] = [];
  const usedCategories = new Set<string>();

  while (picks.length < 3 && pool.length > 0) {
    // Bias toward spreading across categories, falling back to any remaining hobby.
    const candidates = pool.filter((h) => !usedCategories.has(h.category));
    const source = candidates.length > 0 ? candidates : pool;
    const idx = Math.floor(Math.random() * source.length);
    const chosen = source[idx];
    picks.push(chosen);
    usedCategories.add(chosen.category);
    const poolIdx = pool.findIndex((h) => h.name === chosen.name);
    pool.splice(poolIdx, 1);
  }

  return picks;
}

const RandomHobbyGeneratorContent = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);

  const generate = () => setHobbies(pickRandomSet());

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Button variant="contained" size="large" startIcon={<CasinoIcon />} onClick={generate}>
        {hobbies.length === 0 ? 'Generate Hobbies' : 'Regenerate'}
      </Button>

      {hobbies.length > 0 && (
        <Stack spacing={2} sx={{ width: '100%', maxWidth: 560 }}>
          {hobbies.map((h) => (
            <Paper key={h.name} variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6" fontWeight={700}>{h.name}</Typography>
                <Chip label={h.category} size="small" color="primary" variant="outlined" />
              </Box>
              <Typography variant="body1" color="text.secondary">{h.description}</Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

const RandomHobbyGenerator = () => {
  const content = (
    <>
      <Typography variant="h2">How the Random Hobby Generator Works</Typography>
      <Typography variant="body1">
        Click &quot;Generate Hobbies&quot; and the tool picks 3 random hobbies from a curated list of over
        60, spread across six categories — Creative, Physical, Outdoor, Indoor, Social, and Learning — with a
        short description of each. Click &quot;Regenerate&quot; for a fresh set any time.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        One click might suggest Pottery (Creative), Hiking (Outdoor), and Chess (Learning) — three
        completely different activities to try, spanning different categories.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding a new hobby to try when you feel stuck in a routine.</li>
          <li>Getting icebreaker ideas for conversations or team-building activities.</li>
          <li>Discovering a new interest to pursue after retirement or during a life change.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Can I get the same hobby twice in one click?</strong> No — each click of "Generate Hobbies" picks 3 distinct hobbies without repeats, biased to spread across different categories where possible.</li>
          <li><strong>How many categories are covered?</strong> Six: Creative, Physical, Outdoor, Indoor, Social, and Learning, spanning a wide range of interests from painting to chess to hiking.</li>
          <li><strong>Can I generate more than 3 at a time?</strong> Each click shows 3 hobbies, but you can click "Regenerate" as many times as you like to see more suggestions.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/random-hobby-generator" content={content}>
      <RandomHobbyGeneratorContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default RandomHobbyGenerator;
