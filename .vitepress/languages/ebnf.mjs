export default {
  name: "ebnf",
  displayName: "EBNF",
  scopeName: "source.ebnf",
  aliases: ["bnf"],
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#rules" },
    { include: "#operators" },
    { include: "#keywords" },
    { include: "#terminals" },
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: "comment.block.ebnf",
          begin: "\\(\\*",
          end: "\\*\\)",
        },
      ],
    },
    strings: {
      patterns: [
        {
          name: "string.quoted.double.ebnf",
          begin: '"',
          end: '"',
        },
        {
          name: "string.quoted.single.ebnf",
          begin: "'",
          end: "'",
        },
      ],
    },
    rules: {
      patterns: [
        {
          match: "^\\s*([A-Za-z_][A-Za-z0-9_-]*)(\\s*)(=)",
          captures: {
            1: { name: "entity.name.rule.ebnf" },
            2: { name: "punctuation.separator.ebnf" },
            3: { name: "keyword.operator.assignment.ebnf" },
          },
        },
      ],
    },
    operators: {
      patterns: [
        {
          name: "keyword.operator.alternation.ebnf",
          match: "\\|",
        },
        {
          name: "keyword.operator.repetition.ebnf",
          match: "[{}]",
        },
        {
          name: "keyword.operator.optional.ebnf",
          match: "[\\[\\]]",
        },
        {
          name: "keyword.operator.grouping.ebnf",
          match: "[()]",
        },
        {
          name: "punctuation.terminator.ebnf",
          match: ";",
        },
        {
          name: "keyword.operator.assignment.ebnf",
          match: "=",
        },
        {
          name: "keyword.operator.ebnf",
          match: "[*+?]",
        },
      ],
    },
    keywords: {
      patterns: [
        {
          name: "constant.language.ebnf",
          match: "\\bEOF\\b",
        },
      ],
    },
    terminals: {
      patterns: [
        {
          name: "variable.other.ebnf",
          match: "\\b[A-Za-z_][A-Za-z0-9_-]*\\b",
        },
      ],
    },
  },
};
