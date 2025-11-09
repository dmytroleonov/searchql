import { SearchQlLexer } from './lexer.js';
import { SearchQlParser } from './parser.js';

function main(): void {
  const lexResult = SearchQlLexer.tokenize('key:123 key2:"value2"');
  const parser = new SearchQlParser();
  parser.input = lexResult.tokens;
  const cst = parser.query();
  console.dir(cst, { depth: null });
}

main();
