export default {
  name: "spectre",
  displayName: "Spectre",
  scopeName: "source.spectre",
  aliases: ["sx"],
  patterns: [
    { include: "#comments" },
    { include: "#strings" },
    { include: "#characters" },
    { include: "#numbers" },
    { include: "#declarations" },
    { include: "#keywords" },
    { include: "#constants" },
    { include: "#types" },
    { include: "#intrinsics" },
    { include: "#calls" },
    { include: "#operators" },
  ],
  repository: {
    comments: {
      patterns: [
        {
          name: "comment.line.double-slash.spectre",
          match: "//.*$",
        },
      ],
    },
    strings: {
      patterns: [
        {
          name: "string.quoted.double.spectre",
          begin: '"',
          end: '"',
          patterns: [
            {
              name: "constant.character.escape.spectre",
              match: '\\\\[nrt"\\\\]|\\\\x[0-9A-Fa-f]{2}',
            },
          ],
        },
        {
          name: "string.quoted.raw.spectre",
          begin: "^\\s*\\\\\\\\",
          end: "$",
        },
      ],
    },
    characters: {
      patterns: [
        {
          name: "string.quoted.single.spectre",
          begin: "'",
          end: "'",
          patterns: [
            {
              name: "constant.character.escape.spectre",
              match: "\\\\[nrt'\\\\0]|\\\\.",
            },
          ],
        },
      ],
    },
    numbers: {
      patterns: [
        {
          name: "constant.numeric.hex.spectre",
          match: "\\b0x[0-9A-Fa-f]+\\b",
        },
        {
          name: "constant.numeric.float.spectre",
          match:
            "\\b\\d+\\.\\d*(?:[eE][+-]?\\d+)?\\b|\\b\\d+[eE][+-]?\\d+\\b",
        },
        {
          name: "constant.numeric.integer.spectre",
          match: "\\b\\d+\\b",
        },
      ],
    },
    declarations: {
      patterns: [
        {
          match: "\\bfn\\s+([A-Za-z_][A-Za-z0-9_]*)",
          captures: {
            0: { name: "keyword.declaration.spectre" },
            1: { name: "entity.name.function.spectre" },
          },
        },
        {
          match: "\\b(?:type|spec|union|enum)\\s+([A-Za-z_][A-Za-z0-9_]*)",
          captures: {
            0: { name: "keyword.declaration.spectre" },
            1: { name: "entity.name.type.spectre" },
          },
        },
        {
          match: "\\bval\\s+([A-Za-z_][A-Za-z0-9_]*)",
          captures: {
            0: { name: "keyword.declaration.spectre" },
            1: { name: "variable.other.spectre" },
          },
        },
      ],
    },
    keywords: {
      patterns: [
        {
          name: "keyword.control.spectre",
          match:
            "\\b(?:if|elif|else|for|in|match|return|break|continue|defer|guard|when|or|otherwise)\\b",
        },
        {
          name: "keyword.declaration.spectre",
          match:
            "\\b(?:fn|type|spec|union|enum|extern|link|lib|test|val|pub|use|invariant|assert|pre|post|guarded|trust|mut|ref|as)\\b",
        },
        {
          name: "keyword.operator.word.spectre",
          match: "\\b(?:some|ok|err|not|is)\\b",
        },
      ],
    },
    constants: {
      patterns: [
        {
          name: "constant.language.spectre",
          match: "\\b(?:true|false|none)\\b",
        },
      ],
    },
    types: {
      patterns: [
        {
          name: "support.type.primitive.spectre",
          match:
            "\\b(?:i8|i16|i32|i64|u8|u16|u32|u64|usize|isize|f32|f64|bool|void|argspack|option|result|list|self)\\b",
        },
      ],
    },
    intrinsics: {
      patterns: [
        {
          name: "support.function.builtin.spectre",
          match: "@[A-Za-z_][A-Za-z0-9_]*",
        },
      ],
    },
    calls: {
      patterns: [
        {
          name: "entity.name.function.call.spectre",
          match: "\\b[A-Za-z_][A-Za-z0-9_]*(?=\\s*\\()",
        },
      ],
    },
    operators: {
      patterns: [
        {
          name: "keyword.operator.spectre",
          match:
            "==|!=|<=|>=|&&|\\|\\||<<|>>|\\+=|-=|\\+\\+|--|=>|->|[+*/%&|^~!<>=?]",
        },
        {
          name: "punctuation.spectre",
          match: "[.,:;(){}\\[\\]]",
        },
      ],
    },
  },
};
