import argparse
from pathlib import Path
import numpy as np
import subprocess as sp
from PIL import Image

def build_luts(n=33):
    # Rows are input colors (v8 decoded RGB) and their target colors.
    m=np.array([[14,27,44],[253,243,221],[253,211,117],[138,226,227],[191,204,221],[23,43,63],[197,179,245],[167,212,250],[187,219,160],[237,179,155]],dtype=float)
    target=np.array([[248,250,247],[20,44,54],[123,63,8],[16,102,92],[61,86,96],[237,245,243],[106,75,139],[47,94,135],[69,112,46],[125,74,54]],dtype=float)
    # Fix the background exactly. Do not switch formula according to a pixel's hue:
    # an affine transform preserves alpha mixtures already baked into the source.
    w=np.array([0,1.7,1.2,1.3,1,0.8,0.65,0.65,0.65,0.65])[:,None]
    mat=np.linalg.lstsq((m-m[0])*w,(target-target[0])*w,rcond=None)[0]
    x=np.linspace(0,255,n)
    b,g,r=np.meshgrid(x,x,x,indexing='ij')
    p=np.stack((r,g,b),axis=-1).reshape(-1,3)
    c=(p-m[0])@mat+target[0]
    r,g,b=p.T
    # The book paper already worked on a bright background. Within that scene's
    # small ROI, retain warm pixels of the paper and type without affecting
    # detached teal/amber letters, venue text, or the surrounding white canvas.
    hue=np.clip((r-g+1)/7,0,1)*np.clip((r-b+3)/11,0,1)*np.clip((48-r+g)/18,0,1)
    hue=hue*hue*(3-2*hue)
    ink=np.clip(0.98*p+np.array([4.0,3.0,2.0]),0,255)
    book=c*(1-hue[:,None])+ink*hue[:,None]
    for name,cols in [('tela.cube',c),('papel.cube',book)]:
        with open(name,'w') as f:
            f.write('LUT_3D_SIZE %d\n'%n)
            np.savetxt(f,np.clip(cols,0,255)/255,fmt='%.7f')

def main():
    p=argparse.ArgumentParser()
    p.add_argument('src',type=Path)
    p.add_argument('dest',type=Path)
    p.add_argument('--sample',type=float)
    p.add_argument('--scale',type=int,default=0)
    a=p.parse_args()
    build_luts()
    # Static feathered mask for the opaque core of the cream card, never the canvas.
    yy,xx=np.ogrid[:484,:832]
    d=np.minimum(np.minimum(xx,831-xx),np.minimum(yy,483-yy))
    f=np.clip(d/16,0,1); f=f*f*(3-2*f)
    Image.fromarray((255*f).round().astype(np.uint8)).save('mascara.png')
    o=['ffmpeg','-v','error','-y','-filter_complex_threads','4','-threads','4']
    if a.sample is not None:
        o+=['-ss',str(a.sample)]
    o+=['-i',str(a.src),'-i','mascara.png']
    when=('1' if 49.8<=a.sample<=77.6 else '0') if a.sample is not None else 'between(t,49.8,77.6)'
    core=('1' if 50.50<=a.sample<=77.50 else '0') if a.sample is not None else 'between(t,50.50,77.50)'
    ht='' if not a.scale else f',scale={a.scale}:-2:flags=lanczos'
    g=('[0:v]format=rgb24,split=3[canvas][crop][orig];'
        '[canvas]lut3d=tela.cube:interp=tetrahedral[c];'
        '[crop]crop=920:590:36:235,lut3d=papel.cube:interp=tetrahedral[p];'
       f"[c][p]overlay=36:235:format=rgb:enable='{when}'[grade];"
        '[orig]crop=832:484:94:310,format=rgb24[book];'
        '[1:v]format=gray[alpha];'
        '[book][alpha]alphamerge[foreground];'
       f"[grade][foreground]overlay=94:310:format=rgb:enable='{core}'{ht}[v]")
    if a.sample is not None:
        o+=['-filter_complex',g,'-map','[v]','-frames:v','1']
    else:
        o+=['-filter_complex',g[:-3]+',format=yuv420p[v]','-map','[v]','-map','0:a?',
            '-c:v','libx264','-threads','4','-preset','veryfast','-crf','21','-movflags','+faststart','-c:a','copy']
    sp.run(o+[str(a.dest)],check=True)

if __name__=='__main__': main()
