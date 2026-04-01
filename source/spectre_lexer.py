from pygments.lexer import RegexLexer
from pygments.token import *


class SpectreLexer(RegexLexer):
    name = "Spectre"
    aliases = ["spectre"]
    filenames = ["*.spr"]

    tokens = {
        "root": [
            # whitespace
            (r"\s+", Text),
            # comments
            (r"//.*?$", Comment.Single),
            (r"/\*", Comment.Multiline, "comment"),
            (r"[{}()\[\],.;:!]", Punctuation),  # keywords
            (r"\b(pub|for|fn|val|use|return|if|else|pre|post|type)\b", Keyword),
            # types (basic heuristic)
            (r"\b(i32|i64|f32|f64|bool|void|usize)\b", Keyword.Type),
            # booleans
            (r"\b(true|false)\b", Keyword.Constant),
            # numbers
            (r"\b\d+\b", Number),
            # strings
            (r'"(\\\\|\\"|[^"])*"', String),
            # operators
            (r"==|!=|<=|>=|=|\+|-|\*|/|<|>", Operator),
            # punctuation
            (r"[{}()\[\],.;:]", Punctuation),
            # function names (before paren)
            (r"\b[a-zA-Z_]\w*(?=\s*\()", Name.Function),
            # identifiers
            (r"[a-zA-Z_]\w*", Name),
        ],
        "comment": [
            (r"[^*/]+", Comment.Multiline),
            (r"/\*", Comment.Multiline, "#push"),
            (r"\*/", Comment.Multiline, "#pop"),
            (r"[*/]", Comment.Multiline),
        ],
    }
