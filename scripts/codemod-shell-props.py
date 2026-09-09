#!/usr/bin/env python3
"""One-off codemod: wire every tool page.tsx to compute shellProps server-side
and wrap its calculator component in ShellPropsProvider, so CalculatorShell
(client) stops needing the full tool registry / category list / tool-blogs
data in its own bundle. See src/utils/resolveShellProps.tsx and
src/components/CalculatorShell.tsx (ShellPropsProvider) for the runtime side.

Usage: python3 scripts/codemod-shell-props.py [--apply] [file1 file2 ...]
Without --apply, runs in dry-run mode and just reports match/no-match counts.
Without file args, operates on every page.tsx under src/app that imports
`buildToolMetadata` (i.e. every real tool page).
"""
import re
import sys
import glob

PATTERN = re.compile(
    r'(?P<import>^import tool from "[^"]+";\n)'
    r'(?P<mid>(?:.*\n)*?)'
    r'(?P<pagefn>export default function Page\(\) \{\n'
    r'  return \(\n'
    r'    <>\n'
    r'      <script[\s\S]*?/>\n)'
    r'(?P<calc>      .+?\n)'
    r'(?P<tail>    </>\n'
    r'  \);\n'
    r'\}\n?)$',
    re.MULTILINE,
)

IMPORT_ADDITIONS = (
    'import { getShellProps } from "../../../utils/resolveShellProps";\n'
    'import { ShellPropsProvider } from "../../../components/CalculatorShell";\n'
)


def transform(content: str) -> str | None:
    m = PATTERN.search(content)
    if not m:
        return None

    calc_line = m.group('calc')
    indent_match = re.match(r'^(\s*)', calc_line)
    indent = indent_match.group(1) if indent_match else '      '
    calc_stripped = calc_line.strip()
    wrapped_calc = (
        f'{indent}<ShellPropsProvider value={{shellProps}}>\n'
        f'{indent}  {calc_stripped}\n'
        f'{indent}</ShellPropsProvider>\n'
    )

    new_pagefn = m.group('pagefn').replace(
        'export default function Page() {\n  return (\n',
        'export default function Page() {\n  const shellProps = getShellProps(tool);\n\n  return (\n',
    )

    new_content = (
        content[:m.start()]
        + m.group('import')
        + IMPORT_ADDITIONS
        + m.group('mid')
        + new_pagefn
        + wrapped_calc
        + m.group('tail')
        + content[m.end():]
    )
    return new_content


def main():
    args = sys.argv[1:]
    apply = '--apply' in args
    files = [a for a in args if a != '--apply']
    if not files:
        files = [
            f for f in glob.glob('src/app/**/page.tsx', recursive=True)
            if 'buildToolMetadata' in open(f).read()
        ]

    matched, unmatched, changed = 0, [], 0
    for f in files:
        content = open(f).read()
        new_content = transform(content)
        if new_content is None:
            unmatched.append(f)
            continue
        matched += 1
        if apply and new_content != content:
            open(f, 'w').write(new_content)
            changed += 1

    print(f"matched: {matched} / {len(files)}")
    if unmatched:
        print(f"unmatched ({len(unmatched)}):")
        for u in unmatched[:20]:
            print(" ", u)
    if apply:
        print(f"applied to {changed} files")
    else:
        print("dry run only — pass --apply to write changes")


if __name__ == '__main__':
    main()
