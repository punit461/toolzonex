'use client';

import { useMemo, useState } from 'react';
import { Box, TextField, Typography, Paper, List, ListItemButton, ListItemText } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

interface LanguageInfo {
  code: string;
  name: string;
  native: string;
}

const LANGUAGES: LanguageInfo[] = [
  { code: 'aa', name: 'Afar', native: 'Afaraf' },
  { code: 'ab', name: 'Abkhazian', native: 'Аҧсуа' },
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'am', name: 'Amharic', native: 'አማርኛ' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'ay', name: 'Aymara', native: 'Aymar aru' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan dili' },
  { code: 'ba', name: 'Bashkir', native: 'Башҡорт теле' },
  { code: 'be', name: 'Belarusian', native: 'Беларуская' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'bh', name: 'Bihari', native: 'भोजपुरी' },
  { code: 'bi', name: 'Bislama', native: 'Bislama' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'bo', name: 'Tibetan', native: 'བོད་ཡིག' },
  { code: 'br', name: 'Breton', native: 'Brezhoneg' },
  { code: 'bs', name: 'Bosnian', native: 'Bosanski' },
  { code: 'ca', name: 'Catalan', native: 'Català' },
  { code: 'ce', name: 'Chechen', native: 'Нохчийн мотт' },
  { code: 'co', name: 'Corsican', native: 'Corsu' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'cu', name: 'Church Slavic', native: 'Ѩзыкъ словѣньскъ' },
  { code: 'cy', name: 'Welsh', native: 'Cymraeg' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'dv', name: 'Divehi', native: 'ދިވެހި' },
  { code: 'dz', name: 'Dzongkha', native: 'རྫོང་ཁ' },
  { code: 'ee', name: 'Ewe', native: 'Eʋegbe' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'eo', name: 'Esperanto', native: 'Esperanto' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  { code: 'eu', name: 'Basque', native: 'Euskara' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'ff', name: 'Fulah', native: 'Fulfulde' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'fil', name: 'Filipino', native: 'Filipino' },
  { code: 'fj', name: 'Fijian', native: 'Vosa Vakaviti' },
  { code: 'fo', name: 'Faroese', native: 'Føroyskt' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'fy', name: 'Western Frisian', native: 'Frysk' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'gd', name: 'Scottish Gaelic', native: 'Gàidhlig' },
  { code: 'gl', name: 'Galician', native: 'Galego' },
  { code: 'gn', name: 'Guarani', native: "Avañe'ẽ" },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'gv', name: 'Manx', native: 'Gaelg' },
  { code: 'ha', name: 'Hausa', native: 'هَوُسَ' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ho', name: 'Hiri Motu', native: 'Hiri Motu' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'ht', name: 'Haitian Creole', native: 'Kreyòl ayisyen' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'hy', name: 'Armenian', native: 'Հայերեն' },
  { code: 'ia', name: 'Interlingua', native: 'Interlingua' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ig', name: 'Igbo', native: 'Asụsụ Igbo' },
  { code: 'is', name: 'Icelandic', native: 'Íslenska' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'iu', name: 'Inuktitut', native: 'ᐃᓄᒃᑎᑐᑦ' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'jv', name: 'Javanese', native: 'Basa Jawa' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ тілі' },
  { code: 'kl', name: 'Kalaallisut', native: 'Kalaallisut' },
  { code: 'km', name: 'Khmer', native: 'ខ្មែរ' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'ks', name: 'Kashmiri', native: 'कश्मीरी' },
  { code: 'ku', name: 'Kurdish', native: 'Kurdî' },
  { code: 'kw', name: 'Cornish', native: 'Kernewek' },
  { code: 'ky', name: 'Kyrgyz', native: 'Кыргызча' },
  { code: 'la', name: 'Latin', native: 'Latina' },
  { code: 'lb', name: 'Luxembourgish', native: 'Lëtzebuergesch' },
  { code: 'lo', name: 'Lao', native: 'ລາວ' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'mg', name: 'Malagasy', native: 'Malagasy' },
  { code: 'mi', name: 'Maori', native: 'Te Reo Māori' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mn', name: 'Mongolian', native: 'Монгол' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'mt', name: 'Maltese', native: 'Malti' },
  { code: 'my', name: 'Burmese', native: 'ဗမာစာ' },
  { code: 'na', name: 'Nauru', native: 'Dorerin Naoero' },
  { code: 'nb', name: 'Norwegian Bokmål', native: 'Norsk Bokmål' },
  { code: 'ne', name: 'Nepali', native: 'नेपाली' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'nn', name: 'Norwegian Nynorsk', native: 'Norsk Nynorsk' },
  { code: 'no', name: 'Norwegian', native: 'Norsk' },
  { code: 'ny', name: 'Chichewa', native: 'Chichewa' },
  { code: 'oc', name: 'Occitan', native: 'Occitan' },
  { code: 'om', name: 'Oromo', native: 'Afaan Oromoo' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'ps', name: 'Pashto', native: 'پښتو' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'qu', name: 'Quechua', native: 'Runa Simi' },
  { code: 'rm', name: 'Romansh', native: 'Rumantsch' },
  { code: 'rn', name: 'Kirundi', native: 'Ikirundi' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'rw', name: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
  { code: 'sc', name: 'Sardinian', native: 'Sardu' },
  { code: 'sd', name: 'Sindhi', native: 'सिन्धी' },
  { code: 'sg', name: 'Sango', native: 'Yângâ tî sängö' },
  { code: 'si', name: 'Sinhala', native: 'සිංහල' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'sm', name: 'Samoan', native: "Gagana Sāmoa" },
  { code: 'sn', name: 'Shona', native: 'ChiShona' },
  { code: 'so', name: 'Somali', native: 'Soomaaliga' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'ss', name: 'Swati', native: 'SiSwati' },
  { code: 'st', name: 'Southern Sotho', native: 'Sesotho' },
  { code: 'su', name: 'Sundanese', native: 'Basa Sunda' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'tg', name: 'Tajik', native: 'Тоҷикӣ' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'ti', name: 'Tigrinya', native: 'ትግርኛ' },
  { code: 'tk', name: 'Turkmen', native: 'Türkmen' },
  { code: 'tl', name: 'Tagalog', native: 'Tagalog' },
  { code: 'tn', name: 'Tswana', native: 'Setswana' },
  { code: 'to', name: 'Tongan', native: 'Faka Tonga' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'ts', name: 'Tsonga', native: 'Xitsonga' },
  { code: 'tt', name: 'Tatar', native: 'Татарча' },
  { code: 'ug', name: 'Uyghur', native: 'ئۇيغۇرچە' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'uz', name: 'Uzbek', native: "O'zbek" },
  { code: 've', name: 'Venda', native: 'Tshivenḓa' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'wa', name: 'Walloon', native: 'Walon' },
  { code: 'wo', name: 'Wolof', native: 'Wolof' },
  { code: 'xh', name: 'Xhosa', native: 'IsiXhosa' },
  { code: 'yi', name: 'Yiddish', native: 'ייִדיש' },
  { code: 'yo', name: 'Yoruba', native: 'Yorùbá' },
  { code: 'za', name: 'Zhuang', native: 'Saɯ cueŋƅ' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'zu', name: 'Zulu', native: 'IsiZulu' },
];

const LanguageCodeFinderContent = () => {
  const [query, setQuery] = useState('French');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return LANGUAGES.filter(
      (l) => l.name.toLowerCase().includes(q) || l.code.toLowerCase() === q || l.native.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  const selected = matches[0] ?? null;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
      <Box>
        <TextField
          label="Search Language or Code"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="e.g. French, fr, Français"
        />
        {matches.length > 1 && (
          <List dense sx={{ mt: 1, maxHeight: 320, overflowY: 'auto' }}>
            {matches.map((l) => (
              <ListItemButton key={l.code} onClick={() => setQuery(l.name)}>
                <ListItemText primary={`${l.name} (${l.native})`} secondary={l.code} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>Result</Typography>
        {selected ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>{selected.name}</Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>{selected.native}</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">ISO 639-1 Code</Typography>
              <Typography variant="h4" fontWeight={700} fontFamily="monospace">{selected.code}</Typography>
            </Box>
          </Paper>
        ) : (
          <Typography color="text.secondary">No matching language found.</Typography>
        )}
      </Box>
    </Box>
  );
};

const LanguageCodeFinder = () => {
  const content = (
    <>
      <Typography variant="h2">How the Language Code Finder Works</Typography>
      <Typography variant="body1">
        Type a language name, its native/local name, or its two-letter code into the search box. The tool
        checks it against a built-in reference list of over 150 ISO 639-1 language codes and shows the
        matching language&apos;s English name, native name, and its two-letter code — the kind used in HTML{' '}
        <code>lang</code> attributes and internationalization (i18n) / localization (l10n) files.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;French&quot; returns code <code>fr</code> with native name &quot;Français&quot;, which
        you could use directly as <code>{'<html lang="fr">'}</code>.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Finding the correct ISO 639-1 code to set an HTML page&apos;s <code>lang</code> attribute.</li>
          <li>Naming translation/locale files consistently (e.g. <code>messages.fr.json</code>).</li>
          <li>Looking up a language&apos;s native name alongside its code for a language picker UI.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Country Code Finder?</strong> The <a href="/developer-tools/country-code-finder">Country Code Finder</a> looks up ISO 3166 country codes and international calling codes. This tool looks up a completely different standard — ISO 639-1 language codes — which identify languages rather than countries, and are related but distinct standards commonly confused with each other.</li>
          <li><strong>Why is a language's code sometimes not two letters?</strong> Every code shown here is a standard two-letter ISO 639-1 code; a small number of widely-used languages (like Filipino) that lack a dedicated ISO 639-1 code use their commonly accepted alternate code instead.</li>
          <li><strong>Does this include every language in the world?</strong> This covers over 150 of the most commonly used ISO 639-1 codes, but ISO 639 as a whole (including its later parts, like 639-2 and 639-3) covers thousands of languages beyond this list.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/developer-tools/language-code-finder" content={content}>
      <LanguageCodeFinderContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default LanguageCodeFinder;
