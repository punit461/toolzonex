'use client';

import { useMemo, useState } from 'react';
import { Box, Typography, TextField, Paper, Chip, Autocomplete } from '@mui/material';
import CalculatorShell from '../../components/CalculatorShell';
import AdSenseUnit from '../../components/AdSenseUnit';

const NICKNAME_MAP: Record<string, string[]> = {
  Robert: ['Bob', 'Rob', 'Bobby', 'Robbie', 'Bert'],
  William: ['Bill', 'Will', 'Liam', 'Billy', 'Willy'],
  Richard: ['Rick', 'Dick', 'Rich', 'Richie', 'Ricky'],
  Elizabeth: ['Liz', 'Beth', 'Eliza', 'Lizzie', 'Betty', 'Betsy'],
  Margaret: ['Maggie', 'Meg', 'Peggy', 'Margo', 'Marge'],
  Katherine: ['Kate', 'Katie', 'Kathy', 'Kat', 'Kit'],
  Catherine: ['Cate', 'Cathy', 'Kate', 'Katie', 'Cat'],
  James: ['Jim', 'Jimmy', 'Jamie', 'Jem'],
  John: ['Jack', 'Johnny', 'Jon'],
  Michael: ['Mike', 'Mikey', 'Mick', 'Mickey'],
  Christopher: ['Chris', 'Topher', 'Kit'],
  Joseph: ['Joe', 'Joey', 'Jo'],
  Charles: ['Charlie', 'Chuck', 'Chas', 'Chip'],
  Thomas: ['Tom', 'Tommy', 'Thom'],
  Daniel: ['Dan', 'Danny'],
  Matthew: ['Matt', 'Matty'],
  Anthony: ['Tony', 'Ant'],
  Donald: ['Don', 'Donnie'],
  Steven: ['Steve', 'Stevie'],
  Stephen: ['Steve', 'Stevie'],
  Andrew: ['Andy', 'Drew'],
  Kenneth: ['Ken', 'Kenny'],
  Edward: ['Ed', 'Eddie', 'Ted', 'Teddy', 'Ned'],
  Nicholas: ['Nick', 'Nicky'],
  Gregory: ['Greg', 'Gregg'],
  Jonathan: ['Jon', 'Jonny'],
  Timothy: ['Tim', 'Timmy'],
  Patrick: ['Pat', 'Paddy', 'Rick'],
  Douglas: ['Doug'],
  Peter: ['Pete'],
  Raymond: ['Ray'],
  Samuel: ['Sam', 'Sammy'],
  Benjamin: ['Ben', 'Benny', 'Benji'],
  Nathaniel: ['Nate', 'Nat', 'Nathan'],
  Alexander: ['Alex', 'Xander', 'Al', 'Lex', 'Sasha'],
  Frederick: ['Fred', 'Freddie', 'Rick'],
  Theodore: ['Theo', 'Ted', 'Teddy'],
  Zachary: ['Zach', 'Zack'],
  Jacob: ['Jake', 'Jay'],
  Joshua: ['Josh'],
  Ronald: ['Ron', 'Ronnie'],
  Gerald: ['Gerry', 'Jerry'],
  Harold: ['Harry', 'Hal'],
  Walter: ['Walt', 'Wally'],
  Lawrence: ['Larry', 'Laurie'],
  Vincent: ['Vince', 'Vinny'],
  Albert: ['Al', 'Bert', 'Bertie'],
  Arthur: ['Art', 'Artie'],
  Eugene: ['Gene'],
  Francis: ['Frank', 'Fran'],
  Franklin: ['Frank', 'Frankie'],
  Leonard: ['Leo', 'Lenny'],
  Philip: ['Phil'],
  Phillip: ['Phil'],
  Russell: ['Russ'],
  Wayne: ['Wayno'],
  Bradley: ['Brad'],
  Jeffrey: ['Jeff', 'Jeffy'],
  Jeremy: ['Jerry'],
  Jerome: ['Jerry'],
  Justin: ['Jus'],
  Marcus: ['Marc', 'Mark'],
  Maxwell: ['Max'],
  Nathan: ['Nate'],
  Oliver: ['Ollie'],
  Sebastian: ['Seb', 'Bastian'],
  Victor: ['Vic'],
  Isaac: ['Ike', 'Zac'],
  Abraham: ['Abe'],
  Adrian: ['Ade'],
  Dominic: ['Dom', 'Nick'],
  Emmanuel: ['Manny'],
  Ignatius: ['Iggy'],
  Sylvester: ['Sly'],
  Mary: ['Molly', 'Polly', 'May', 'Mamie'],
  Susan: ['Sue', 'Susie', 'Suzy'],
  Jennifer: ['Jen', 'Jenny'],
  Patricia: ['Pat', 'Patty', 'Trish', 'Tricia'],
  Deborah: ['Deb', 'Debbie'],
  Barbara: ['Barb', 'Babs'],
  Cynthia: ['Cindy'],
  Sandra: ['Sandy'],
  Rebecca: ['Becky', 'Becca'],
  Victoria: ['Vicky', 'Tori', 'Vic'],
  Alexandra: ['Alex', 'Lexi', 'Sasha', 'Sandra'],
  Samantha: ['Sam', 'Sammy'],
  Amanda: ['Mandy'],
  Angela: ['Angie'],
  Kimberly: ['Kim'],
  Melissa: ['Mel', 'Missy'],
  Michelle: ['Shelly', 'Mich'],
  Jessica: ['Jess', 'Jessie'],
  Nicole: ['Nikki'],
  Christina: ['Chris', 'Tina', 'Christy'],
  Cristina: ['Tina', 'Cris'],
  Veronica: ['Ronnie', 'Vera'],
  Isabella: ['Bella', 'Izzy'],
  Gabriella: ['Gabby', 'Ella'],
  Gabriela: ['Gabby'],
  Josephine: ['Jo', 'Josie', 'Jojo'],
  Theresa: ['Terry', 'Tess', 'Tessie'],
  Virginia: ['Ginny', 'Ginger'],
  Frances: ['Fran', 'Frankie', 'Fanny'],
  Dorothy: ['Dot', 'Dottie', 'Dolly'],
  Eleanor: ['Ellie', 'Nell', 'Nora', 'Nellie'],
  Helen: ['Nell', 'Lena'],
  Priscilla: ['Cilla', 'Prissy'],
  Roberta: ['Bobbie', 'Robbie'],
  Antonia: ['Toni', 'Tonia'],
  Bernadette: ['Bernie'],
  Bridget: ['Bridie'],
  Caroline: ['Carrie', 'Lina'],
  Carolina: ['Carrie', 'Lina'],
  Constance: ['Connie'],
  Georgia: ['George', 'Gigi'],
  Gwendolyn: ['Gwen'],
  Henrietta: ['Hetty', 'Etta'],
  Judith: ['Judy'],
  Lillian: ['Lily', 'Lil'],
  Louisa: ['Lou', 'Lulu'],
  Louise: ['Lou', 'Lulu'],
  Natalie: ['Nat', 'Talia'],
  Olivia: ['Liv', 'Livvy'],
  Penelope: ['Penny'],
  Rosalind: ['Roz'],
  Rosemary: ['Rosie'],
  Stephanie: ['Steph', 'Stevie'],
  Vanessa: ['Nessa'],
  Winifred: ['Winnie'],
};

