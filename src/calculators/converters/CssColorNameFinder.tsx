'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, Grid, Alert } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

// The complete standard list of CSS3 extended (named) colors.
const CSS_COLORS: Record<string, string> = {
  aliceblue: '#F0F8FF', antiquewhite: '#FAEBD7', aqua: '#00FFFF', aquamarine: '#7FFFD4',
  azure: '#F0FFFF', beige: '#F5F5DC', bisque: '#FFE4C4', black: '#000000',
  blanchedalmond: '#FFEBCD', blue: '#0000FF', blueviolet: '#8A2BE2', brown: '#A52A2A',
  burlywood: '#DEB887', cadetblue: '#5F9EA0', chartreuse: '#7FFF00', chocolate: '#D2691E',
  coral: '#FF7F50', cornflowerblue: '#6495ED', cornsilk: '#FFF8DC', crimson: '#DC143C',
  cyan: '#00FFFF', darkblue: '#00008B', darkcyan: '#008B8B', darkgoldenrod: '#B8860B',
  darkgray: '#A9A9A9', darkgreen: '#006400', darkgrey: '#A9A9A9', darkkhaki: '#BDB76B',
  darkmagenta: '#8B008B', darkolivegreen: '#556B2F', darkorange: '#FF8C00', darkorchid: '#9932CC',
  darkred: '#8B0000', darksalmon: '#E9967A', darkseagreen: '#8FBC8F', darkslateblue: '#483D8B',
  darkslategray: '#2F4F4F', darkslategrey: '#2F4F4F', darkturquoise: '#00CED1', darkviolet: '#9400D3',
  deeppink: '#FF1493', deepskyblue: '#00BFFF', dimgray: '#696969', dimgrey: '#696969',
  dodgerblue: '#1E90FF', firebrick: '#B22222', floralwhite: '#FFFAF0', forestgreen: '#228B22',
  fuchsia: '#FF00FF', gainsboro: '#DCDCDC', ghostwhite: '#F8F8FF', gold: '#FFD700',
  goldenrod: '#DAA520', gray: '#808080', green: '#008000', greenyellow: '#ADFF2F',
  grey: '#808080', honeydew: '#F0FFF0', hotpink: '#FF69B4', indianred: '#CD5C5C',
  indigo: '#4B0082', ivory: '#FFFFF0', khaki: '#F0E68C', lavender: '#E6E6FA',
  lavenderblush: '#FFF0F5', lawngreen: '#7CFC00', lemonchiffon: '#FFFACD', lightblue: '#ADD8E6',
  lightcoral: '#F08080', lightcyan: '#E0FFFF', lightgoldenrodyellow: '#FAFAD2', lightgray: '#D3D3D3',
  lightgreen: '#90EE90', lightgrey: '#D3D3D3', lightpink: '#FFB6C1', lightsalmon: '#FFA07A',
  lightseagreen: '#20B2AA', lightskyblue: '#87CEFA', lightslategray: '#778899', lightslategrey: '#778899',
  lightsteelblue: '#B0C4DE', lightyellow: '#FFFFE0', lime: '#00FF00', limegreen: '#32CD32',
  linen: '#FAF0E6', magenta: '#FF00FF', maroon: '#800000', mediumaquamarine: '#66CDAA',
  mediumblue: '#0000CD', mediumorchid: '#BA55D3', mediumpurple: '#9370DB', mediumseagreen: '#3CB371',
  mediumslateblue: '#7B68EE', mediumspringgreen: '#00FA9A', mediumturquoise: '#48D1CC', mediumvioletred: '#C71585',
  midnightblue: '#191970', mintcream: '#F5FFFA', mistyrose: '#FFE4E1', moccasin: '#FFE4B5',
  navajowhite: '#FFDEAD', navy: '#000080', oldlace: '#FDF5E6', olive: '#808000',
  olivedrab: '#6B8E23', orange: '#FFA500', orangered: '#FF4500', orchid: '#DA70D6',
  palegoldenrod: '#EEE8AA', palegreen: '#98FB98', paleturquoise: '#AFEEEE', palevioletred: '#DB7093',
  papayawhip: '#FFEFD5', peachpuff: '#FFDAB9', peru: '#CD853F', pink: '#FFC0CB',
  plum: '#DDA0DD', powderblue: '#B0E0E6', purple: '#800080', rebeccapurple: '#663399',
  red: '#FF0000', rosybrown: '#BC8F8F', royalblue: '#4169E1', saddlebrown: '#8B4513',
  salmon: '#FA8072', sandybrown: '#F4A460', seagreen: '#2E8B57', seashell: '#FFF5EE',
  sienna: '#A0522D', silver: '#C0C0C0', skyblue: '#87CEEB', slateblue: '#6A5ACD',
  slategray: '#708090', slategrey: '#708090', snow: '#FFFAFA', springgreen: '#00FF7F',
  steelblue: '#4682B4', tan: '#D2B48C', teal: '#008080', thistle: '#D8BFD8',
  tomato: '#FF6347', turquoise: '#40E0D0', violet: '#EE82EE', wheat: '#F5DEB3',
  white: '#FFFFFF', whitesmoke: '#F5F5F5', yellow: '#FFFF00', yellowgreen: '#9ACD32',
};

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  return [parseInt(clean.slice(0, 2), 16), parseInt(clean.slice(2, 4), 16), parseInt(clean.slice(4, 6), 16)];
}

