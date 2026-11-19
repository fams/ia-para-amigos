"""Python 3, sem dependências. Recebe a extração de PDF, não o próprio PDF."""
import argparse,csv,hashlib,json,random,re,unicodedata
from collections import Counter
from itertools import pairwise
from math import isclose
from pathlib import Path
from string import ascii_lowercase as AZ

def write(path, rows):
    with path.open('w', encoding='utf-8', newline='') as f:
        csv.writer(f).writerows(rows)

def count(sizes, flat):
    out=Counter()
    pos=0
    for n in sizes:
        out.update(pairwise(flat[pos:pos+n]))
        pos+=n
    assert pos==len(flat)
    return out

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('txt',type=Path)
    parser.add_argument('out',type=Path)
    parser.add_argument('--semente',type=int,default=1902)
    a=parser.parse_args()
    blob=a.txt.read_bytes()
    raw=blob.decode('utf-8')
    start=re.search(r'^Nota Preliminar\s*$',raw,re.M)
    end=re.search(r'^FIM\s*$',raw,re.M)
    assert start and end and start.end()<end.start()
    body=raw[start.end():end.start()]
    decomposed=unicodedata.normalize('NFD',body.lower())
    words=re.findall(r'[a-z]+',''.join(c for c in decomposed if not unicodedata.combining(c)))
    original=''.join(words)
    sizes=list(map(len,words))
    perm=list(original)
    random.Random(a.semente).shuffle(perm)
    null=''.join(perm)
    marg=Counter(original)
    assert marg==Counter(null)
    dest=a.out; dest.mkdir(parents=True,exist_ok=True)
    (dest/'corpus-normalizado.txt').write_text(' '.join(words)+'\n',encoding='utf-8')
    write(dest/'frequencia-letras.csv',[['letra','original','embaralhado','fracao'],*[[k,marg[k],marg[k],marg[k]/len(original)] for k in AZ]])
    counts=[]
    for model, seq in [('original',original),('embaralhado',null)]:
        c=count(sizes,seq)
        assert sum(c.values())==len(original)-len(words)
        total={x:sum(c[x,y] for y in AZ) for x in AZ}
        def p(x,y):
            return c[x,y]/total[x] if total[x] else None
        for x in AZ:
            assert total[x]==0 or isclose(sum(p(x,y) for y in AZ),1)
        for label,value in [('contagens',lambda x,y:c[x,y]),('probabilidades',p)]:
            write(dest/(model+'-'+label+'.csv'),[['atual/proxima',*AZ],*[[x,*[value(x,y) for y in AZ]] for x in AZ]])
        targets={k:sum(c[x,k] for x in AZ) for k in AZ}
        counts.append(dict(tipo=model, pares=sum(c.values()), q_origens=total['q'], qu=c['q','u'], prob_u_dado_q=p('q','u'), prob_u_entre_destinos=targets['u']/sum(c.values()), s_top=[(y,c['s',y],p('s',y)) for y in sorted(AZ,key=lambda y:-c['s',y])[:5]]))
    summary=dict(sha256_txt_extraido=hashlib.sha256(blob).hexdigest(),alfabeto=AZ,letras=len(original),tokens=len(words),semente=a.semente,corpus_p_u=marg['u']/len(original),execucoes=counts)
    (dest/'resumo.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(summary,indent=2,ensure_ascii=False))

if __name__=='__main__':
    main()