const NAME_LIST = Object.keys(NICKNAME_MAP).sort();

const NicknameShortenerContent = () => {
  const [search, setSearch] = useState('Robert');

  const matchedKey = useMemo(() => {
    const exact = NAME_LIST.find((n) => n.toLowerCase() === search.trim().toLowerCase());
    return exact ?? null;
  }, [search]);

  const nicknames = matchedKey ? NICKNAME_MAP[matchedKey] : [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 600, mx: 'auto' }}>
      <Autocomplete
        freeSolo
        options={NAME_LIST}
        inputValue={search}
        onInputChange={(_, value) => setSearch(value)}
        renderInput={(params) => <TextField {...params} label="Search a first name" fullWidth />}
      />

      <Paper variant="outlined" sx={{ p: 3, minHeight: 140 }}>
        {matchedKey ? (
          <>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Common nicknames for {matchedKey}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {nicknames.map((n) => (
                <Chip key={n} label={n} color="primary" variant="outlined" />
              ))}
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">
            {search.trim()
              ? `No entry found for "${search}" — try a common English first name, like Robert, Elizabeth, or William.`
              : 'Type a first name above to see its common nickname options.'}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

const NicknameShortener = () => {
  const content = (
    <>
      <Typography variant="h2">How to Use the Nickname Shortener</Typography>
      <Typography variant="body1">
        Type or select a common English first name in the search box. If it&apos;s in the lookup table, the
        tool shows every common short-form nickname associated with it — for example, searching
        &quot;Elizabeth&quot; returns Liz, Beth, Eliza, Lizzie, and Betty. The table covers around 100 of the
        most common English first names and their well-known nickname variants.
      </Typography>

      <Typography variant="h2">Example</Typography>
      <Typography variant="body1">
        Searching &quot;Robert&quot; returns Bob, Rob, Bobby, Robbie, and Bert — the common short-form
        variants people actually go by day to day.
      </Typography>

      <Typography variant="h2">Common Use Cases</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li>Figuring out what someone named &quot;Margaret&quot; on a form might actually go by casually.</li>
          <li>Choosing a nickname for a baby or character based on their given full name.</li>
          <li>Quickly checking whether a name has a well-known short form before using it in conversation.</li>
        </ul>
      </Box>

      <Typography variant="h2">FAQs</Typography>
      <Box sx={{ typography: 'body1' }}>
        <ul>
          <li><strong>How is this different from the Nickname Combiner?</strong> The Nickname Combiner takes TWO different names and blends them together into a new portmanteau &quot;ship name.&quot; This Nickname Shortener instead looks up the common short form of a SINGLE name — it doesn&apos;t combine or blend anything, it just returns known nicknames for the one name you searched.</li>
          <li><strong>What if my name isn&apos;t in the list?</strong> The lookup table covers roughly 100 of the most common English first names, so less common or non-English names may not have an entry — in that case, the tool will let you know no match was found.</li>
          <li><strong>Are these the only nicknames a name can have?</strong> No — these are simply the most widely recognized common variants. Many names have regional, family-specific, or invented nicknames beyond what any fixed list can cover.</li>
        </ul>
      </Box>
    </>
  );

  return (
    <CalculatorShell url="/generators/nickname-shortener" content={content}>
      <NicknameShortenerContent />
      <Box sx={{ mt: 4 }}><AdSenseUnit /></Box>
    </CalculatorShell>
  );
};

export default NicknameShortener;