function colorDistance(hexA: string, hexB: string): number {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

const CssColorNameFinderContent = () => {
  const [query, setQuery] = useState('sky');

  const isHexQuery = /^#?[0-9a-fA-F]{6}$/.test(query.trim());

  const nameMatches = useMemo(() => {
    if (isHexQuery) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return Object.entries(CSS_COLORS).filter(([name]) => name.includes(q));
  }, [query, isHexQuery]);

  const hexMatch = useMemo(() => {
    if (!isHexQuery) return null;
    const hex = ('#' + query.trim().replace('#', '')).toUpperCase();
    const exact = Object.entries(CSS_COLORS).find(([, v]) => v.toUpperCase() === hex);
    if (exact) return { name: exact[0], hex: exact[1], exact: true };
    let closest: [string, string] | null = null;
    let minDist = Infinity;
    for (const entry of Object.entries(CSS_COLORS)) {
      const d = colorDistance(hex, entry[1]);
      if (d < minDist) {
        minDist = d;
        closest = entry;
      }
    }
    return closest ? { name: closest[0], hex: closest[1], exact: false } : null;
  }, [query, isHexQuery]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <TextField
        label="Search by Name or Enter a Hex Code"
        placeholder="e.g. sky, tomato, or #4682B4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
        sx={{ mb: 3 }}
      />

      {isHexQuery && hexMatch && (
        <Paper variant="outlined" sx={{ p: 3, mb: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: 1, border: '1px solid', borderColor: 'divider', bgcolor: hexMatch.hex }} />
          <Box>
            <Typography variant="h6" fontWeight={700}>{hexMatch.name}</Typography>
            <Typography variant="body2" color="text.secondary" fontFamily="monospace">{hexMatch.hex}</Typography>
            {!hexMatch.exact && (
              <Alert severity="info" sx={{ mt: 1 }}>No exact match — this is the closest named color.</Alert>
            )}
          </Box>
        </Paper>
      )}

      {!isHexQuery && query.trim() && nameMatches.length === 0 && (
        <Alert severity="info">No named colors match &quot;{query}&quot;.</Alert>
      )}

      {!isHexQuery && (
        <Grid container spacing={1.5}>
          {nameMatches.map(([name, hex]) => (
            <Grid item xs={6} sm={4} md={3} key={name}>
              <Paper variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                <Box sx={{ width: '100%', height: 40, borderRadius: 1, bgcolor: hex, mb: 1, border: '1px solid', borderColor: 'divider' }} />
                <Typography variant="body2" fontWeight={600}>{name}</Typography>
                <Typography variant="caption" color="text.secondary" fontFamily="monospace">{hex}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

const CssColorNameFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the CSS Color Name Finder</Typography>
      <Typography variant="body1">
        This tool covers the complete standard list of roughly 140 CSS3 named colors — like{' '}
        <code>aliceblue</code>, <code>rebeccapurple</code>, and <code>yellowgreen</code> — each paired with its
        exact hex value. Type part of a color name to filter the list, or enter a hex code to find the exact
        named color that matches it. If no exact match exists, the tool computes color distance and shows the
        closest named color, clearly labeled as a &quot;closest match&quot;.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Typing &quot;sky&quot; filters to <code>skyblue</code> and <code>lightskyblue</code>. Entering{' '}
        <code>#4682B4</code> returns an exact match: <code>steelblue</code>. Entering a hex code like{' '}
        <code>#123456</code> that isn&apos;t one of the 140 standard names instead returns the closest matching
        named color, labeled as such.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the exact CSS keyword for a hex color you want to use in your stylesheet.</li>
          <li>Looking up the hex value behind a named color you&apos;ve seen in someone else&apos;s CSS.</li>
          <li>Finding the closest human-readable name for an arbitrary hex color for documentation purposes.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How many named colors does this cover?</strong> The complete standard CSS3 extended color list — roughly 140 names, from <code>aliceblue</code> through <code>yellowgreen</code>, including near-duplicates like <code>gray</code>/<code>grey</code> pairs.</li>
          <li><strong>What happens if I enter a hex code with no exact named match?</strong> The tool calculates the color distance (in RGB space) between your hex code and every named color, and returns the single closest one, clearly labeled &quot;closest match&quot; rather than an exact one.</li>
          <li><strong>Can I search by hex code without the "#" symbol?</strong> Yes — the tool recognizes a 6-digit hex value whether or not it starts with a "#".</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/converters/css-color-name-finder" content={content}>
      <CssColorNameFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default CssColorNameFinder;
