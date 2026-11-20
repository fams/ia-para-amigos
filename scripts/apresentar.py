"""Serve the pre-built slides on loopback; no Internet and no npm required."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import re

folder = Path(__file__).resolve().parent / 'offline'
base = '/ia-para-amigos/'
class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(folder), **kwargs)
    def translate_path(self, path):
        route = urlsplit(path).path
        if route == '/' or re.fullmatch(r'/ia-para-amigos/(?:[0-9]+|presenter/[0-9]+)', route):
            path = base + 'index.html'
        return super().translate_path(path)

if __name__ == '__main__':
    with ThreadingHTTPServer(('127.0.0.1', 8765), Handler) as server:
        print('Abra http://127.0.0.1:8765/ia-para-amigos/5 (Ctrl+C para encerrar).', flush=True)
        server.serve_forever()
