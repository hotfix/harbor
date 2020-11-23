!(function (e) {
  var t = {}
  function n(r) {
    if (t[r]) return t[r].exports
    var i = (t[r] = { i: r, l: !1, exports: {} })
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r })
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function (t) {
              return e[t]
            }.bind(null, i)
          )
      return r
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default
            }
          : function () {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 4))
})([
  function (e, t, n) {
    var r, i
    /**
     * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.8
     * Copyright (C) 2019 Oliver Nightingale
     * @license MIT
     */ !(function () {
      var o,
        a,
        s,
        l,
        c,
        u,
        d,
        h,
        f,
        p,
        m,
        g,
        y,
        v,
        x,
        b,
        w,
        k,
        S,
        E,
        N,
        T,
        R,
        L,
        I,
        O,
        Q = function (e) {
          var t = new Q.Builder()
          return (
            t.pipeline.add(Q.trimmer, Q.stopWordFilter, Q.stemmer),
            t.searchPipeline.add(Q.stemmer),
            e.call(t, t),
            t.build()
          )
        }
      ;(Q.version = '2.3.8'),
        /*!
         * lunr.utils
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.utils = {}),
        (Q.utils.warn =
          ((o = this),
          function (e) {
            o.console && console.warn && console.warn(e)
          })),
        (Q.utils.asString = function (e) {
          return null == e ? '' : e.toString()
        }),
        (Q.utils.clone = function (e) {
          if (null == e) return e
          for (
            var t = Object.create(null), n = Object.keys(e), r = 0;
            r < n.length;
            r++
          ) {
            var i = n[r],
              o = e[i]
            if (Array.isArray(o)) t[i] = o.slice()
            else {
              if (
                'string' != typeof o &&
                'number' != typeof o &&
                'boolean' != typeof o
              )
                throw new TypeError(
                  'clone is not deep and does not support nested objects'
                )
              t[i] = o
            }
          }
          return t
        }),
        (Q.FieldRef = function (e, t, n) {
          (this.docRef = e), (this.fieldName = t), (this._stringValue = n)
        }),
        (Q.FieldRef.joiner = '/'),
        (Q.FieldRef.fromString = function (e) {
          var t = e.indexOf(Q.FieldRef.joiner)
          if (-1 === t) throw 'malformed field ref string'
          var n = e.slice(0, t),
            r = e.slice(t + 1)
          return new Q.FieldRef(r, n, e)
        }),
        (Q.FieldRef.prototype.toString = function () {
          return (
            null == this._stringValue &&
              (this._stringValue =
                this.fieldName + Q.FieldRef.joiner + this.docRef),
            this._stringValue
          )
        }),
        /*!
         * lunr.Set
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.Set = function (e) {
          if (((this.elements = Object.create(null)), e)) {
            this.length = e.length
            for (var t = 0; t < this.length; t++) this.elements[e[t]] = !0
          } else this.length = 0
        }),
        (Q.Set.complete = {
          intersect: function (e) {
            return e
          },
          union: function (e) {
            return e
          },
          contains: function () {
            return !0
          },
        }),
        (Q.Set.empty = {
          intersect: function () {
            return this
          },
          union: function (e) {
            return e
          },
          contains: function () {
            return !1
          },
        }),
        (Q.Set.prototype.contains = function (e) {
          return !!this.elements[e]
        }),
        (Q.Set.prototype.intersect = function (e) {
          var t,
            n,
            r,
            i = []
          if (e === Q.Set.complete) return this
          if (e === Q.Set.empty) return e
          this.length < e.length
            ? ((t = this), (n = e))
            : ((t = e), (n = this)),
            (r = Object.keys(t.elements))
          for (var o = 0; o < r.length; o++) {
            var a = r[o]
            a in n.elements && i.push(a)
          }
          return new Q.Set(i)
        }),
        (Q.Set.prototype.union = function (e) {
          return e === Q.Set.complete
            ? Q.Set.complete
            : e === Q.Set.empty
            ? this
            : new Q.Set(
                Object.keys(this.elements).concat(Object.keys(e.elements))
              )
        }),
        (Q.idf = function (e, t) {
          var n = 0
          for (var r in e) '_index' != r && (n += Object.keys(e[r]).length)
          var i = (t - n + 0.5) / (n + 0.5)
          return Math.log(1 + Math.abs(i))
        }),
        (Q.Token = function (e, t) {
          (this.str = e || ''), (this.metadata = t || {})
        }),
        (Q.Token.prototype.toString = function () {
          return this.str
        }),
        (Q.Token.prototype.update = function (e) {
          return (this.str = e(this.str, this.metadata)), this
        }),
        (Q.Token.prototype.clone = function (e) {
          return (
            (e =
              e ||
              function (e) {
                return e
              }),
            new Q.Token(e(this.str, this.metadata), this.metadata)
          )
        }),
        /*!
         * lunr.tokenizer
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.tokenizer = function (e, t) {
          if (null == e || null == e) return []
          if (Array.isArray(e))
            return e.map(function (e) {
              return new Q.Token(
                Q.utils.asString(e).toLowerCase(),
                Q.utils.clone(t)
              )
            })
          for (
            var n = e.toString().toLowerCase(),
              r = n.length,
              i = [],
              o = 0,
              a = 0;
            o <= r;
            o++
          ) {
            var s = o - a
            if (n.charAt(o).match(Q.tokenizer.separator) || o == r) {
              if (s > 0) {
                var l = Q.utils.clone(t) || {}
                ;(l.position = [a, s]),
                  (l.index = i.length),
                  i.push(new Q.Token(n.slice(a, o), l))
              }
              a = o + 1
            }
          }
          return i
        }),
        (Q.tokenizer.separator = /[\s\-]+/),
        /*!
         * lunr.Pipeline
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.Pipeline = function () {
          this._stack = []
        }),
        (Q.Pipeline.registeredFunctions = Object.create(null)),
        (Q.Pipeline.registerFunction = function (e, t) {
          t in this.registeredFunctions &&
            Q.utils.warn('Overwriting existing registered function: ' + t),
            (e.label = t),
            (Q.Pipeline.registeredFunctions[e.label] = e)
        }),
        (Q.Pipeline.warnIfFunctionNotRegistered = function (e) {
          (e.label && e.label in this.registeredFunctions) ||
            Q.utils.warn(
              'Function is not registered with pipeline. This may cause problems when serialising the index.\n',
              e
            )
        }),
        (Q.Pipeline.load = function (e) {
          var t = new Q.Pipeline()
          return (
            e.forEach(function (e) {
              var n = Q.Pipeline.registeredFunctions[e]
              if (!n) throw new Error('Cannot load unregistered function: ' + e)
              t.add(n)
            }),
            t
          )
        }),
        (Q.Pipeline.prototype.add = function () {
          var e = Array.prototype.slice.call(arguments)
          e.forEach(function (e) {
            Q.Pipeline.warnIfFunctionNotRegistered(e), this._stack.push(e)
          }, this)
        }),
        (Q.Pipeline.prototype.after = function (e, t) {
          Q.Pipeline.warnIfFunctionNotRegistered(t)
          var n = this._stack.indexOf(e)
          if (-1 == n) throw new Error('Cannot find existingFn')
          ;(n += 1), this._stack.splice(n, 0, t)
        }),
        (Q.Pipeline.prototype.before = function (e, t) {
          Q.Pipeline.warnIfFunctionNotRegistered(t)
          var n = this._stack.indexOf(e)
          if (-1 == n) throw new Error('Cannot find existingFn')
          this._stack.splice(n, 0, t)
        }),
        (Q.Pipeline.prototype.remove = function (e) {
          var t = this._stack.indexOf(e)
          ;-1 != t && this._stack.splice(t, 1)
        }),
        (Q.Pipeline.prototype.run = function (e) {
          for (var t = this._stack.length, n = 0; n < t; n++) {
            for (var r = this._stack[n], i = [], o = 0; o < e.length; o++) {
              var a = r(e[o], o, e)
              if (null != a && '' !== a)
                if (Array.isArray(a))
                  for (var s = 0; s < a.length; s++) i.push(a[s])
                else i.push(a)
            }
            e = i
          }
          return e
        }),
        (Q.Pipeline.prototype.runString = function (e, t) {
          var n = new Q.Token(e, t)
          return this.run([n]).map(function (e) {
            return e.toString()
          })
        }),
        (Q.Pipeline.prototype.reset = function () {
          this._stack = []
        }),
        (Q.Pipeline.prototype.toJSON = function () {
          return this._stack.map(function (e) {
            return Q.Pipeline.warnIfFunctionNotRegistered(e), e.label
          })
        }),
        /*!
         * lunr.Vector
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.Vector = function (e) {
          (this._magnitude = 0), (this.elements = e || [])
        }),
        (Q.Vector.prototype.positionForIndex = function (e) {
          if (0 == this.elements.length) return 0
          for (
            var t = 0,
              n = this.elements.length / 2,
              r = n - t,
              i = Math.floor(r / 2),
              o = this.elements[2 * i];
            r > 1 && (o < e && (t = i), o > e && (n = i), o != e);

          )
            (r = n - t), (i = t + Math.floor(r / 2)), (o = this.elements[2 * i])
          return o == e || o > e ? 2 * i : o < e ? 2 * (i + 1) : void 0
        }),
        (Q.Vector.prototype.insert = function (e, t) {
          this.upsert(e, t, function () {
            throw 'duplicate index'
          })
        }),
        (Q.Vector.prototype.upsert = function (e, t, n) {
          this._magnitude = 0
          var r = this.positionForIndex(e)
          this.elements[r] == e
            ? (this.elements[r + 1] = n(this.elements[r + 1], t))
            : this.elements.splice(r, 0, e, t)
        }),
        (Q.Vector.prototype.magnitude = function () {
          if (this._magnitude) return this._magnitude
          for (var e = 0, t = this.elements.length, n = 1; n < t; n += 2) {
            var r = this.elements[n]
            e += r * r
          }
          return (this._magnitude = Math.sqrt(e))
        }),
        (Q.Vector.prototype.dot = function (e) {
          for (
            var t = 0,
              n = this.elements,
              r = e.elements,
              i = n.length,
              o = r.length,
              a = 0,
              s = 0,
              l = 0,
              c = 0;
            l < i && c < o;

          )
            (a = n[l]) < (s = r[c])
              ? (l += 2)
              : a > s
              ? (c += 2)
              : a == s && ((t += n[l + 1] * r[c + 1]), (l += 2), (c += 2))
          return t
        }),
        (Q.Vector.prototype.similarity = function (e) {
          return this.dot(e) / this.magnitude() || 0
        }),
        (Q.Vector.prototype.toArray = function () {
          for (
            var e = new Array(this.elements.length / 2), t = 1, n = 0;
            t < this.elements.length;
            t += 2, n++
          )
            e[n] = this.elements[t]
          return e
        }),
        (Q.Vector.prototype.toJSON = function () {
          return this.elements
        }),
        /*!
         * lunr.stemmer
         * Copyright (C) 2019 Oliver Nightingale
         * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
         */ (Q.stemmer =
          ((a = {
            ational: 'ate',
            tional: 'tion',
            enci: 'ence',
            anci: 'ance',
            izer: 'ize',
            bli: 'ble',
            alli: 'al',
            entli: 'ent',
            eli: 'e',
            ousli: 'ous',
            ization: 'ize',
            ation: 'ate',
            ator: 'ate',
            alism: 'al',
            iveness: 'ive',
            fulness: 'ful',
            ousness: 'ous',
            aliti: 'al',
            iviti: 'ive',
            biliti: 'ble',
            logi: 'log',
          }),
          (s = {
            icate: 'ic',
            ative: '',
            alize: 'al',
            iciti: 'ic',
            ical: 'ic',
            ful: '',
            ness: '',
          }),
          (l = '[aeiouy]'),
          (c = '[^aeiou][^aeiouy]*'),
          (u = new RegExp(
            '^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*'
          )),
          (d = new RegExp(
            '^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*'
          )),
          (h = new RegExp(
            '^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$'
          )),
          (f = new RegExp('^([^aeiou][^aeiouy]*)?[aeiouy]')),
          (p = /^(.+?)(ss|i)es$/),
          (m = /^(.+?)([^s])s$/),
          (g = /^(.+?)eed$/),
          (y = /^(.+?)(ed|ing)$/),
          (v = /.$/),
          (x = /(at|bl|iz)$/),
          (b = new RegExp('([^aeiouylsz])\\1$')),
          (w = new RegExp('^' + c + l + '[^aeiouwxy]$')),
          (k = /^(.+?[^aeiou])y$/),
          (S = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/),
          (E = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/),
          (N = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/),
          (T = /^(.+?)(s|t)(ion)$/),
          (R = /^(.+?)e$/),
          (L = /ll$/),
          (I = new RegExp('^' + c + l + '[^aeiouwxy]$')),
          (O = function (e) {
            var t, n, r, i, o, l, c
            if (e.length < 3) return e
            if (
              ('y' == (r = e.substr(0, 1)) &&
                (e = r.toUpperCase() + e.substr(1)),
              (o = m),
              (i = p).test(e)
                ? (e = e.replace(i, '$1$2'))
                : o.test(e) && (e = e.replace(o, '$1$2')),
              (o = y),
              (i = g).test(e))
            ) {
              var O = i.exec(e)
              ;(i = u).test(O[1]) && ((i = v), (e = e.replace(i, '')))
            } else
              o.test(e) &&
                ((t = (O = o.exec(e))[1]),
                (o = f).test(t) &&
                  ((l = b),
                  (c = w),
                  (o = x).test((e = t))
                    ? (e += 'e')
                    : l.test(e)
                    ? ((i = v), (e = e.replace(i, '')))
                    : c.test(e) && (e += 'e')))
            return (
              (i = k).test(e) && (e = (t = (O = i.exec(e))[1]) + 'i'),
              (i = S).test(e) &&
                ((t = (O = i.exec(e))[1]),
                (n = O[2]),
                (i = u).test(t) && (e = t + a[n])),
              (i = E).test(e) &&
                ((t = (O = i.exec(e))[1]),
                (n = O[2]),
                (i = u).test(t) && (e = t + s[n])),
              (o = T),
              (i = N).test(e)
                ? ((t = (O = i.exec(e))[1]), (i = d).test(t) && (e = t))
                : o.test(e) &&
                  ((t = (O = o.exec(e))[1] + O[2]), (o = d).test(t) && (e = t)),
              (i = R).test(e) &&
                ((t = (O = i.exec(e))[1]),
                (o = h),
                (l = I),
                ((i = d).test(t) || (o.test(t) && !l.test(t))) && (e = t)),
              (o = d),
              (i = L).test(e) && o.test(e) && ((i = v), (e = e.replace(i, ''))),
              'y' == r && (e = r.toLowerCase() + e.substr(1)),
              e
            )
          }),
          function (e) {
            return e.update(O)
          })),
        Q.Pipeline.registerFunction(Q.stemmer, 'stemmer'),
        /*!
         * lunr.stopWordFilter
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.generateStopWordFilter = function (e) {
          var t = e.reduce(function (e, t) {
            return (e[t] = t), e
          }, {})
          return function (e) {
            if (e && t[e.toString()] !== e.toString()) return e
          }
        }),
        (Q.stopWordFilter = Q.generateStopWordFilter([
          'a',
          'able',
          'about',
          'across',
          'after',
          'all',
          'almost',
          'also',
          'am',
          'among',
          'an',
          'and',
          'any',
          'are',
          'as',
          'at',
          'be',
          'because',
          'been',
          'but',
          'by',
          'can',
          'cannot',
          'could',
          'dear',
          'did',
          'do',
          'does',
          'either',
          'else',
          'ever',
          'every',
          'for',
          'from',
          'get',
          'got',
          'had',
          'has',
          'have',
          'he',
          'her',
          'hers',
          'him',
          'his',
          'how',
          'however',
          'i',
          'if',
          'in',
          'into',
          'is',
          'it',
          'its',
          'just',
          'least',
          'let',
          'like',
          'likely',
          'may',
          'me',
          'might',
          'most',
          'must',
          'my',
          'neither',
          'no',
          'nor',
          'not',
          'of',
          'off',
          'often',
          'on',
          'only',
          'or',
          'other',
          'our',
          'own',
          'rather',
          'said',
          'say',
          'says',
          'she',
          'should',
          'since',
          'so',
          'some',
          'than',
          'that',
          'the',
          'their',
          'them',
          'then',
          'there',
          'these',
          'they',
          'this',
          'tis',
          'to',
          'too',
          'twas',
          'us',
          'wants',
          'was',
          'we',
          'were',
          'what',
          'when',
          'where',
          'which',
          'while',
          'who',
          'whom',
          'why',
          'will',
          'with',
          'would',
          'yet',
          'you',
          'your',
        ])),
        Q.Pipeline.registerFunction(Q.stopWordFilter, 'stopWordFilter'),
        /*!
         * lunr.trimmer
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.trimmer = function (e) {
          return e.update(function (e) {
            return e.replace(/^\W+/, '').replace(/\W+$/, '')
          })
        }),
        Q.Pipeline.registerFunction(Q.trimmer, 'trimmer'),
        /*!
         * lunr.TokenSet
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.TokenSet = function () {
          (this.final = !1),
            (this.edges = {}),
            (this.id = Q.TokenSet._nextId),
            (Q.TokenSet._nextId += 1)
        }),
        (Q.TokenSet._nextId = 1),
        (Q.TokenSet.fromArray = function (e) {
          for (
            var t = new Q.TokenSet.Builder(), n = 0, r = e.length;
            n < r;
            n++
          )
            t.insert(e[n])
          return t.finish(), t.root
        }),
        (Q.TokenSet.fromClause = function (e) {
          return 'editDistance' in e
            ? Q.TokenSet.fromFuzzyString(e.term, e.editDistance)
            : Q.TokenSet.fromString(e.term)
        }),
        (Q.TokenSet.fromFuzzyString = function (e, t) {
          for (
            var n = new Q.TokenSet(),
              r = [{ node: n, editsRemaining: t, str: e }];
            r.length;

          ) {
            var i = r.pop()
            if (i.str.length > 0) {
              var o,
                a = i.str.charAt(0)
              a in i.node.edges
                ? (o = i.node.edges[a])
                : ((o = new Q.TokenSet()), (i.node.edges[a] = o)),
                1 == i.str.length && (o.final = !0),
                r.push({
                  node: o,
                  editsRemaining: i.editsRemaining,
                  str: i.str.slice(1),
                })
            }
            if (0 != i.editsRemaining) {
              if ('*' in i.node.edges) var s = i.node.edges['*']
              else {
                s = new Q.TokenSet()
                i.node.edges['*'] = s
              }
              if (
                (0 == i.str.length && (s.final = !0),
                r.push({
                  node: s,
                  editsRemaining: i.editsRemaining - 1,
                  str: i.str,
                }),
                i.str.length > 1 &&
                  r.push({
                    node: i.node,
                    editsRemaining: i.editsRemaining - 1,
                    str: i.str.slice(1),
                  }),
                1 == i.str.length && (i.node.final = !0),
                i.str.length >= 1)
              ) {
                if ('*' in i.node.edges) var l = i.node.edges['*']
                else {
                  l = new Q.TokenSet()
                  i.node.edges['*'] = l
                }
                1 == i.str.length && (l.final = !0),
                  r.push({
                    node: l,
                    editsRemaining: i.editsRemaining - 1,
                    str: i.str.slice(1),
                  })
              }
              if (i.str.length > 1) {
                var c,
                  u = i.str.charAt(0),
                  d = i.str.charAt(1)
                d in i.node.edges
                  ? (c = i.node.edges[d])
                  : ((c = new Q.TokenSet()), (i.node.edges[d] = c)),
                  1 == i.str.length && (c.final = !0),
                  r.push({
                    node: c,
                    editsRemaining: i.editsRemaining - 1,
                    str: u + i.str.slice(2),
                  })
              }
            }
          }
          return n
        }),
        (Q.TokenSet.fromString = function (e) {
          for (
            var t = new Q.TokenSet(), n = t, r = 0, i = e.length;
            r < i;
            r++
          ) {
            var o = e[r],
              a = r == i - 1
            if ('*' == o) (t.edges[o] = t), (t.final = a)
            else {
              var s = new Q.TokenSet()
              ;(s.final = a), (t.edges[o] = s), (t = s)
            }
          }
          return n
        }),
        (Q.TokenSet.prototype.toArray = function () {
          for (var e = [], t = [{ prefix: '', node: this }]; t.length; ) {
            var n = t.pop(),
              r = Object.keys(n.node.edges),
              i = r.length
            n.node.final && (n.prefix.charAt(0), e.push(n.prefix))
            for (var o = 0; o < i; o++) {
              var a = r[o]
              t.push({ prefix: n.prefix.concat(a), node: n.node.edges[a] })
            }
          }
          return e
        }),
        (Q.TokenSet.prototype.toString = function () {
          if (this._str) return this._str
          for (
            var e = this.final ? '1' : '0',
              t = Object.keys(this.edges).sort(),
              n = t.length,
              r = 0;
            r < n;
            r++
          ) {
            var i = t[r]
            e = e + i + this.edges[i].id
          }
          return e
        }),
        (Q.TokenSet.prototype.intersect = function (e) {
          for (
            var t = new Q.TokenSet(),
              n = void 0,
              r = [{ qNode: e, output: t, node: this }];
            r.length;

          ) {
            n = r.pop()
            for (
              var i = Object.keys(n.qNode.edges),
                o = i.length,
                a = Object.keys(n.node.edges),
                s = a.length,
                l = 0;
              l < o;
              l++
            )
              for (var c = i[l], u = 0; u < s; u++) {
                var d = a[u]
                if (d == c || '*' == c) {
                  var h = n.node.edges[d],
                    f = n.qNode.edges[c],
                    p = h.final && f.final,
                    m = void 0
                  d in n.output.edges
                    ? ((m = n.output.edges[d]).final = m.final || p)
                    : (((m = new Q.TokenSet()).final = p),
                      (n.output.edges[d] = m)),
                    r.push({ qNode: f, output: m, node: h })
                }
              }
          }
          return t
        }),
        (Q.TokenSet.Builder = function () {
          (this.previousWord = ''),
            (this.root = new Q.TokenSet()),
            (this.uncheckedNodes = []),
            (this.minimizedNodes = {})
        }),
        (Q.TokenSet.Builder.prototype.insert = function (e) {
          var t,
            n = 0
          if (e < this.previousWord)
            throw new Error('Out of order word insertion')
          for (
            var r = 0;
            r < e.length &&
            r < this.previousWord.length &&
            e[r] == this.previousWord[r];
            r++
          )
            n++
          this.minimize(n),
            (t =
              0 == this.uncheckedNodes.length
                ? this.root
                : this.uncheckedNodes[this.uncheckedNodes.length - 1].child)
          for (r = n; r < e.length; r++) {
            var i = new Q.TokenSet(),
              o = e[r]
            ;(t.edges[o] = i),
              this.uncheckedNodes.push({ parent: t, char: o, child: i }),
              (t = i)
          }
          (t.final = !0), (this.previousWord = e)
        }),
        (Q.TokenSet.Builder.prototype.finish = function () {
          this.minimize(0)
        }),
        (Q.TokenSet.Builder.prototype.minimize = function (e) {
          for (var t = this.uncheckedNodes.length - 1; t >= e; t--) {
            var n = this.uncheckedNodes[t],
              r = n.child.toString()
            r in this.minimizedNodes
              ? (n.parent.edges[n.char] = this.minimizedNodes[r])
              : ((n.child._str = r), (this.minimizedNodes[r] = n.child)),
              this.uncheckedNodes.pop()
          }
        }),
        /*!
         * lunr.Index
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.Index = function (e) {
          (this.invertedIndex = e.invertedIndex),
            (this.fieldVectors = e.fieldVectors),
            (this.tokenSet = e.tokenSet),
            (this.fields = e.fields),
            (this.pipeline = e.pipeline)
        }),
        (Q.Index.prototype.search = function (e) {
          return this.query(function (t) {
            new Q.QueryParser(e, t).parse()
          })
        }),
        (Q.Index.prototype.query = function (e) {
          for (
            var t = new Q.Query(this.fields),
              n = Object.create(null),
              r = Object.create(null),
              i = Object.create(null),
              o = Object.create(null),
              a = Object.create(null),
              s = 0;
            s < this.fields.length;
            s++
          )
            r[this.fields[s]] = new Q.Vector()
          e.call(t, t)
          for (s = 0; s < t.clauses.length; s++) {
            var l = t.clauses[s],
              c = null,
              u = Q.Set.complete
            c = l.usePipeline
              ? this.pipeline.runString(l.term, { fields: l.fields })
              : [l.term]
            for (var d = 0; d < c.length; d++) {
              var h = c[d]
              l.term = h
              var f = Q.TokenSet.fromClause(l),
                p = this.tokenSet.intersect(f).toArray()
              if (0 === p.length && l.presence === Q.Query.presence.REQUIRED) {
                for (var m = 0; m < l.fields.length; m++) {
                  o[(P = l.fields[m])] = Q.Set.empty
                }
                break
              }
              for (var g = 0; g < p.length; g++) {
                var y = p[g],
                  v = this.invertedIndex[y],
                  x = v._index
                for (m = 0; m < l.fields.length; m++) {
                  var b = v[(P = l.fields[m])],
                    w = Object.keys(b),
                    k = y + '/' + P,
                    S = new Q.Set(w)
                  if (
                    (l.presence == Q.Query.presence.REQUIRED &&
                      ((u = u.union(S)),
                      void 0 === o[P] && (o[P] = Q.Set.complete)),
                    l.presence != Q.Query.presence.PROHIBITED)
                  ) {
                    if (
                      (r[P].upsert(x, l.boost, function (e, t) {
                        return e + t
                      }),
                      !i[k])
                    ) {
                      for (var E = 0; E < w.length; E++) {
                        var N,
                          T = w[E],
                          R = new Q.FieldRef(T, P),
                          L = b[T]
                        void 0 === (N = n[R])
                          ? (n[R] = new Q.MatchData(y, P, L))
                          : N.add(y, P, L)
                      }
                      i[k] = !0
                    }
                  } else
                    void 0 === a[P] && (a[P] = Q.Set.empty),
                      (a[P] = a[P].union(S))
                }
              }
            }
            if (l.presence === Q.Query.presence.REQUIRED)
              for (m = 0; m < l.fields.length; m++) {
                o[(P = l.fields[m])] = o[P].intersect(u)
              }
          }
          var I = Q.Set.complete,
            O = Q.Set.empty
          for (s = 0; s < this.fields.length; s++) {
            var P
            o[(P = this.fields[s])] && (I = I.intersect(o[P])),
              a[P] && (O = O.union(a[P]))
          }
          var C = Object.keys(n),
            F = [],
            j = Object.create(null)
          if (t.isNegated()) {
            C = Object.keys(this.fieldVectors)
            for (s = 0; s < C.length; s++) {
              R = C[s]
              var _ = Q.FieldRef.fromString(R)
              n[R] = new Q.MatchData()
            }
          }
          for (s = 0; s < C.length; s++) {
            var M = (_ = Q.FieldRef.fromString(C[s])).docRef
            if (I.contains(M) && !O.contains(M)) {
              var A,
                D = this.fieldVectors[_],
                B = r[_.fieldName].similarity(D)
              if (void 0 !== (A = j[M]))
                (A.score += B), A.matchData.combine(n[_])
              else {
                var z = { ref: M, score: B, matchData: n[_] }
                ;(j[M] = z), F.push(z)
              }
            }
          }
          return F.sort(function (e, t) {
            return t.score - e.score
          })
        }),
        (Q.Index.prototype.toJSON = function () {
          var e = Object.keys(this.invertedIndex)
              .sort()
              .map(function (e) {
                return [e, this.invertedIndex[e]]
              }, this),
            t = Object.keys(this.fieldVectors).map(function (e) {
              return [e, this.fieldVectors[e].toJSON()]
            }, this)
          return {
            version: Q.version,
            fields: this.fields,
            fieldVectors: t,
            invertedIndex: e,
            pipeline: this.pipeline.toJSON(),
          }
        }),
        (Q.Index.load = function (e) {
          var t = {},
            n = {},
            r = e.fieldVectors,
            i = Object.create(null),
            o = e.invertedIndex,
            a = new Q.TokenSet.Builder(),
            s = Q.Pipeline.load(e.pipeline)
          e.version != Q.version &&
            Q.utils.warn(
              "Version mismatch when loading serialised index. Current version of lunr '" +
                Q.version +
                "' does not match serialized index '" +
                e.version +
                "'"
            )
          for (var l = 0; l < r.length; l++) {
            var c = (d = r[l])[0],
              u = d[1]
            n[c] = new Q.Vector(u)
          }
          for (l = 0; l < o.length; l++) {
            var d,
              h = (d = o[l])[0],
              f = d[1]
            a.insert(h), (i[h] = f)
          }
          return (
            a.finish(),
            (t.fields = e.fields),
            (t.fieldVectors = n),
            (t.invertedIndex = i),
            (t.tokenSet = a.root),
            (t.pipeline = s),
            new Q.Index(t)
          )
        }),
        /*!
         * lunr.Builder
         * Copyright (C) 2019 Oliver Nightingale
         */ (Q.Builder = function () {
          (this._ref = 'id'),
            (this._fields = Object.create(null)),
            (this._documents = Object.create(null)),
            (this.invertedIndex = Object.create(null)),
            (this.fieldTermFrequencies = {}),
            (this.fieldLengths = {}),
            (this.tokenizer = Q.tokenizer),
            (this.pipeline = new Q.Pipeline()),
            (this.searchPipeline = new Q.Pipeline()),
            (this.documentCount = 0),
            (this._b = 0.75),
            (this._k1 = 1.2),
            (this.termIndex = 0),
            (this.metadataWhitelist = [])
        }),
        (Q.Builder.prototype.ref = function (e) {
          this._ref = e
        }),
        (Q.Builder.prototype.field = function (e, t) {
          if (/\//.test(e))
            throw new RangeError(
              "Field '" + e + "' contains illegal character '/'"
            )
          this._fields[e] = t || {}
        }),
        (Q.Builder.prototype.b = function (e) {
          this._b = e < 0 ? 0 : e > 1 ? 1 : e
        }),
        (Q.Builder.prototype.k1 = function (e) {
          this._k1 = e
        }),
        (Q.Builder.prototype.add = function (e, t) {
          var n = e[this._ref],
            r = Object.keys(this._fields)
          ;(this._documents[n] = t || {}), (this.documentCount += 1)
          for (var i = 0; i < r.length; i++) {
            var o = r[i],
              a = this._fields[o].extractor,
              s = a ? a(e) : e[o],
              l = this.tokenizer(s, { fields: [o] }),
              c = this.pipeline.run(l),
              u = new Q.FieldRef(n, o),
              d = Object.create(null)
            ;(this.fieldTermFrequencies[u] = d),
              (this.fieldLengths[u] = 0),
              (this.fieldLengths[u] += c.length)
            for (var h = 0; h < c.length; h++) {
              var f = c[h]
              if (
                (null == d[f] && (d[f] = 0),
                (d[f] += 1),
                null == this.invertedIndex[f])
              ) {
                var p = Object.create(null)
                ;(p._index = this.termIndex), (this.termIndex += 1)
                for (var m = 0; m < r.length; m++) p[r[m]] = Object.create(null)
                this.invertedIndex[f] = p
              }
              null == this.invertedIndex[f][o][n] &&
                (this.invertedIndex[f][o][n] = Object.create(null))
              for (var g = 0; g < this.metadataWhitelist.length; g++) {
                var y = this.metadataWhitelist[g],
                  v = f.metadata[y]
                null == this.invertedIndex[f][o][n][y] &&
                  (this.invertedIndex[f][o][n][y] = []),
                  this.invertedIndex[f][o][n][y].push(v)
              }
            }
          }
        }),
        (Q.Builder.prototype.calculateAverageFieldLengths = function () {
          for (
            var e = Object.keys(this.fieldLengths),
              t = e.length,
              n = {},
              r = {},
              i = 0;
            i < t;
            i++
          ) {
            var o = Q.FieldRef.fromString(e[i]),
              a = o.fieldName
            r[a] || (r[a] = 0),
              (r[a] += 1),
              n[a] || (n[a] = 0),
              (n[a] += this.fieldLengths[o])
          }
          var s = Object.keys(this._fields)
          for (i = 0; i < s.length; i++) {
            var l = s[i]
            n[l] = n[l] / r[l]
          }
          this.averageFieldLength = n
        }),
        (Q.Builder.prototype.createFieldVectors = function () {
          for (
            var e = {},
              t = Object.keys(this.fieldTermFrequencies),
              n = t.length,
              r = Object.create(null),
              i = 0;
            i < n;
            i++
          ) {
            for (
              var o = Q.FieldRef.fromString(t[i]),
                a = o.fieldName,
                s = this.fieldLengths[o],
                l = new Q.Vector(),
                c = this.fieldTermFrequencies[o],
                u = Object.keys(c),
                d = u.length,
                h = this._fields[a].boost || 1,
                f = this._documents[o.docRef].boost || 1,
                p = 0;
              p < d;
              p++
            ) {
              var m,
                g,
                y,
                v = u[p],
                x = c[v],
                b = this.invertedIndex[v]._index
              void 0 === r[v]
                ? ((m = Q.idf(this.invertedIndex[v], this.documentCount)),
                  (r[v] = m))
                : (m = r[v]),
                (g =
                  (m * ((this._k1 + 1) * x)) /
                  (this._k1 *
                    (1 - this._b + this._b * (s / this.averageFieldLength[a])) +
                    x)),
                (g *= h),
                (g *= f),
                (y = Math.round(1e3 * g) / 1e3),
                l.insert(b, y)
            }
            e[o] = l
          }
          this.fieldVectors = e
        }),
        (Q.Builder.prototype.createTokenSet = function () {
          this.tokenSet = Q.TokenSet.fromArray(
            Object.keys(this.invertedIndex).sort()
          )
        }),
        (Q.Builder.prototype.build = function () {
          return (
            this.calculateAverageFieldLengths(),
            this.createFieldVectors(),
            this.createTokenSet(),
            new Q.Index({
              invertedIndex: this.invertedIndex,
              fieldVectors: this.fieldVectors,
              tokenSet: this.tokenSet,
              fields: Object.keys(this._fields),
              pipeline: this.searchPipeline,
            })
          )
        }),
        (Q.Builder.prototype.use = function (e) {
          var t = Array.prototype.slice.call(arguments, 1)
          t.unshift(this), e.apply(this, t)
        }),
        (Q.MatchData = function (e, t, n) {
          for (
            var r = Object.create(null), i = Object.keys(n || {}), o = 0;
            o < i.length;
            o++
          ) {
            var a = i[o]
            r[a] = n[a].slice()
          }
          (this.metadata = Object.create(null)),
            void 0 !== e &&
              ((this.metadata[e] = Object.create(null)),
              (this.metadata[e][t] = r))
        }),
        (Q.MatchData.prototype.combine = function (e) {
          for (var t = Object.keys(e.metadata), n = 0; n < t.length; n++) {
            var r = t[n],
              i = Object.keys(e.metadata[r])
            null == this.metadata[r] && (this.metadata[r] = Object.create(null))
            for (var o = 0; o < i.length; o++) {
              var a = i[o],
                s = Object.keys(e.metadata[r][a])
              null == this.metadata[r][a] &&
                (this.metadata[r][a] = Object.create(null))
              for (var l = 0; l < s.length; l++) {
                var c = s[l]
                null == this.metadata[r][a][c]
                  ? (this.metadata[r][a][c] = e.metadata[r][a][c])
                  : (this.metadata[r][a][c] = this.metadata[r][a][c].concat(
                      e.metadata[r][a][c]
                    ))
              }
            }
          }
        }),
        (Q.MatchData.prototype.add = function (e, t, n) {
          if (!(e in this.metadata))
            return (
              (this.metadata[e] = Object.create(null)),
              void (this.metadata[e][t] = n)
            )
          if (t in this.metadata[e])
            for (var r = Object.keys(n), i = 0; i < r.length; i++) {
              var o = r[i]
              o in this.metadata[e][t]
                ? (this.metadata[e][t][o] = this.metadata[e][t][o].concat(n[o]))
                : (this.metadata[e][t][o] = n[o])
            }
          else this.metadata[e][t] = n
        }),
        (Q.Query = function (e) {
          (this.clauses = []), (this.allFields = e)
        }),
        (Q.Query.wildcard = new String('*')),
        (Q.Query.wildcard.NONE = 0),
        (Q.Query.wildcard.LEADING = 1),
        (Q.Query.wildcard.TRAILING = 2),
        (Q.Query.presence = { OPTIONAL: 1, REQUIRED: 2, PROHIBITED: 3 }),
        (Q.Query.prototype.clause = function (e) {
          return (
            'fields' in e || (e.fields = this.allFields),
            'boost' in e || (e.boost = 1),
            'usePipeline' in e || (e.usePipeline = !0),
            'wildcard' in e || (e.wildcard = Q.Query.wildcard.NONE),
            e.wildcard & Q.Query.wildcard.LEADING &&
              e.term.charAt(0) != Q.Query.wildcard &&
              (e.term = '*' + e.term),
            e.wildcard & Q.Query.wildcard.TRAILING &&
              e.term.slice(-1) != Q.Query.wildcard &&
              (e.term = e.term + '*'),
            'presence' in e || (e.presence = Q.Query.presence.OPTIONAL),
            this.clauses.push(e),
            this
          )
        }),
        (Q.Query.prototype.isNegated = function () {
          for (var e = 0; e < this.clauses.length; e++)
            if (this.clauses[e].presence != Q.Query.presence.PROHIBITED)
              return !1
          return !0
        }),
        (Q.Query.prototype.term = function (e, t) {
          if (Array.isArray(e))
            return (
              e.forEach(function (e) {
                this.term(e, Q.utils.clone(t))
              }, this),
              this
            )
          var n = t || {}
          return (n.term = e.toString()), this.clause(n), this
        }),
        (Q.QueryParseError = function (e, t, n) {
          (this.name = 'QueryParseError'),
            (this.message = e),
            (this.start = t),
            (this.end = n)
        }),
        (Q.QueryParseError.prototype = new Error()),
        (Q.QueryLexer = function (e) {
          (this.lexemes = []),
            (this.str = e),
            (this.length = e.length),
            (this.pos = 0),
            (this.start = 0),
            (this.escapeCharPositions = [])
        }),
        (Q.QueryLexer.prototype.run = function () {
          for (var e = Q.QueryLexer.lexText; e; ) e = e(this)
        }),
        (Q.QueryLexer.prototype.sliceString = function () {
          for (
            var e = [], t = this.start, n = this.pos, r = 0;
            r < this.escapeCharPositions.length;
            r++
          )
            (n = this.escapeCharPositions[r]),
              e.push(this.str.slice(t, n)),
              (t = n + 1)
          return (
            e.push(this.str.slice(t, this.pos)),
            (this.escapeCharPositions.length = 0),
            e.join('')
          )
        }),
        (Q.QueryLexer.prototype.emit = function (e) {
          this.lexemes.push({
            type: e,
            str: this.sliceString(),
            start: this.start,
            end: this.pos,
          }),
            (this.start = this.pos)
        }),
        (Q.QueryLexer.prototype.escapeCharacter = function () {
          this.escapeCharPositions.push(this.pos - 1), (this.pos += 1)
        }),
        (Q.QueryLexer.prototype.next = function () {
          if (this.pos >= this.length) return Q.QueryLexer.EOS
          var e = this.str.charAt(this.pos)
          return (this.pos += 1), e
        }),
        (Q.QueryLexer.prototype.width = function () {
          return this.pos - this.start
        }),
        (Q.QueryLexer.prototype.ignore = function () {
          this.start == this.pos && (this.pos += 1), (this.start = this.pos)
        }),
        (Q.QueryLexer.prototype.backup = function () {
          this.pos -= 1
        }),
        (Q.QueryLexer.prototype.acceptDigitRun = function () {
          var e, t
          do {
            t = (e = this.next()).charCodeAt(0)
          } while (t > 47 && t < 58)
          e != Q.QueryLexer.EOS && this.backup()
        }),
        (Q.QueryLexer.prototype.more = function () {
          return this.pos < this.length
        }),
        (Q.QueryLexer.EOS = 'EOS'),
        (Q.QueryLexer.FIELD = 'FIELD'),
        (Q.QueryLexer.TERM = 'TERM'),
        (Q.QueryLexer.EDIT_DISTANCE = 'EDIT_DISTANCE'),
        (Q.QueryLexer.BOOST = 'BOOST'),
        (Q.QueryLexer.PRESENCE = 'PRESENCE'),
        (Q.QueryLexer.lexField = function (e) {
          return (
            e.backup(),
            e.emit(Q.QueryLexer.FIELD),
            e.ignore(),
            Q.QueryLexer.lexText
          )
        }),
        (Q.QueryLexer.lexTerm = function (e) {
          if (
            (e.width() > 1 && (e.backup(), e.emit(Q.QueryLexer.TERM)),
            e.ignore(),
            e.more())
          )
            return Q.QueryLexer.lexText
        }),
        (Q.QueryLexer.lexEditDistance = function (e) {
          return (
            e.ignore(),
            e.acceptDigitRun(),
            e.emit(Q.QueryLexer.EDIT_DISTANCE),
            Q.QueryLexer.lexText
          )
        }),
        (Q.QueryLexer.lexBoost = function (e) {
          return (
            e.ignore(),
            e.acceptDigitRun(),
            e.emit(Q.QueryLexer.BOOST),
            Q.QueryLexer.lexText
          )
        }),
        (Q.QueryLexer.lexEOS = function (e) {
          e.width() > 0 && e.emit(Q.QueryLexer.TERM)
        }),
        (Q.QueryLexer.termSeparator = Q.tokenizer.separator),
        (Q.QueryLexer.lexText = function (e) {
          for (;;) {
            var t = e.next()
            if (t == Q.QueryLexer.EOS) return Q.QueryLexer.lexEOS
            if (92 != t.charCodeAt(0)) {
              if (':' == t) return Q.QueryLexer.lexField
              if ('~' == t)
                return (
                  e.backup(),
                  e.width() > 0 && e.emit(Q.QueryLexer.TERM),
                  Q.QueryLexer.lexEditDistance
                )
              if ('^' == t)
                return (
                  e.backup(),
                  e.width() > 0 && e.emit(Q.QueryLexer.TERM),
                  Q.QueryLexer.lexBoost
                )
              if ('+' == t && 1 === e.width())
                return e.emit(Q.QueryLexer.PRESENCE), Q.QueryLexer.lexText
              if ('-' == t && 1 === e.width())
                return e.emit(Q.QueryLexer.PRESENCE), Q.QueryLexer.lexText
              if (t.match(Q.QueryLexer.termSeparator))
                return Q.QueryLexer.lexTerm
            } else e.escapeCharacter()
          }
        }),
        (Q.QueryParser = function (e, t) {
          (this.lexer = new Q.QueryLexer(e)),
            (this.query = t),
            (this.currentClause = {}),
            (this.lexemeIdx = 0)
        }),
        (Q.QueryParser.prototype.parse = function () {
          this.lexer.run(), (this.lexemes = this.lexer.lexemes)
          for (var e = Q.QueryParser.parseClause; e; ) e = e(this)
          return this.query
        }),
        (Q.QueryParser.prototype.peekLexeme = function () {
          return this.lexemes[this.lexemeIdx]
        }),
        (Q.QueryParser.prototype.consumeLexeme = function () {
          var e = this.peekLexeme()
          return (this.lexemeIdx += 1), e
        }),
        (Q.QueryParser.prototype.nextClause = function () {
          var e = this.currentClause
          this.query.clause(e), (this.currentClause = {})
        }),
        (Q.QueryParser.parseClause = function (e) {
          var t = e.peekLexeme()
          if (null != t)
            switch (t.type) {
              case Q.QueryLexer.PRESENCE:
                return Q.QueryParser.parsePresence
              case Q.QueryLexer.FIELD:
                return Q.QueryParser.parseField
              case Q.QueryLexer.TERM:
                return Q.QueryParser.parseTerm
              default:
                var n = 'expected either a field or a term, found ' + t.type
                throw (
                  (t.str.length >= 1 && (n += " with value '" + t.str + "'"),
                  new Q.QueryParseError(n, t.start, t.end))
                )
            }
        }),
        (Q.QueryParser.parsePresence = function (e) {
          var t = e.consumeLexeme()
          if (null != t) {
            switch (t.str) {
              case '-':
                e.currentClause.presence = Q.Query.presence.PROHIBITED
                break
              case '+':
                e.currentClause.presence = Q.Query.presence.REQUIRED
                break
              default:
                var n = "unrecognised presence operator'" + t.str + "'"
                throw new Q.QueryParseError(n, t.start, t.end)
            }
            var r = e.peekLexeme()
            if (null == r) {
              n = 'expecting term or field, found nothing'
              throw new Q.QueryParseError(n, t.start, t.end)
            }
            switch (r.type) {
              case Q.QueryLexer.FIELD:
                return Q.QueryParser.parseField
              case Q.QueryLexer.TERM:
                return Q.QueryParser.parseTerm
              default:
                n = "expecting term or field, found '" + r.type + "'"
                throw new Q.QueryParseError(n, r.start, r.end)
            }
          }
        }),
        (Q.QueryParser.parseField = function (e) {
          var t = e.consumeLexeme()
          if (null != t) {
            if (-1 == e.query.allFields.indexOf(t.str)) {
              var n = e.query.allFields
                  .map(function (e) {
                    return "'" + e + "'"
                  })
                  .join(', '),
                r = "unrecognised field '" + t.str + "', possible fields: " + n
              throw new Q.QueryParseError(r, t.start, t.end)
            }
            e.currentClause.fields = [t.str]
            var i = e.peekLexeme()
            if (null == i) {
              r = 'expecting term, found nothing'
              throw new Q.QueryParseError(r, t.start, t.end)
            }
            switch (i.type) {
              case Q.QueryLexer.TERM:
                return Q.QueryParser.parseTerm
              default:
                r = "expecting term, found '" + i.type + "'"
                throw new Q.QueryParseError(r, i.start, i.end)
            }
          }
        }),
        (Q.QueryParser.parseTerm = function (e) {
          var t = e.consumeLexeme()
          if (null != t) {
            (e.currentClause.term = t.str.toLowerCase()),
              -1 != t.str.indexOf('*') && (e.currentClause.usePipeline = !1)
            var n = e.peekLexeme()
            if (null != n)
              switch (n.type) {
                case Q.QueryLexer.TERM:
                  return e.nextClause(), Q.QueryParser.parseTerm
                case Q.QueryLexer.FIELD:
                  return e.nextClause(), Q.QueryParser.parseField
                case Q.QueryLexer.EDIT_DISTANCE:
                  return Q.QueryParser.parseEditDistance
                case Q.QueryLexer.BOOST:
                  return Q.QueryParser.parseBoost
                case Q.QueryLexer.PRESENCE:
                  return e.nextClause(), Q.QueryParser.parsePresence
                default:
                  var r = "Unexpected lexeme type '" + n.type + "'"
                  throw new Q.QueryParseError(r, n.start, n.end)
              }
            else e.nextClause()
          }
        }),
        (Q.QueryParser.parseEditDistance = function (e) {
          var t = e.consumeLexeme()
          if (null != t) {
            var n = parseInt(t.str, 10)
            if (isNaN(n)) {
              var r = 'edit distance must be numeric'
              throw new Q.QueryParseError(r, t.start, t.end)
            }
            e.currentClause.editDistance = n
            var i = e.peekLexeme()
            if (null != i)
              switch (i.type) {
                case Q.QueryLexer.TERM:
                  return e.nextClause(), Q.QueryParser.parseTerm
                case Q.QueryLexer.FIELD:
                  return e.nextClause(), Q.QueryParser.parseField
                case Q.QueryLexer.EDIT_DISTANCE:
                  return Q.QueryParser.parseEditDistance
                case Q.QueryLexer.BOOST:
                  return Q.QueryParser.parseBoost
                case Q.QueryLexer.PRESENCE:
                  return e.nextClause(), Q.QueryParser.parsePresence
                default:
                  r = "Unexpected lexeme type '" + i.type + "'"
                  throw new Q.QueryParseError(r, i.start, i.end)
              }
            else e.nextClause()
          }
        }),
        (Q.QueryParser.parseBoost = function (e) {
          var t = e.consumeLexeme()
          if (null != t) {
            var n = parseInt(t.str, 10)
            if (isNaN(n)) {
              var r = 'boost must be numeric'
              throw new Q.QueryParseError(r, t.start, t.end)
            }
            e.currentClause.boost = n
            var i = e.peekLexeme()
            if (null != i)
              switch (i.type) {
                case Q.QueryLexer.TERM:
                  return e.nextClause(), Q.QueryParser.parseTerm
                case Q.QueryLexer.FIELD:
                  return e.nextClause(), Q.QueryParser.parseField
                case Q.QueryLexer.EDIT_DISTANCE:
                  return Q.QueryParser.parseEditDistance
                case Q.QueryLexer.BOOST:
                  return Q.QueryParser.parseBoost
                case Q.QueryLexer.PRESENCE:
                  return e.nextClause(), Q.QueryParser.parsePresence
                default:
                  r = "Unexpected lexeme type '" + i.type + "'"
                  throw new Q.QueryParseError(r, i.start, i.end)
              }
            else e.nextClause()
          }
        }),
        void 0 ===
          (i =
            'function' ==
            typeof (r = function () {
              return Q
            })
              ? r.call(t, n, t, e)
              : r) || (e.exports = i)
    })()
  },
  function (e, t, n) {
    'use strict'
    var r,
      i = function () {
        return (
          void 0 === r &&
            (r = Boolean(window && document && document.all && !window.atob)),
          r
        )
      },
      o = (function () {
        var e = {}
        return function (t) {
          if (void 0 === e[t]) {
            var n = document.querySelector(t)
            if (
              window.HTMLIFrameElement &&
              n instanceof window.HTMLIFrameElement
            )
              try {
                n = n.contentDocument.head
              } catch (e) {
                n = null
              }
            e[t] = n
          }
          return e[t]
        }
      })(),
      a = []
    function s(e) {
      for (var t = -1, n = 0; n < a.length; n++)
        if (a[n].identifier === e) {
          t = n
          break
        }
      return t
    }
    function l(e, t) {
      for (var n = {}, r = [], i = 0; i < e.length; i++) {
        var o = e[i],
          l = t.base ? o[0] + t.base : o[0],
          c = n[l] || 0,
          u = ''.concat(l, ' ').concat(c)
        n[l] = c + 1
        var d = s(u),
          h = { css: o[1], media: o[2], sourceMap: o[3] }
        ;-1 !== d
          ? (a[d].references++, a[d].updater(h))
          : a.push({ identifier: u, updater: g(h, t), references: 1 }),
          r.push(u)
      }
      return r
    }
    function c(e) {
      var t = document.createElement('style'),
        r = e.attributes || {}
      if (void 0 === r.nonce) {
        var i = n.nc
        i && (r.nonce = i)
      }
      if (
        (Object.keys(r).forEach(function (e) {
          t.setAttribute(e, r[e])
        }),
        'function' == typeof e.insert)
      )
        e.insert(t)
      else {
        var a = o(e.insert || 'head')
        if (!a)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          )
        a.appendChild(t)
      }
      return t
    }
    var u,
      d =
        ((u = []),
        function (e, t) {
          return (u[e] = t), u.filter(Boolean).join('\n')
        })
    function h(e, t, n, r) {
      var i = n
        ? ''
        : r.media
        ? '@media '.concat(r.media, ' {').concat(r.css, '}')
        : r.css
      if (e.styleSheet) e.styleSheet.cssText = d(t, i)
      else {
        var o = document.createTextNode(i),
          a = e.childNodes
        a[t] && e.removeChild(a[t]),
          a.length ? e.insertBefore(o, a[t]) : e.appendChild(o)
      }
    }
    function f(e, t, n) {
      var r = n.css,
        i = n.media,
        o = n.sourceMap
      if (
        (i ? e.setAttribute('media', i) : e.removeAttribute('media'),
        o &&
          btoa &&
          (r += '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(o)))),
            ' */'
          )),
        e.styleSheet)
      )
        e.styleSheet.cssText = r
      else {
        for (; e.firstChild; ) e.removeChild(e.firstChild)
        e.appendChild(document.createTextNode(r))
      }
    }
    var p = null,
      m = 0
    function g(e, t) {
      var n, r, i
      if (t.singleton) {
        var o = m++
        ;(n = p || (p = c(t))),
          (r = h.bind(null, n, o, !1)),
          (i = h.bind(null, n, o, !0))
      } else
        (n = c(t)),
          (r = f.bind(null, n, t)),
          (i = function () {
            !(function (e) {
              if (null === e.parentNode) return !1
              e.parentNode.removeChild(e)
            })(n)
          })
      return (
        r(e),
        function (t) {
          if (t) {
            if (
              t.css === e.css &&
              t.media === e.media &&
              t.sourceMap === e.sourceMap
            )
              return
            r((e = t))
          } else i()
        }
      )
    }
    e.exports = function (e, t) {
      (t = t || {}).singleton ||
        'boolean' == typeof t.singleton ||
        (t.singleton = i())
      var n = l((e = e || []), t)
      return function (e) {
        if (
          ((e = e || []),
          '[object Array]' === Object.prototype.toString.call(e))
        ) {
          for (var r = 0; r < n.length; r++) {
            var i = s(n[r])
            a[i].references--
          }
          for (var o = l(e, t), c = 0; c < n.length; c++) {
            var u = s(n[c])
            0 === a[u].references && (a[u].updater(), a.splice(u, 1))
          }
          n = o
        }
      }
    }
  },
  function (e, t, n) {
    'use strict'
    e.exports = function (e) {
      var t = []
      return (
        (t.toString = function () {
          return this.map(function (t) {
            var n = (function (e, t) {
              var n = e[1] || '',
                r = e[3]
              if (!r) return n
              if (t && 'function' == typeof btoa) {
                var i =
                    ((a = r),
                    (s = btoa(unescape(encodeURIComponent(JSON.stringify(a))))),
                    (l = 'sourceMappingURL=data:application/json;charset=utf-8;base64,'.concat(
                      s
                    )),
                    '/*# '.concat(l, ' */')),
                  o = r.sources.map(function (e) {
                    return '/*# sourceURL='
                      .concat(r.sourceRoot || '')
                      .concat(e, ' */')
                  })
                return [n].concat(o).concat([i]).join('\n')
              }
              var a, s, l
              return [n].join('\n')
            })(t, e)
            return t[2] ? '@media '.concat(t[2], ' {').concat(n, '}') : n
          }).join('')
        }),
        (t.i = function (e, n, r) {
          'string' == typeof e && (e = [[null, e, '']])
          var i = {}
          if (r)
            for (var o = 0; o < this.length; o++) {
              var a = this[o][0]
              null != a && (i[a] = !0)
            }
          for (var s = 0; s < e.length; s++) {
            var l = [].concat(e[s])
            ;(r && i[l[0]]) ||
              (n &&
                (l[2]
                  ? (l[2] = ''.concat(n, ' and ').concat(l[2]))
                  : (l[2] = n)),
              t.push(l))
          }
        }),
        t
      )
    }
  },
  function (e, t, n) {
    /*!***************************************************
     * mark.js v8.11.1
     * https://markjs.io/
     * Copyright (c) 2014–2018, Julian Kühnel
     * Released under the MIT license https://git.io/vwTVl
     *****************************************************/
    e.exports = (function () {
      'use strict'
      var e =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              },
        t = function (e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function')
        },
        n = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n]
              ;(r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r)
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        })(),
        r =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t]
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
          },
        i = (function () {
          function e(n) {
            var r =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1],
              i =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : [],
              o =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : 5e3
            t(this, e),
              (this.ctx = n),
              (this.iframes = r),
              (this.exclude = i),
              (this.iframesTimeout = o)
          }
          return (
            n(
              e,
              [
                {
                  key: 'getContexts',
                  value: function () {
                    var e = []
                    return (
                      (void 0 !== this.ctx && this.ctx
                        ? NodeList.prototype.isPrototypeOf(this.ctx)
                          ? Array.prototype.slice.call(this.ctx)
                          : Array.isArray(this.ctx)
                          ? this.ctx
                          : 'string' == typeof this.ctx
                          ? Array.prototype.slice.call(
                              document.querySelectorAll(this.ctx)
                            )
                          : [this.ctx]
                        : []
                      ).forEach(function (t) {
                        var n =
                          e.filter(function (e) {
                            return e.contains(t)
                          }).length > 0
                        ;-1 !== e.indexOf(t) || n || e.push(t)
                      }),
                      e
                    )
                  },
                },
                {
                  key: 'getIframeContents',
                  value: function (e, t) {
                    var n =
                        arguments.length > 2 && void 0 !== arguments[2]
                          ? arguments[2]
                          : function () {},
                      r = void 0
                    try {
                      var i = e.contentWindow
                      if (((r = i.document), !i || !r))
                        throw new Error('iframe inaccessible')
                    } catch (e) {
                      n()
                    }
                    r && t(r)
                  },
                },
                {
                  key: 'isIframeBlank',
                  value: function (e) {
                    var t = 'about:blank',
                      n = e.getAttribute('src').trim()
                    return e.contentWindow.location.href === t && n !== t && n
                  },
                },
                {
                  key: 'observeIframeLoad',
                  value: function (e, t, n) {
                    var r = this,
                      i = !1,
                      o = null,
                      a = function a() {
                        if (!i) {
                          (i = !0), clearTimeout(o)
                          try {
                            r.isIframeBlank(e) ||
                              (e.removeEventListener('load', a),
                              r.getIframeContents(e, t, n))
                          } catch (e) {
                            n()
                          }
                        }
                      }
                    e.addEventListener('load', a),
                      (o = setTimeout(a, this.iframesTimeout))
                  },
                },
                {
                  key: 'onIframeReady',
                  value: function (e, t, n) {
                    try {
                      'complete' === e.contentWindow.document.readyState
                        ? this.isIframeBlank(e)
                          ? this.observeIframeLoad(e, t, n)
                          : this.getIframeContents(e, t, n)
                        : this.observeIframeLoad(e, t, n)
                    } catch (e) {
                      n()
                    }
                  },
                },
                {
                  key: 'waitForIframes',
                  value: function (e, t) {
                    var n = this,
                      r = 0
                    this.forEachIframe(
                      e,
                      function () {
                        return !0
                      },
                      function (e) {
                        r++,
                          n.waitForIframes(
                            e.querySelector('html'),
                            function () {
                              --r || t()
                            }
                          )
                      },
                      function (e) {
                        e || t()
                      }
                    )
                  },
                },
                {
                  key: 'forEachIframe',
                  value: function (t, n, r) {
                    var i = this,
                      o =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : function () {},
                      a = t.querySelectorAll('iframe'),
                      s = a.length,
                      l = 0
                    a = Array.prototype.slice.call(a)
                    var c = function () {
                      --s <= 0 && o(l)
                    }
                    s || c(),
                      a.forEach(function (t) {
                        e.matches(t, i.exclude)
                          ? c()
                          : i.onIframeReady(
                              t,
                              function (e) {
                                n(t) && (l++, r(e)), c()
                              },
                              c
                            )
                      })
                  },
                },
                {
                  key: 'createIterator',
                  value: function (e, t, n) {
                    return document.createNodeIterator(e, t, n, !1)
                  },
                },
                {
                  key: 'createInstanceOnIframe',
                  value: function (t) {
                    return new e(t.querySelector('html'), this.iframes)
                  },
                },
                {
                  key: 'compareNodeIframe',
                  value: function (e, t, n) {
                    if (
                      e.compareDocumentPosition(n) &
                      Node.DOCUMENT_POSITION_PRECEDING
                    ) {
                      if (null === t) return !0
                      if (
                        t.compareDocumentPosition(n) &
                        Node.DOCUMENT_POSITION_FOLLOWING
                      )
                        return !0
                    }
                    return !1
                  },
                },
                {
                  key: 'getIteratorNode',
                  value: function (e) {
                    var t = e.previousNode()
                    return {
                      prevNode: t,
                      node: (null === t || e.nextNode()) && e.nextNode(),
                    }
                  },
                },
                {
                  key: 'checkIframeFilter',
                  value: function (e, t, n, r) {
                    var i = !1,
                      o = !1
                    return (
                      r.forEach(function (e, t) {
                        e.val === n && ((i = t), (o = e.handled))
                      }),
                      this.compareNodeIframe(e, t, n)
                        ? (!1 !== i || o
                            ? !1 === i || o || (r[i].handled = !0)
                            : r.push({ val: n, handled: !0 }),
                          !0)
                        : (!1 === i && r.push({ val: n, handled: !1 }), !1)
                    )
                  },
                },
                {
                  key: 'handleOpenIframes',
                  value: function (e, t, n, r) {
                    var i = this
                    e.forEach(function (e) {
                      e.handled ||
                        i.getIframeContents(e.val, function (e) {
                          i.createInstanceOnIframe(e).forEachNode(t, n, r)
                        })
                    })
                  },
                },
                {
                  key: 'iterateThroughNodes',
                  value: function (e, t, n, r, i) {
                    for (
                      var o,
                        a = this,
                        s = this.createIterator(t, e, r),
                        l = [],
                        c = [],
                        u = void 0,
                        d = void 0;
                      (o = void 0),
                        (o = a.getIteratorNode(s)),
                        (d = o.prevNode),
                        (u = o.node);

                    )
                      this.iframes &&
                        this.forEachIframe(
                          t,
                          function (e) {
                            return a.checkIframeFilter(u, d, e, l)
                          },
                          function (t) {
                            a.createInstanceOnIframe(t).forEachNode(
                              e,
                              function (e) {
                                return c.push(e)
                              },
                              r
                            )
                          }
                        ),
                        c.push(u)
                    c.forEach(function (e) {
                      n(e)
                    }),
                      this.iframes && this.handleOpenIframes(l, e, n, r),
                      i()
                  },
                },
                {
                  key: 'forEachNode',
                  value: function (e, t, n) {
                    var r = this,
                      i =
                        arguments.length > 3 && void 0 !== arguments[3]
                          ? arguments[3]
                          : function () {},
                      o = this.getContexts(),
                      a = o.length
                    a || i(),
                      o.forEach(function (o) {
                        var s = function () {
                          r.iterateThroughNodes(e, o, t, n, function () {
                            --a <= 0 && i()
                          })
                        }
                        r.iframes ? r.waitForIframes(o, s) : s()
                      })
                  },
                },
              ],
              [
                {
                  key: 'matches',
                  value: function (e, t) {
                    var n = 'string' == typeof t ? [t] : t,
                      r =
                        e.matches ||
                        e.matchesSelector ||
                        e.msMatchesSelector ||
                        e.mozMatchesSelector ||
                        e.oMatchesSelector ||
                        e.webkitMatchesSelector
                    if (r) {
                      var i = !1
                      return (
                        n.every(function (t) {
                          return !r.call(e, t) || ((i = !0), !1)
                        }),
                        i
                      )
                    }
                    return !1
                  },
                },
              ]
            ),
            e
          )
        })(),
        o = (function () {
          function o(e) {
            t(this, o), (this.ctx = e), (this.ie = !1)
            var n = window.navigator.userAgent
            ;(n.indexOf('MSIE') > -1 || n.indexOf('Trident') > -1) &&
              (this.ie = !0)
          }
          return (
            n(o, [
              {
                key: 'log',
                value: function (t) {
                  var n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : 'debug',
                    r = this.opt.log
                  this.opt.debug &&
                    'object' === (void 0 === r ? 'undefined' : e(r)) &&
                    'function' == typeof r[n] &&
                    r[n]('mark.js: ' + t)
                },
              },
              {
                key: 'escapeStr',
                value: function (e) {
                  return e.replace(
                    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                    '\\$&'
                  )
                },
              },
              {
                key: 'createRegExp',
                value: function (e) {
                  return (
                    'disabled' !== this.opt.wildcards &&
                      (e = this.setupWildcardsRegExp(e)),
                    (e = this.escapeStr(e)),
                    Object.keys(this.opt.synonyms).length &&
                      (e = this.createSynonymsRegExp(e)),
                    (this.opt.ignoreJoiners ||
                      this.opt.ignorePunctuation.length) &&
                      (e = this.setupIgnoreJoinersRegExp(e)),
                    this.opt.diacritics && (e = this.createDiacriticsRegExp(e)),
                    (e = this.createMergedBlanksRegExp(e)),
                    (this.opt.ignoreJoiners ||
                      this.opt.ignorePunctuation.length) &&
                      (e = this.createJoinersRegExp(e)),
                    'disabled' !== this.opt.wildcards &&
                      (e = this.createWildcardsRegExp(e)),
                    (e = this.createAccuracyRegExp(e))
                  )
                },
              },
              {
                key: 'createSynonymsRegExp',
                value: function (e) {
                  var t = this.opt.synonyms,
                    n = this.opt.caseSensitive ? '' : 'i',
                    r =
                      this.opt.ignoreJoiners ||
                      this.opt.ignorePunctuation.length
                        ? '\0'
                        : ''
                  for (var i in t)
                    if (t.hasOwnProperty(i)) {
                      var o = t[i],
                        a =
                          'disabled' !== this.opt.wildcards
                            ? this.setupWildcardsRegExp(i)
                            : this.escapeStr(i),
                        s =
                          'disabled' !== this.opt.wildcards
                            ? this.setupWildcardsRegExp(o)
                            : this.escapeStr(o)
                      '' !== a &&
                        '' !== s &&
                        (e = e.replace(
                          new RegExp(
                            '(' +
                              this.escapeStr(a) +
                              '|' +
                              this.escapeStr(s) +
                              ')',
                            'gm' + n
                          ),
                          r +
                            '(' +
                            this.processSynomyms(a) +
                            '|' +
                            this.processSynomyms(s) +
                            ')' +
                            r
                        ))
                    }
                  return e
                },
              },
              {
                key: 'processSynomyms',
                value: function (e) {
                  return (
                    (this.opt.ignoreJoiners ||
                      this.opt.ignorePunctuation.length) &&
                      (e = this.setupIgnoreJoinersRegExp(e)),
                    e
                  )
                },
              },
              {
                key: 'setupWildcardsRegExp',
                value: function (e) {
                  return (e = e.replace(/(?:\\)*\?/g, function (e) {
                    return '\\' === e.charAt(0) ? '?' : ''
                  })).replace(/(?:\\)*\*/g, function (e) {
                    return '\\' === e.charAt(0) ? '*' : ''
                  })
                },
              },
              {
                key: 'createWildcardsRegExp',
                value: function (e) {
                  var t = 'withSpaces' === this.opt.wildcards
                  return e
                    .replace(/\u0001/g, t ? '[\\S\\s]?' : '\\S?')
                    .replace(/\u0002/g, t ? '[\\S\\s]*?' : '\\S*')
                },
              },
              {
                key: 'setupIgnoreJoinersRegExp',
                value: function (e) {
                  return e.replace(/[^(|)\\]/g, function (e, t, n) {
                    var r = n.charAt(t + 1)
                    return /[(|)\\]/.test(r) || '' === r ? e : e + '\0'
                  })
                },
              },
              {
                key: 'createJoinersRegExp',
                value: function (e) {
                  var t = [],
                    n = this.opt.ignorePunctuation
                  return (
                    Array.isArray(n) &&
                      n.length &&
                      t.push(this.escapeStr(n.join(''))),
                    this.opt.ignoreJoiners &&
                      t.push('\\u00ad\\u200b\\u200c\\u200d'),
                    t.length
                      ? e.split(/\u0000+/).join('[' + t.join('') + ']*')
                      : e
                  )
                },
              },
              {
                key: 'createDiacriticsRegExp',
                value: function (e) {
                  var t = this.opt.caseSensitive ? '' : 'i',
                    n = this.opt.caseSensitive
                      ? [
                          'aàáảãạăằắẳẵặâầấẩẫậäåāą',
                          'AÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ',
                          'cçćč',
                          'CÇĆČ',
                          'dđď',
                          'DĐĎ',
                          'eèéẻẽẹêềếểễệëěēę',
                          'EÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ',
                          'iìíỉĩịîïī',
                          'IÌÍỈĨỊÎÏĪ',
                          'lł',
                          'LŁ',
                          'nñňń',
                          'NÑŇŃ',
                          'oòóỏõọôồốổỗộơởỡớờợöøō',
                          'OÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ',
                          'rř',
                          'RŘ',
                          'sšśșş',
                          'SŠŚȘŞ',
                          'tťțţ',
                          'TŤȚŢ',
                          'uùúủũụưừứửữựûüůū',
                          'UÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ',
                          'yýỳỷỹỵÿ',
                          'YÝỲỶỸỴŸ',
                          'zžżź',
                          'ZŽŻŹ',
                        ]
                      : [
                          'aàáảãạăằắẳẵặâầấẩẫậäåāąAÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÄÅĀĄ',
                          'cçćčCÇĆČ',
                          'dđďDĐĎ',
                          'eèéẻẽẹêềếểễệëěēęEÈÉẺẼẸÊỀẾỂỄỆËĚĒĘ',
                          'iìíỉĩịîïīIÌÍỈĨỊÎÏĪ',
                          'lłLŁ',
                          'nñňńNÑŇŃ',
                          'oòóỏõọôồốổỗộơởỡớờợöøōOÒÓỎÕỌÔỒỐỔỖỘƠỞỠỚỜỢÖØŌ',
                          'rřRŘ',
                          'sšśșşSŠŚȘŞ',
                          'tťțţTŤȚŢ',
                          'uùúủũụưừứửữựûüůūUÙÚỦŨỤƯỪỨỬỮỰÛÜŮŪ',
                          'yýỳỷỹỵÿYÝỲỶỸỴŸ',
                          'zžżźZŽŻŹ',
                        ],
                    r = []
                  return (
                    e.split('').forEach(function (i) {
                      n.every(function (n) {
                        if (-1 !== n.indexOf(i)) {
                          if (r.indexOf(n) > -1) return !1
                          ;(e = e.replace(
                            new RegExp('[' + n + ']', 'gm' + t),
                            '[' + n + ']'
                          )),
                            r.push(n)
                        }
                        return !0
                      })
                    }),
                    e
                  )
                },
              },
              {
                key: 'createMergedBlanksRegExp',
                value: function (e) {
                  return e.replace(/[\s]+/gim, '[\\s]+')
                },
              },
              {
                key: 'createAccuracyRegExp',
                value: function (e) {
                  var t = this,
                    n = this.opt.accuracy,
                    r = 'string' == typeof n ? n : n.value,
                    i = 'string' == typeof n ? [] : n.limiters,
                    o = ''
                  switch (
                    (i.forEach(function (e) {
                      o += '|' + t.escapeStr(e)
                    }),
                    r)
                  ) {
                    case 'partially':
                    default:
                      return '()(' + e + ')'
                    case 'complementary':
                      return (
                        '()([^' +
                        (o =
                          '\\s' +
                          (o ||
                            this.escapeStr(
                              '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~¡¿'
                            ))) +
                        ']*' +
                        e +
                        '[^' +
                        o +
                        ']*)'
                      )
                    case 'exactly':
                      return '(^|\\s' + o + ')(' + e + ')(?=$|\\s' + o + ')'
                  }
                },
              },
              {
                key: 'getSeparatedKeywords',
                value: function (e) {
                  var t = this,
                    n = []
                  return (
                    e.forEach(function (e) {
                      t.opt.separateWordSearch
                        ? e.split(' ').forEach(function (e) {
                            e.trim() && -1 === n.indexOf(e) && n.push(e)
                          })
                        : e.trim() && -1 === n.indexOf(e) && n.push(e)
                    }),
                    {
                      keywords: n.sort(function (e, t) {
                        return t.length - e.length
                      }),
                      length: n.length,
                    }
                  )
                },
              },
              {
                key: 'isNumeric',
                value: function (e) {
                  return Number(parseFloat(e)) == e
                },
              },
              {
                key: 'checkRanges',
                value: function (e) {
                  var t = this
                  if (
                    !Array.isArray(e) ||
                    '[object Object]' !== Object.prototype.toString.call(e[0])
                  )
                    return (
                      this.log(
                        'markRanges() will only accept an array of objects'
                      ),
                      this.opt.noMatch(e),
                      []
                    )
                  var n = [],
                    r = 0
                  return (
                    e
                      .sort(function (e, t) {
                        return e.start - t.start
                      })
                      .forEach(function (e) {
                        var i = t.callNoMatchOnInvalidRanges(e, r),
                          o = i.start,
                          a = i.end
                        i.valid &&
                          ((e.start = o),
                          (e.length = a - o),
                          n.push(e),
                          (r = a))
                      }),
                    n
                  )
                },
              },
              {
                key: 'callNoMatchOnInvalidRanges',
                value: function (e, t) {
                  var n = void 0,
                    r = void 0,
                    i = !1
                  return (
                    e && void 0 !== e.start
                      ? ((r =
                          (n = parseInt(e.start, 10)) + parseInt(e.length, 10)),
                        this.isNumeric(e.start) &&
                        this.isNumeric(e.length) &&
                        r - t > 0 &&
                        r - n > 0
                          ? (i = !0)
                          : (this.log(
                              'Ignoring invalid or overlapping range: ' +
                                JSON.stringify(e)
                            ),
                            this.opt.noMatch(e)))
                      : (this.log(
                          'Ignoring invalid range: ' + JSON.stringify(e)
                        ),
                        this.opt.noMatch(e)),
                    { start: n, end: r, valid: i }
                  )
                },
              },
              {
                key: 'checkWhitespaceRanges',
                value: function (e, t, n) {
                  var r = void 0,
                    i = !0,
                    o = n.length,
                    a = t - o,
                    s = parseInt(e.start, 10) - a
                  return (
                    (r = (s = s > o ? o : s) + parseInt(e.length, 10)) > o &&
                      ((r = o),
                      this.log(
                        'End range automatically set to the max value of ' + o
                      )),
                    s < 0 || r - s < 0 || s > o || r > o
                      ? ((i = !1),
                        this.log('Invalid range: ' + JSON.stringify(e)),
                        this.opt.noMatch(e))
                      : '' === n.substring(s, r).replace(/\s+/g, '') &&
                        ((i = !1),
                        this.log(
                          'Skipping whitespace only range: ' + JSON.stringify(e)
                        ),
                        this.opt.noMatch(e)),
                    { start: s, end: r, valid: i }
                  )
                },
              },
              {
                key: 'getTextNodes',
                value: function (e) {
                  var t = this,
                    n = '',
                    r = []
                  this.iterator.forEachNode(
                    NodeFilter.SHOW_TEXT,
                    function (e) {
                      r.push({
                        start: n.length,
                        end: (n += e.textContent).length,
                        node: e,
                      })
                    },
                    function (e) {
                      return t.matchesExclude(e.parentNode)
                        ? NodeFilter.FILTER_REJECT
                        : NodeFilter.FILTER_ACCEPT
                    },
                    function () {
                      e({ value: n, nodes: r })
                    }
                  )
                },
              },
              {
                key: 'matchesExclude',
                value: function (e) {
                  return i.matches(
                    e,
                    this.opt.exclude.concat([
                      'script',
                      'style',
                      'title',
                      'head',
                      'html',
                    ])
                  )
                },
              },
              {
                key: 'wrapRangeInTextNode',
                value: function (e, t, n) {
                  var r = this.opt.element ? this.opt.element : 'mark',
                    i = e.splitText(t),
                    o = i.splitText(n - t),
                    a = document.createElement(r)
                  return (
                    a.setAttribute('data-markjs', 'true'),
                    this.opt.className &&
                      a.setAttribute('class', this.opt.className),
                    (a.textContent = i.textContent),
                    i.parentNode.replaceChild(a, i),
                    o
                  )
                },
              },
              {
                key: 'wrapRangeInMappedTextNode',
                value: function (e, t, n, r, i) {
                  var o = this
                  e.nodes.every(function (a, s) {
                    var l = e.nodes[s + 1]
                    if (void 0 === l || l.start > t) {
                      if (!r(a.node)) return !1
                      var c = t - a.start,
                        u = (n > a.end ? a.end : n) - a.start,
                        d = e.value.substr(0, a.start),
                        h = e.value.substr(u + a.start)
                      if (
                        ((a.node = o.wrapRangeInTextNode(a.node, c, u)),
                        (e.value = d + h),
                        e.nodes.forEach(function (t, n) {
                          n >= s &&
                            (e.nodes[n].start > 0 &&
                              n !== s &&
                              (e.nodes[n].start -= u),
                            (e.nodes[n].end -= u))
                        }),
                        (n -= u),
                        i(a.node.previousSibling, a.start),
                        !(n > a.end))
                      )
                        return !1
                      t = a.end
                    }
                    return !0
                  })
                },
              },
              {
                key: 'wrapMatches',
                value: function (e, t, n, r, i) {
                  var o = this,
                    a = 0 === t ? 0 : t + 1
                  this.getTextNodes(function (t) {
                    t.nodes.forEach(function (t) {
                      t = t.node
                      for (
                        var i = void 0;
                        null !== (i = e.exec(t.textContent)) && '' !== i[a];

                      )
                        if (n(i[a], t)) {
                          var s = i.index
                          if (0 !== a)
                            for (var l = 1; l < a; l++) s += i[l].length
                          ;(t = o.wrapRangeInTextNode(t, s, s + i[a].length)),
                            r(t.previousSibling),
                            (e.lastIndex = 0)
                        }
                    }),
                      i()
                  })
                },
              },
              {
                key: 'wrapMatchesAcrossElements',
                value: function (e, t, n, r, i) {
                  var o = this,
                    a = 0 === t ? 0 : t + 1
                  this.getTextNodes(function (t) {
                    for (
                      var s = void 0;
                      null !== (s = e.exec(t.value)) && '' !== s[a];

                    ) {
                      var l = s.index
                      if (0 !== a) for (var c = 1; c < a; c++) l += s[c].length
                      var u = l + s[a].length
                      o.wrapRangeInMappedTextNode(
                        t,
                        l,
                        u,
                        function (e) {
                          return n(s[a], e)
                        },
                        function (t, n) {
                          (e.lastIndex = n), r(t)
                        }
                      )
                    }
                    i()
                  })
                },
              },
              {
                key: 'wrapRangeFromIndex',
                value: function (e, t, n, r) {
                  var i = this
                  this.getTextNodes(function (o) {
                    var a = o.value.length
                    e.forEach(function (e, r) {
                      var s = i.checkWhitespaceRanges(e, a, o.value),
                        l = s.start,
                        c = s.end
                      s.valid &&
                        i.wrapRangeInMappedTextNode(
                          o,
                          l,
                          c,
                          function (n) {
                            return t(n, e, o.value.substring(l, c), r)
                          },
                          function (t) {
                            n(t, e)
                          }
                        )
                    }),
                      r()
                  })
                },
              },
              {
                key: 'unwrapMatches',
                value: function (e) {
                  for (
                    var t = e.parentNode, n = document.createDocumentFragment();
                    e.firstChild;

                  )
                    n.appendChild(e.removeChild(e.firstChild))
                  t.replaceChild(n, e),
                    this.ie ? this.normalizeTextNode(t) : t.normalize()
                },
              },
              {
                key: 'normalizeTextNode',
                value: function (e) {
                  if (e) {
                    if (3 === e.nodeType)
                      for (; e.nextSibling && 3 === e.nextSibling.nodeType; )
                        (e.nodeValue += e.nextSibling.nodeValue),
                          e.parentNode.removeChild(e.nextSibling)
                    else this.normalizeTextNode(e.firstChild)
                    this.normalizeTextNode(e.nextSibling)
                  }
                },
              },
              {
                key: 'markRegExp',
                value: function (e, t) {
                  var n = this
                  ;(this.opt = t),
                    this.log('Searching with expression "' + e + '"')
                  var r = 0,
                    i = 'wrapMatches'
                  this.opt.acrossElements && (i = 'wrapMatchesAcrossElements'),
                    this[i](
                      e,
                      this.opt.ignoreGroups,
                      function (e, t) {
                        return n.opt.filter(t, e, r)
                      },
                      function (e) {
                        r++, n.opt.each(e)
                      },
                      function () {
                        0 === r && n.opt.noMatch(e), n.opt.done(r)
                      }
                    )
                },
              },
              {
                key: 'mark',
                value: function (e, t) {
                  var n = this
                  this.opt = t
                  var r = 0,
                    i = 'wrapMatches',
                    o = this.getSeparatedKeywords(
                      'string' == typeof e ? [e] : e
                    ),
                    a = o.keywords,
                    s = o.length,
                    l = this.opt.caseSensitive ? '' : 'i'
                  this.opt.acrossElements && (i = 'wrapMatchesAcrossElements'),
                    0 === s
                      ? this.opt.done(r)
                      : (function e(t) {
                          var o = new RegExp(n.createRegExp(t), 'gm' + l),
                            c = 0
                          n.log('Searching with expression "' + o + '"'),
                            n[i](
                              o,
                              1,
                              function (e, i) {
                                return n.opt.filter(i, t, r, c)
                              },
                              function (e) {
                                c++, r++, n.opt.each(e)
                              },
                              function () {
                                0 === c && n.opt.noMatch(t),
                                  a[s - 1] === t
                                    ? n.opt.done(r)
                                    : e(a[a.indexOf(t) + 1])
                              }
                            )
                        })(a[0])
                },
              },
              {
                key: 'markRanges',
                value: function (e, t) {
                  var n = this
                  this.opt = t
                  var r = 0,
                    i = this.checkRanges(e)
                  i && i.length
                    ? (this.log(
                        'Starting to mark with the following ranges: ' +
                          JSON.stringify(i)
                      ),
                      this.wrapRangeFromIndex(
                        i,
                        function (e, t, r, i) {
                          return n.opt.filter(e, t, r, i)
                        },
                        function (e, t) {
                          r++, n.opt.each(e, t)
                        },
                        function () {
                          n.opt.done(r)
                        }
                      ))
                    : this.opt.done(r)
                },
              },
              {
                key: 'unmark',
                value: function (e) {
                  var t = this
                  this.opt = e
                  var n = this.opt.element ? this.opt.element : '*'
                  ;(n += '[data-markjs]'),
                    this.opt.className && (n += '.' + this.opt.className),
                    this.log('Removal selector "' + n + '"'),
                    this.iterator.forEachNode(
                      NodeFilter.SHOW_ELEMENT,
                      function (e) {
                        t.unwrapMatches(e)
                      },
                      function (e) {
                        var r = i.matches(e, n),
                          o = t.matchesExclude(e)
                        return !r || o
                          ? NodeFilter.FILTER_REJECT
                          : NodeFilter.FILTER_ACCEPT
                      },
                      this.opt.done
                    )
                },
              },
              {
                key: 'opt',
                set: function (e) {
                  this._opt = r(
                    {},
                    {
                      element: '',
                      className: '',
                      exclude: [],
                      iframes: !1,
                      iframesTimeout: 5e3,
                      separateWordSearch: !0,
                      diacritics: !0,
                      synonyms: {},
                      accuracy: 'partially',
                      acrossElements: !1,
                      caseSensitive: !1,
                      ignoreJoiners: !1,
                      ignoreGroups: 0,
                      ignorePunctuation: [],
                      wildcards: 'disabled',
                      each: function () {},
                      noMatch: function () {},
                      filter: function () {
                        return !0
                      },
                      done: function () {},
                      debug: !1,
                      log: window.console,
                    },
                    e
                  )
                },
                get: function () {
                  return this._opt
                },
              },
              {
                key: 'iterator',
                get: function () {
                  return new i(
                    this.ctx,
                    this.opt.iframes,
                    this.opt.exclude,
                    this.opt.iframesTimeout
                  )
                },
              },
            ]),
            o
          )
        })()
      return function (e) {
        var t = this,
          n = new o(e)
        return (
          (this.mark = function (e, r) {
            return n.mark(e, r), t
          }),
          (this.markRegExp = function (e, r) {
            return n.markRegExp(e, r), t
          }),
          (this.markRanges = function (e, r) {
            return n.markRanges(e, r), t
          }),
          (this.unmark = function (e) {
            return n.unmark(e), t
          }),
          this
        )
      }
    })()
  },
  function (e, t, n) {
    n(5), (e.exports = n(10))
  },
  function (e, t, n) {
    'use strict'
    n.r(t)
    var r = n(0),
      i = n.n(r),
      o = n(3),
      a = n.n(o)
    n(6), n(8)
    let s, l, c
    const u = (e, t) => {
        if (null == e || null == e) return []
        let n = e.toString().trim().toLowerCase(),
          i = []
        for (let e = 0; e <= n.length - 2; e++) {
          let o = r.utils.clone(t) || {}
          ;(o.position = [e, e + 2]),
            (o.index = i.length),
            i.push(new r.Token(n.slice(e, e + 2), o))
        }
        return i
      },
      d = (e) => {
        const t = document.querySelector('#searchResults'),
          n = document.querySelector('#searchBox').value
        for (; t.firstChild; ) t.removeChild(t.firstChild)
        if (!e.length) {
          let e = document.createElement('div')
          return (
            (e.className = 'searchResultPage'),
            (e.innerHTML = 'No results found for query "' + n + '"'),
            void t.append(e)
          )
        }
        let r = new a.a(document.querySelector('#searchResults'))
        e.slice(0, 10).forEach((e, i) => {
          let o = document.createElement('div')
          o.className = 'searchResultPage'
          let a = l[i].matchData.metadata,
            s = a[Object.keys(a)[0]].body.position[0][0],
            c = s - 50 > 0 ? s - 50 : 0,
            u = document.createElement('a')
          ;(u.className = 'searchResultTitle'),
            (u.href = e.ref),
            (u.innerHTML = e.title),
            o.append(u)
          let d = document.createElement('div')
          ;(d.className = 'searchResultBody'),
            (d.innerHTML = e.body.substr(c, 100)),
            o.append(d),
            t.append(o),
            r.mark(n)
        })
      }
    ;(() => {
      let e = new XMLHttpRequest()
      e.open('GET', '../post/index.json', !0),
        (e.onload = function () {
          this.status >= 200 && this.status < 400
            ? ((c = JSON.parse(this.response)),
              (s = i()(function () {
                (this.tokenizer = u),
                  this.pipeline.reset(),
                  this.ref('ref'),
                  this.field('title', { boost: 10 }),
                  this.field('body'),
                  (this.metadataWhitelist = ['position']),
                  c.forEach((e) => {
                    this.add(e)
                  }, this)
              })))
            : console.error('Error getting Hugo index flie')
        }),
        (e.onerror = function () {
          console.error('connection error')
        }),
        e.send()
    })(),
      (() => {
        const e = document.querySelector('#searchBox')
        null !== e &&
          e.addEventListener('keyup', function (e) {
            let t = document.querySelector('#searchResults'),
              n = e.currentTarget.value
            n.length < 2
              ? (t.style.display = 'none')
              : (d(
                  ((e) => (
                    (l = s.search(
                      ((e) => {
                        const t = e.toString().trim().toLowerCase(),
                          n = []
                        for (let e = 0; e <= t.length - 2; e++)
                          n.push(t.slice(e, e + 2))
                        return n.join(' ')
                      })(e)
                    )),
                    l.map((e) => c.filter((t) => t.ref === e.ref)[0])
                  ))(n)
                ),
                (t.style.display = 'block'))
          })
      })()
  },
  function (e, t, n) {
    var r = n(1),
      i = n(7)
    'string' == typeof (i = i.__esModule ? i.default : i) &&
      (i = [[e.i, i, '']])
    var o = { insert: 'head', singleton: !1 },
      a = (r(i, o), i.locals ? i.locals : {})
    e.exports = a
  },
  function (e, t, n) {
    (t = n(2)(!1)).push([
      e.i,
      "/* noto-sans-jp-regular - japanese_latin */\n@font-face {\n  font-family: 'Noto Sans JP';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: local('Noto Sans Japanese Regular'), local('NotoSansJapanese-Regular'),\n       url('../fonts/noto-sans-jp-v25-japanese_latin-regular.woff2') format('woff2'), /* Super Modern Browsers */\n       url('../fonts/noto-sans-jp-v25-japanese_latin-regular.woff') format('woff'); /* Modern Browsers */\n}\n\n/* roboto-regular - latin */\n@font-face {\n  font-family: 'Roboto';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: local('Roboto'), local('Roboto-Regular'),\n       url('../fonts/roboto-v20-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */\n       url('../fonts/roboto-v20-latin-regular.woff') format('woff'); /* Modern Browsers */\n}\n\nhtml {\n  background-color: #FFFFFF;\n}\n\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: 'Noto Sans JP', sans-serif;\n  font-size: 16px;\n  color: #42464c;\n  background: 0 0;\n  flex-flow: column;\n  text-rendering: optimizeLegibility;\n}\n\na {\n  outline: none;\n  text-decoration: none;\n}\n\n.error-text {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  text-align: center;\n}\n\n.header {\n  margin: auto;\n  position: relative;\n}\n\n.navbar {\n  min-height: 50px;\n  margin-bottom: 20px;\n}\n\n.nav {\n  top: 0;\n  position: relative;\n  max-width: 800px;\n  margin: 20px auto;\n  padding: 0 10px;\n  text-align: right;\n}\n\n.nav-logo {\n  float: left;\n  transition: transform 300ms ease-out;\n}\n\n.nav-logo:hover {\n  transform: scale(1.1);\n}\n\n.nav-logo img {\n  display: block;\n  width: auto;\n}\n\n.nav-links {\n  margin: 0;\n  padding: 0;\n  font-size: 14px;\n  list-style: none;\n}\n\n.nav-links li {\n  display: inline-block;\n  margin: 0 0 0 10px;\n}\n\n.nav-links li a em {\n  color: #000000;\n}\n\n.intro-header {\n  margin: 40px 0 20px;\n  position: relative;\n}\n\n.intro-header [class$=\"-heading\"] {\n  text-align: center;\n}\n\n.intro-header [class$=\"-heading\"] h1 {\n  margin-top: 0;\n  padding-top: 0;\n  font-size: 50px;\n}\n\nh1,h2,h3,h4,h5,h6 {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  font-weight: 800;\n  color: #111111;\n}\n\n.container[role=main] {\n  max-width: 700px;\n  padding: 0 15px;\n  font-size: 16px;\n  line-height: 1.7;\n  color: #333333;\n}\n\n#blog-archives {\n  margin: 20px auto;\n  font-size: 14px;\n}\n\n.archives {\n  margin: 20px auto;\n}\n\n.archives td {\n  border: none;\n  text-align: left;\n}\n\n.article {\n  text-align: justify;\n}\n\n#TableOfContents {\n  font-size: 14px;\n  border: 2px dotted #cccccc;\n  margin: 1em 0;\n  padding: 0.5em 0;\n  background-color: #f0f0f0;\n}\n\n#TableOfContents ul {\n  list-style-type: none;\n}\n\n#TableOfContents ul ul {\n  list-style-type: disc;\n}\n\np {\n  line-height: 1.5;\n  margin: 0.5em 0;\n}\n\np + p {\n  margin-top: 1em;\n}\n\n.post-preview {\n  padding-bottom: 10px;\n  border-bottom: 1px solid #eeeeee;\n}\n\n.post-preview a {\n  text-decoration: none;\n  color: #222222;\n}\n\n.post-preview:last-child {\n  border-bottom: 0;\n}\n\n.postmeta {\n  margin: 10px 0;\n}\n\n.blog-tags {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  color: #999999;\n  font-size: 15px;\n  margin: 30px 0;\n}\n\n.blog-tags a {\n  color: #0000BB;\n  text-decoration: none;\n  padding: 0px 5px;\n}\n\n.blog-tags a:before {\n  content: \"#\";\n}\n\nh4.term-name > span.badge {\n    float: right;\n}\n\ndiv.panel-body {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  font-weight: 800;\n  border-radius: 0;\n  border: none;\n  font-size: 16px;\n}\n\n.post-entry {\n  width: 100%;\n  margin-top: 10px;\n}\n\n.post-read-more {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  font-weight: 800;\n  float: right;\n  position: relative;\n  display: block;\n  text-decoration: none;\n}\n\na.post-read-more::after {\n  position: absolute;\n  bottom: -4px;\n  left: 0;\n  content: '';\n  width: 100%;\n  height: 2px;\n  background: #333;\n  transform: scale(0, 1);\n  transform-origin: center top;\n  transition: transform .3s;\n}\n\na.post-read-more:hover::after {\n  transform: scale(1, 1);\n}\n\nblockquote {\n  color: #808080;\n  padding: 0 10px;\n  border-left: 4px solid #aaaaaa;\n}\n\nblockquote p:first-child {\n  margin-top: 0;\n}\n\ntable {\n  padding: 0;\n  border-spacing: 0;\n}\n\ntable tr {\n  border-top: 1px solid #dddddd;\n  margin: 0;\n  padding: 0;\n}\n\ntable tr th {\n  font-weight: bold;\n  background-color: #eeeeee;\n  border: 1px solid #dddddd;\n  text-align: left;\n  margin: 0;\n  padding: 6px 13px;\n}\n\ntable tr td {\n  border: 1px solid #dddddd;\n  background-color: #ffffff;\n  text-align: left;\n  margin: 0;\n  padding: 6px 12px;\n}\n\ntable tr th :first-child,\ntable tr td :first-child {\n  margin-top: 0;\n}\n\ntable tr th :last-child,\ntable tr td :last-child {\n  margin-bottom: 0;\n}\n\n.chroma .ln {\n  margin-right: 0.8em;\n  padding: 0 0.4em 0 0.4em;\n}\n\npre {\n    display: block;\n    padding: 9.5px;\n    margin: 0 0 10px;\n    font-size: 13px;\n    line-height: 1.42857143;\n    color: #333;\n    word-break: break-all;\n    word-wrap: break-word;\n    background-color: #f5f5f5;\n    border: 1px solid #cccccc;\n    border-radius: 4px;\n}\n\npre code {\n    padding: 0;\n    font-family: Menlo, Monaco, Consolas, monospace;\n    font-size: inherit;\n    color: inherit;\n    white-space: pre-wrap;\n    background-color: transparent;\n    border-radius: 0;\n}\n\ncode {\n    padding: 2px 4px;\n    font-size: 90%;\n    color: #dd0011;\n    background-color: #f9f9f9;\n    border-radius: 4px;\n}\n\n#backtotopButton {\n  position: fixed;\n  bottom: 20px;\n  right: 20px;\n  z-index: 99;\n  border: none;\n  outline: none;\n  background-color: #eeeeff;\n  cursor: pointer;\n  padding: 15px;\n  border-radius: 10px;\n  font-size: 16px;\n  text-align: center;\n}\n\n#backtotopButton:hover {\n  background-color: #aaaaaa;\n}\n\n.searchBoxContainer {\n  position: relative;\n  width: 300px;\n  height: 30px;\n  margin: 10px auto 50px auto;\n}\n\ninput.searchBox {\n  position: absolute;\n  width: 100%;\n  padding: 0 35px 0 15px;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 15px;\n  outline: 0;\n  font-size: 16px;\n  color: #707070;\n  background-color:#f6f6f6;\n  border: solid 1px #c9c9c9;\n  box-sizing: border-box;\n}\n\n.searchBox::placeholder {\n  color: #c9c9c9;\n}\n\n.searchResults {\n  display: none;\n  max-width: 600px;\n  min-width: 300px;\n  margin: 0 auto;\n  top: 210px;\n  left: 0;\n  right: 0;\n  padding: 5px;\n  border-radius: 5px;\n  text-align: left;\n}\n\n.searchResultPage {\n  padding: 14px\n}\n\n.searchResultTitle {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  font-weight: bold;\n  font-size: 24px;\n  margin: 5px 0;\n}\n\n.searchResultBody {\n  font-size: 16px;\n}\n\nmark {\n  background-color: #eeff00;\n}\n\n.pager {\n  list-style: none;\n  text-align: center;\n  margin:20px 0 0;\n  padding-left: 0;\n}\n\n.pager ul {\n  display: block;\n}\n\n.pager li {\n  display: inline;\n}\n\n.pager li a {\n  box-sizing: border-box;\n  font-family: 'Roboto', Helvetica, sans-serif;\n  text-transform: uppercase;\n  text-align: center;\n  font-size: 14px;\n  font-weight: 800;\n  letter-spacing: 1px;\n  padding: 10px 5px;\n  background: #ffffff;\n  border-radius: 0;\n  border: 1px solid #dddddd;\n  display: inline-block;\n  color: #404040;\n  text-decoration: none;\n}\n\n.pager a:hover:not(.active) {\n  background-color: #dddddd;\n}\n\n.pager .previous > a {\n  float: left;\n  display: block;\n}\n\n.pager .next > a {\n  float: right;\n  display: block;\n}\n\nfooter {\n  padding: 60px 0;\n  text-align: center;\n  margin-top: auto;\n  font-size: 14px;\n  font-family: 'Roboto', Helvetica, sans-serif;\n}\n\nfooter .copyright {\n  font-family: 'Roboto', Helvetica, sans-serif;\n  text-align: center;\n  margin-bottom: 0;\n}\n\nfooter .theme-by {\n  text-align: center;\n  margin: 10px 0 0;\n}\n\nfooter a {\n  color: #050505;\n  font-weight: bold;\n}\n\nfooter em {\n  cursor: pointer;\n}\n\n@media (min-width: 600px) {\n  .header {\n    margin: auto;\n  }\n\n  .nav-links {\n    font-size: 18px;\n  }\n\n  .nav-links li {\n    margin: 0 0 0 30px;\n  }\n\n  .container[role=main] {\n    font-size: 16px;\n    line-height: 1.8;\n    margin: 40px auto;\n  }\n\n  .blog-tags {\n    margin: 20px 0;\n  }\n\n  .pager li a {\n    padding: 10px 20px;\n  }\n\n  .pager.blog-pager  {\n    margin-top: 40px;\n  }\n}\n",
      '',
    ]),
      (e.exports = t)
  },
  function (e, t, n) {
    var r = n(1),
      i = n(9)
    'string' == typeof (i = i.__esModule ? i.default : i) &&
      (i = [[e.i, i, '']])
    var o = { insert: 'head', singleton: !1 },
      a = (r(i, o), i.locals ? i.locals : {})
    e.exports = a
  },
  function (e, t, n) {
    (t = n(2)(!1)).push([
      e.i,
      '/* Background */ .chroma { background-color: #f8f8f8 }\n/* Other */ .chroma .x { color: #000000 }\n/* Error */ .chroma .err { color: #a40000 }\n/* LineTableTD */ .chroma .lntd { vertical-align: top; padding: 0; margin: 0; border: 0; }\n/* LineTable */ .chroma .lntable { border-spacing: 0; padding: 0; margin: 0; border: 0; width: auto; overflow: auto; display: block; }\n/* LineHighlight */ .chroma .hl { display: block; width: 100%;background-color: #ffffcc }\n/* LineNumbersTable */ .chroma .lnt { margin-right: 0.4em; padding: 0 0.4em 0 0.4em;color: #7f7f7f }\n/* LineNumbers */ .chroma .ln { margin-right: 0.4em; padding: 0 0.4em 0 0.4em;color: #7f7f7f }\n/* Keyword */ .chroma .k { color: #204a87; font-weight: bold }\n/* KeywordConstant */ .chroma .kc { color: #204a87; font-weight: bold }\n/* KeywordDeclaration */ .chroma .kd { color: #204a87; font-weight: bold }\n/* KeywordNamespace */ .chroma .kn { color: #204a87; font-weight: bold }\n/* KeywordPseudo */ .chroma .kp { color: #204a87; font-weight: bold }\n/* KeywordReserved */ .chroma .kr { color: #204a87; font-weight: bold }\n/* KeywordType */ .chroma .kt { color: #204a87; font-weight: bold }\n/* Name */ .chroma .n { color: #000000 }\n/* NameAttribute */ .chroma .na { color: #c4a000 }\n/* NameBuiltin */ .chroma .nb { color: #204a87 }\n/* NameBuiltinPseudo */ .chroma .bp { color: #3465a4 }\n/* NameClass */ .chroma .nc { color: #000000 }\n/* NameConstant */ .chroma .no { color: #000000 }\n/* NameDecorator */ .chroma .nd { color: #5c35cc; font-weight: bold }\n/* NameEntity */ .chroma .ni { color: #ce5c00 }\n/* NameException */ .chroma .ne { color: #cc0000; font-weight: bold }\n/* NameFunction */ .chroma .nf { color: #000000 }\n/* NameFunctionMagic */ .chroma .fm { color: #000000 }\n/* NameLabel */ .chroma .nl { color: #f57900 }\n/* NameNamespace */ .chroma .nn { color: #000000 }\n/* NameOther */ .chroma .nx { color: #000000 }\n/* NameProperty */ .chroma .py { color: #000000 }\n/* NameTag */ .chroma .nt { color: #204a87; font-weight: bold }\n/* NameVariable */ .chroma .nv { color: #000000 }\n/* NameVariableClass */ .chroma .vc { color: #000000 }\n/* NameVariableGlobal */ .chroma .vg { color: #000000 }\n/* NameVariableInstance */ .chroma .vi { color: #000000 }\n/* NameVariableMagic */ .chroma .vm { color: #000000 }\n/* Literal */ .chroma .l { color: #000000 }\n/* LiteralDate */ .chroma .ld { color: #000000 }\n/* LiteralString */ .chroma .s { color: #4e9a06 }\n/* LiteralStringAffix */ .chroma .sa { color: #4e9a06 }\n/* LiteralStringBacktick */ .chroma .sb { color: #4e9a06 }\n/* LiteralStringChar */ .chroma .sc { color: #4e9a06 }\n/* LiteralStringDelimiter */ .chroma .dl { color: #4e9a06 }\n/* LiteralStringDoc */ .chroma .sd { color: #8f5902; font-style: italic }\n/* LiteralStringDouble */ .chroma .s2 { color: #4e9a06 }\n/* LiteralStringEscape */ .chroma .se { color: #4e9a06 }\n/* LiteralStringHeredoc */ .chroma .sh { color: #4e9a06 }\n/* LiteralStringInterpol */ .chroma .si { color: #4e9a06 }\n/* LiteralStringOther */ .chroma .sx { color: #4e9a06 }\n/* LiteralStringRegex */ .chroma .sr { color: #4e9a06 }\n/* LiteralStringSingle */ .chroma .s1 { color: #4e9a06 }\n/* LiteralStringSymbol */ .chroma .ss { color: #4e9a06 }\n/* LiteralNumber */ .chroma .m { color: #0000cf; font-weight: bold }\n/* LiteralNumberBin */ .chroma .mb { color: #0000cf; font-weight: bold }\n/* LiteralNumberFloat */ .chroma .mf { color: #0000cf; font-weight: bold }\n/* LiteralNumberHex */ .chroma .mh { color: #0000cf; font-weight: bold }\n/* LiteralNumberInteger */ .chroma .mi { color: #0000cf; font-weight: bold }\n/* LiteralNumberIntegerLong */ .chroma .il { color: #0000cf; font-weight: bold }\n/* LiteralNumberOct */ .chroma .mo { color: #0000cf; font-weight: bold }\n/* Operator */ .chroma .o { color: #ce5c00; font-weight: bold }\n/* OperatorWord */ .chroma .ow { color: #204a87; font-weight: bold }\n/* Punctuation */ .chroma .p { color: #000000; font-weight: bold }\n/* Comment */ .chroma .c { color: #8f5902; font-style: italic }\n/* CommentHashbang */ .chroma .ch { color: #8f5902; font-style: italic }\n/* CommentMultiline */ .chroma .cm { color: #8f5902; font-style: italic }\n/* CommentSingle */ .chroma .c1 { color: #8f5902; font-style: italic }\n/* CommentSpecial */ .chroma .cs { color: #8f5902; font-style: italic }\n/* CommentPreproc */ .chroma .cp { color: #8f5902; font-style: italic }\n/* CommentPreprocFile */ .chroma .cpf { color: #8f5902; font-style: italic }\n/* Generic */ .chroma .g { color: #000000 }\n/* GenericDeleted */ .chroma .gd { color: #a40000 }\n/* GenericEmph */ .chroma .ge { color: #000000; font-style: italic }\n/* GenericError */ .chroma .gr { color: #ef2929 }\n/* GenericHeading */ .chroma .gh { color: #000080; font-weight: bold }\n/* GenericInserted */ .chroma .gi { color: #00a000 }\n/* GenericOutput */ .chroma .go { color: #000000; font-style: italic }\n/* GenericPrompt */ .chroma .gp { color: #8f5902 }\n/* GenericStrong */ .chroma .gs { color: #000000; font-weight: bold }\n/* GenericSubheading */ .chroma .gu { color: #800080; font-weight: bold }\n/* GenericTraceback */ .chroma .gt { color: #a40000; font-weight: bold }\n/* GenericUnderline */ .chroma .gl { color: #000000; text-decoration: underline }\n/* TextWhitespace */ .chroma .w { color: #f8f8f8; text-decoration: underline }\n',
      '',
    ]),
      (e.exports = t)
  },
  function (e, t) {
    window.onload = function () {
      var e = document.getElementById('dark-mode-toggle'),
        t = document.getElementById('dark-mode-theme')
      function n(n) {
        localStorage.setItem('dark-mode-storage', n),
          'dark' === n
            ? ((t.disabled = !1), (e.className = 'fas fa-sun'))
            : 'light' === n &&
              ((t.disabled = !0), (e.className = 'fas fa-moon'))
      }
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? n(localStorage.getItem('dark-mode-storage') || 'dark')
        : n(localStorage.getItem('dark-mode-storage') || 'light'),
        e.addEventListener('click', () => {
          'fas fa-moon' === e.className
            ? n('dark')
            : 'fas fa-sun' === e.className && n('light')
        })
    }
  },
])
