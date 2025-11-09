import { describe, test } from 'vitest';
import { SearchQlLexer } from '@/lexer.js';

describe('Lexer', () => {
  test('test1', () => {
    SearchQlLexer.tokenize('test1');
  });
});
