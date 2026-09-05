'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, Paper, Stack, TextField, IconButton, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface Song {
  id: number;
  title: string;
  artist: string;
  notes: string;
}

let nextId = 1;
const makeSong = (): Song => ({ id: nextId++, title: '', artist: '', notes: '' });

const PlaylistOrganizerContent = () => {
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [songs, setSongs] = useState<Song[]>([makeSong(), makeSong(), makeSong()]);

  const addSong = () => setSongs((prev) => [...prev, makeSong()]);
  const removeSong = (id: number) => setSongs((prev) => prev.filter((s) => s.id !== id));
  const updateSong = (id: number, patch: Partial<Song>) =>
    setSongs((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const moveSong = (index: number, dir: -1 | 1) => {
    setSongs((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const validSongs = useMemo(() => songs.filter((s) => s.title.trim()), [songs]);

  const exportText = useMemo(() => {
    const lines = [playlistName || 'My Playlist', ''];
    validSongs.forEach((s, i) => {
      let line = `${i + 1}. ${s.title}`;
      if (s.artist.trim()) line += ` — ${s.artist}`;
      lines.push(line);
      if (s.notes.trim()) lines.push(`   (${s.notes})`);
    });
    return lines.join('\n');
  }, [playlistName, validSongs]);

  const copyPlaylist = async () => {
    try { await navigator.clipboard.writeText(exportText); } catch {}
  };

  return (
    <Box>
      <TextField
        label="Playlist Name"
        fullWidth
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        sx={{ mb: 3, maxWidth: 400 }}
      />

      <Stack spacing={2} sx={{ mb: 2 }}>
        {songs.map((s, i) => (
          <Paper key={s.id} variant="outlined" sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography sx={{ minWidth: 24 }} color="text.secondary">{i + 1}.</Typography>
              <TextField size="small" label="Title" value={s.title} onChange={(e) => updateSong(s.id, { title: e.target.value })} sx={{ flex: 2, minWidth: 140 }} />
              <TextField size="small" label="Artist" value={s.artist} onChange={(e) => updateSong(s.id, { artist: e.target.value })} sx={{ flex: 1.5, minWidth: 120 }} />
              <TextField size="small" label="Notes (optional)" value={s.notes} onChange={(e) => updateSong(s.id, { notes: e.target.value })} sx={{ flex: 1.5, minWidth: 120 }} />
              <IconButton size="small" onClick={() => moveSong(i, -1)} disabled={i === 0}>
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => moveSong(i, 1)} disabled={i === songs.length - 1}>
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => removeSong(s.id)} disabled={songs.length <= 1}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Stack>
      <Button startIcon={<AddIcon />} onClick={addSong} sx={{ mb: 3 }}>Add Song</Button>

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" fontWeight={600}>Organized Playlist</Typography>
        <Button size="small" startIcon={<ContentCopyIcon />} onClick={copyPlaylist} disabled={validSongs.length === 0}>
          Copy
        </Button>
      </Stack>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography component="pre" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '0.85rem', m: 0 }}>
          {exportText}
        </Typography>
      </Paper>
    </Box>
  );
};

const PlaylistOrganizer = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Playlist Organizer</Typography>
      <Typography variant="body1">
        Name your playlist, then add each song with its title, artist, and any optional notes (like why it&apos;s
        on the list or a specific version to look for). Use the up and down arrows to reorder songs into the
        sequence you want, and remove any you change your mind about. The tool automatically builds a numbered,
        copyable version of your playlist below, ready to paste into a note, message, or wherever you plan to
        build it out on a streaming service.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Adding &quot;Bohemian Rhapsody&quot; by Queen, then &quot;Don&apos;t Stop Believin&apos;&quot; by
        Journey, and reordering so Journey comes first, produces a numbered export listing &quot;1. Don&apos;t
        Stop Believin&apos; — Journey&quot; followed by &quot;2. Bohemian Rhapsody — Queen&quot;.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Planning out a playlist&apos;s track order before building it in a music app.</li>
          <li>Sharing a curated song list with friends for a party or road trip.</li>
          <li>Keeping notes on why each song was picked, like the mood or occasion it fits.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>Does this connect to Spotify or Apple Music?</strong> No — this tool only helps you plan and organize a playlist as text. You&apos;ll need to manually add the songs to your streaming service of choice afterward.</li>
          <li><strong>Can I reorder songs after adding them?</strong> Yes — use the up and down arrow buttons next to each song to move it earlier or later in the list.</li>
          <li><strong>Is my playlist saved between visits?</strong> No — it resets on reload since it&apos;s generated fresh in your browser each time, so copy the export text if you want to keep a lasting copy.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/playlist-organizer" content={content}>
      <PlaylistOrganizerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default PlaylistOrganizer;
