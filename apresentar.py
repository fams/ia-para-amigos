"""Serve only the compiled workshop, including MP4 byte ranges for Safari."""
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse
import re

class Slides(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        if urlsplit(path).path == '/videos/markov-tema-claro.mp4':
            candidate = Path(self.directory) / 'videos' / 'markov-tema-claro.mp4'
            if not candidate.is_file():
                return str(Path(self.directory).parent / 'public' / 'videos' / 'markov-tema-claro.mp4')
        return super().translate_path(path)

    def send_head(self):
        self._media_bytes = None
        path = urlsplit(self.path).path
        if re.fullmatch(r'/(?:[1-9][0-9]*|presenter/[1-9][0-9]*|overview|print)/?', path):
            self.path = '/index.html'
        if path == '/videos/markov-tema-claro.mp4' and self.headers.get('Range'):
            f = Path(self.translate_path(path))
            if not f.is_file():
                return super().send_head()
            n = f.stat().st_size
            m = re.fullmatch(r'bytes=(\d*)-(\d*)', self.headers['Range'])
            start, end = n, n-1
            if m and (m[1] or m[2]):
                if m[1]:
                    start = int(m[1])
                    if m[2]:
                        end = min(end, int(m[2]))
                elif int(m[2]) > 0:
                    start = max(0,n-int(m[2]))
            if start > end or start >= n:
                self.send_response(HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE)
                self.send_header('Content-Range',f'bytes */{n}')
                self.send_header('Content-Length','0')
                self.end_headers()
                return None
            stream = f.open('rb')
            stream.seek(start)
            self._media_bytes = end-start+1
            self.send_response(HTTPStatus.PARTIAL_CONTENT)
            self.send_header('Content-Type','video/mp4')
            self.send_header('Accept-Ranges','bytes')
            self.send_header('Content-Range',f'bytes {start}-{end}/{n}')
            self.send_header('Content-Length',str(self._media_bytes))
            self.end_headers()
            return stream
        return super().send_head()

    def copyfile(self, stream, out):
        if self._media_bytes is None:
            return super().copyfile(stream, out)
        left = self._media_bytes
        while left:
            chunk = stream.read(min(65536,left))
            if not chunk:
                return
            out.write(chunk)
            left -= len(chunk)

    def list_directory(self, path):
        self.send_error(HTTPStatus.NOT_FOUND)
        return None

if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--port',type=int,default=8786)
    args=parser.parse_args()
    directory=Path(__file__).resolve().parent / 'dist'
    with ThreadingHTTPServer(('127.0.0.1',args.port),partial(Slides,directory=directory)) as server:
        print(f'Abra http://127.0.0.1:{args.port} (Ctrl+C encerra).',flush=True)
        server.serve_forever()
