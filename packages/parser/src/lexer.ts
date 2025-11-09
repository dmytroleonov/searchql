import { createToken, Lexer } from 'chevrotain';

const Mode = {
  Global: 'Global',
  Value: 'Value',
} as const;

export const Colon = createToken({
  name: 'Colon',
  pattern: /:/,
});
export const StringLiteral = createToken({
  name: 'StringLiteral',
  pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/,
  pop_mode: true,
});
export const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
  pop_mode: true,
});
export const Keyword = createToken({
  name: 'Keyword',
  pattern: /[_A-Za-z][_A-Za-z0-9]*/,
  push_mode: Mode.Value,
});
export const True = createToken({
  name: 'True',
  pattern: /true/,
  pop_mode: true,
  longer_alt: Keyword,
});
export const False = createToken({
  name: 'False',
  pattern: /false/,
  pop_mode: true,
  longer_alt: Keyword,
});
const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /[ \t\n\r]+/,
  group: Lexer.SKIPPED,
});
export const Not = createToken({
  name: 'Not',
  pattern: /not/,
  longer_alt: Keyword,
});
export const Or = createToken({
  name: 'Or',
  pattern: /or/,
  longer_alt: Keyword,
});
export const And = createToken({
  name: 'And',
  pattern: /and/,
  longer_alt: Keyword,
});
export const LParen = createToken({
  name: 'LParen',
  pattern: /\(/,
});
export const RParen = createToken({
  name: 'RParen',
  pattern: /\)/,
});

export const allTokens = [
  WhiteSpace,
  StringLiteral,
  NumberLiteral,
  True,
  False,
  Not,
  Colon,
  Or,
  And,
  Keyword,
  LParen,
  RParen,
];

export const SearchQlLexer = new Lexer({
  modes: {
    [Mode.Global]: [
      WhiteSpace,
      StringLiteral,
      NumberLiteral,
      True,
      False,
      Not,
      And,
      Or,
      LParen,
      RParen,
      Keyword,
    ],
    [Mode.Value]: [
      Colon,
      StringLiteral,
      NumberLiteral,
      True,
      False,
      WhiteSpace,
      Keyword,
      LParen,
      RParen,
    ],
  },
  defaultMode: Mode.Global,
});
