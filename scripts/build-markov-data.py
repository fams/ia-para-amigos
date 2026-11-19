"""Rebuild the teaching distributions from the supplied normalized tokens."""
import json, sys
from pathlib import Path
from collections import Counter, defaultdict
from string import ascii_lowercase

project = Path(__file__).resolve().parents[1]
if len(sys.argv) != 2:
    raise SystemExit('Uso: python3 scripts/build-markov-data.py <corpus-normalizado.txt>')
source = Path(sys.argv[1])
pairs, triples = defaultdict(Counter), defaultdict(Counter)
for word in source.read_text(encoding='utf-8').split():
    if any(letter not in ascii_lowercase for letter in word):
        raise ValueError(f'Unexpected normalized text: {word!r}')
    for a, b in zip(word, word[1:]):
        pairs[a][b] += 1
    for a, b, c in zip(word, word[1:], word[2:]):
        triples[a+b][c] += 1
for name, rows in [('sertoes-contagens.json', pairs), ('sertoes-trigramas.json', triples)]:
    result = {key.upper(): [row[ch] for ch in ascii_lowercase] for key, row in sorted(rows.items())}
    (project / 'data' / name).write_text(json.dumps(result, separators=(',', ':'))+'\n', encoding='utf-8')
