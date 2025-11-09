import { CstParser } from 'chevrotain';
import {
  And,
  allTokens,
  Colon,
  False,
  Keyword,
  LParen,
  NumberLiteral,
  Or,
  RParen,
  StringLiteral,
  True,
} from './lexer.js';

export class SearchQlParser extends CstParser {
  constructor() {
    super(allTokens);
    this.performSelfAnalysis();
  }

  query = this.RULE('query', () => {
    this.SUBRULE(this.orExpression);
  });

  private orExpression = this.RULE('orExpression', () => {
    this.SUBRULE(this.andExpression);
    this.MANY(() => {
      this.CONSUME(Or);
      this.SUBRULE2(this.andExpression);
    });
  });

  private andExpression = this.RULE('andExpression', () => {
    this.SUBRULE(this.term);
    this.MANY(() => {
      this.OPTION(() => this.CONSUME(And)); // optional AND
      this.SUBRULE2(this.term);
    });
  });

  private term = this.RULE('term', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.pair) },
      {
        ALT: () => {
          this.CONSUME(LParen);
          this.SUBRULE(this.orExpression);
          this.CONSUME(RParen);
        },
      },
    ]);
  });

  private pair = this.RULE('pair', () => {
    this.CONSUME(Keyword);
    this.CONSUME(Colon);
    this.SUBRULE(this.value);
  });

  private value = this.RULE('value', () => {
    this.OR([
      { ALT: () => this.CONSUME(StringLiteral) },
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(True) },
      { ALT: () => this.CONSUME(False) },
    ]);
  });
}
