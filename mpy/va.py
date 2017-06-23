
from pymongo import MongoClient
from bson.objectid import ObjectId

from pprint  import pprint
from os      import path

import re
import random


mcli  = MongoClient()
ggsys = mcli.ggsys
vcoll = ggsys.value


def get_txt_file_path(fpath = None):
    if fpath : 
        return fpath

    shawshankpath = path.join(path.dirname(path.abspath(__file__)), '../src/tmp/')
    shawshankshrink = path.join(shawshankpath, "shawshank.shrink.txt");
    norm_shawshank = path.normpath(shawshankshrink);
    return norm_shawshank

#shawshank = "/my/test/react602/src/tmp/shawshank.shrink.txt"
shawshank = get_txt_file_path()


def read_text(abspath=shawshank):
    with open(shawshank) as f:
        return f.read()

def make_array():
    txt = read_text()
    words = re.split(r'[\s|\n|\r]+', txt)
    return words


def get_sentence(words=[], i=0):
    words = make_array()

    length = len(words) - 500
    i = random.randint(i, length)

    w = words[i]

    while not w.endswith('.'):
        i = i + 1
        w = words[i]
        pass

    i = i + 1
    start = i

    i = i + 1
    w = words[i]

    while not w.endswith('.'):
        i = i + 1
        w = words[i]
        pass

    i = i + 1
    end = i

    aa = words[start:end]
    sentence = ' '.join(aa)
    return sentence, end


def two_sentence():
    words = make_array()

    length = len(words) - 500
    i = random.randint(0, length)

    s1, pos  = get_sentence(words, i)
    s2, pos2 = get_sentence(words, pos)

    print(i)
    print(s1)
    print(s2)
    print(pos2)



# checkings

txt   = read_text()
lines = txt.split('\n')

def getrandom_title_description():
    length = len(lines)
    start = random.randint(0, length-50)
    first = random.randint(1, 3)
    second= random.randint(3, 20)

    ta = lines[start: start + first]
    tajoin = ' '.join(ta)

    while len(tajoin) < 5 :
        first = random.randint(2, 5)
        ta = lines[start: start + first]
        tajoin = ' '.join(ta)

    da = lines[start + first : start + first + second]
    dajoin = '\n'.join(da)

    while len(dajoin) < 15 :
        second = random.randint(5, 25)
        da = lines[start + first : start + first + second]
        dajoin = '\n'.join(da)

    print('title:\n')
    print(tajoin)
    print('\ndescription:\n')
    print(dajoin)

    return tajoin, dajoin


def onedoc():
    return vcoll.find_one()

def delone(doc):
    return vcoll.delete_one({'_id': doc['_id']})

import time
current_milli_time = lambda: int(round(time.time() * 1000))


def addone():
    t,d = getrandom_title_description()

    o = {
            "title": t,
            "description": d,
            "milli": current_milli_time(),
            #"parentid": 0,
            "users": ['test',],
            "test": True,
            "editmilli": current_milli_time(),
            }

    return vcoll.insert_one(o)

    #return o
    #vcoll.

def subinsert(oid):
    t,d = getrandom_title_description()

    o = {
            "title": t,
            "description": d,
            "milli": current_milli_time(),
            "parentid": oid,
            "users": ['test',],
            "test": True,
            "editmilli": current_milli_time(),
            }

    #print(o)

    return vcoll.insert_one(o)

    pass


def addwithsub():
    ir = addone()
    oid = ir.inserted_id

    num = random.randint(0,9)
    print(num)

    if num > 0:
        for i in range(num):
            subinsert(oid)


if __name__ == "__main__":

    #print(__file__)
    #print(path.abspath(__file__))
    #print(path.dirname(path.abspath(__file__)))
    #shawshankpath = path.join(path.dirname(path.abspath(__file__)), '../src/tmp/')
    #shawshankshrink = path.join(shawshankpath, "shawshank.shrink.txt");
    #norm_shawshank = path.normpath(shawshankshrink);
    #print(shawshankshrink, norm_shawshank)
    #print(shawshank == shawshankshrink)
    #print(shawshank == norm_shawshank)

    #print(read_text()[:300])

    #print(get_sentence())

    #two_sentence()
    #getrandom_title_description()

    pass
