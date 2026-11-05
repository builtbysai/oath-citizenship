"""Build index.html: inline every <script src>, <link rel=stylesheet> and font url() in template.html.
Run from anywhere: python3 src/build.py"""
import base64, os, re

here = os.path.dirname(os.path.abspath(__file__))

def read(name):
    with open(os.path.join(here, name), encoding="utf-8") as f:
        return f.read()

def script(name):
    code = read(name)
    assert "</script" not in code.lower(), name + " contains </script"
    return "<script>\n" + code + "</script>"

def font_data_uri(m):
    with open(os.path.join(here, m.group(1)), "rb") as f:
        return "url(data:font/woff2;base64," + base64.b64encode(f.read()).decode() + ")"

def style(name):
    css = re.sub(r'url\((fonts/[^)]+\.woff2)\)', font_data_uri, read(name))
    return "<style>\n" + css + "</style>"

html = read("template.html")
# Function replacements, so backslashes in the sources are never treated as escapes.
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: script(m.group(1)), html)
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: style(m.group(1)), html)
assert '<script src=' not in html and 'rel="stylesheet"' not in html
assert 'url(fonts/' not in html

with open(os.path.join(here, "..", "index.html"), "w", encoding="utf-8") as f:
    f.write(html)
print("built index.html:", len(html), "bytes")
