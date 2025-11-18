import { describe, expect, it } from 'vitest';
import { SearchQlError } from '@/errors/searchQlError.js';
import {
  reservedKeywords,
  validateKeyword,
} from '@/keywords/createKeywords.js';

describe('validateKeyword', () => {
  it.each(reservedKeywords)(
    "rejects reserved keyword: validateKeyword('%s') => SearchQlError",
    (reservedKeyword) => {
      expect(() => validateKeyword(reservedKeyword)).toThrow(SearchQlError);
    },
  );

  it.each(['', '123qwe', '👎', '\n', 'with a space'])(
    "rejects keywords that do not match keyword pattern: validateKeyword('%s') => SearchQlError",
    (invalidKeyword) => {
      expect(() => validateKeyword(invalidKeyword)).toThrow(SearchQlError);
    },
  );

  it.each(['_', '___', 'qwe123', 'keyword', '_1_', 'truefalse', 'orand'])(
    "accepts valid keywords: validatekeyword('%s') -> void",
    (validKeyword) => {
      expect(() => validateKeyword(validKeyword)).not.toThrow;
    },
  );
});
