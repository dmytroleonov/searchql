import { describe, expect, it } from 'vitest';
import {
  reservedKeywords,
  SearchQlException,
  validateKeyword,
} from '@/lexer.js';

describe('validateKeyword', () => {
  it.each(reservedKeywords)(
    "rejects reserved keyword: validateKeyword('%s') => SearchQlException",
    (reservedKeyword) => {
      expect(() => validateKeyword(reservedKeyword)).toThrow(SearchQlException);
    },
  );

  it.each(['', '123qwe', '👎', '\n', 'with a space'])(
    "rejects keywords that do not match keyword pattern: validateKeyword('%s') => SearchQlException",
    (invalidKeyword) => {
      expect(() => validateKeyword(invalidKeyword)).toThrow(SearchQlException);
    },
  );

  it.each(['_', '___', 'qwe123', 'keyword', '_1_', 'truefalse', 'orand'])(
    "accepts valid keywords: validatekeyword('%s') -> void",
    (validKeyword) => {
      expect(() => validateKeyword(validKeyword)).not.toThrow;
    },
  );
});
