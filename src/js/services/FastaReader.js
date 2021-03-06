define(
    /**
     @exports FastaReader
     @author Alexandre Masselot
     @author Kiran Mukhyala
     @copyright 2013,  Bioinformatics & Computational Biology Department, Genentech Inc.
     */

    ['underscore', '../models/SeqEntry', '../models/PositionedFeature'], function (_, SeqEntry, PositionedFeature) {
        /**
         * A service to read a fast file, enhanced with  PSI/PEFF annotation
         @constructor
         */

        var FastaReader = function () {
        }

        /**
         * builds a SeqEntry based on a string content
         * @param {String} content
         * @return {SeqEntry}
         */
        FastaReader.prototype.buildSeqEntry = function (content) {
            var self = this;

            var hs = self.headerAndSequence(content);
            var seq = hs[1];
            var header = self.peffHeader2map(hs[0])
            var se = new SeqEntry({
                id: header[0],
                sequence: seq
            })
            if (header[1] == undefined) {
                return se;
            }
            if (header[1].Pname) {
                se.set('description', header[1].Pname)
            }
            self.parseFeatures(se, header[1])
            return se;
        }
        /**
         * parse textual features and add them into the SeqEntry
         * @private
         * @param seqEntry
         * @param feats
         */
        FastaReader.prototype.parseFeatures = function (seqEntry, feats) {
            var self = this;
            if (feats == undefined) {
                return;
            }

            var keepOnly = {
                Processed: 'processed',
                Variant: 'variants',
                ModRes: 'amino acid modifications',
                ModResPsi: 'amino acid modifications',
            }

            _.chain(feats).each(function (ftList, cat) {
                if (!keepOnly[cat])
                    return;

                var posFeatures = _.map(ftList, function (ftTxt) {
                    var arr = ftTxt.split('|')
                    if (arr.length == 2) {
                        arr.unshift(arr[0])
                    }
                    return new PositionedFeature({
                        start: arr[0] - 1,
                        end: arr[1] - 1,
                        category: keepOnly[cat],
                        type: cat,
                        name: arr[2],
                        text: arr[2]
                    })
                })
                seqEntry.addFeatures(posFeatures);
            })
        }
        /***
         * split  a fasta text into header and sequence.
         *  headeing '>' is removed on sequence
         * sequence spaces are cleaned out
         * @param {Text} text
         * @return an array of [header, sequence]
         */
        FastaReader.prototype.headerAndSequence = function (text) {
            var self = this;

            var arr = text.split(/\n/);
            var header = arr.shift();
            header = header.replace(/^>/, '').trim();

            var seq = arr.join('');
            seq = seq.replace(/\s+/g, '');

            return [header, seq];
        }
        /**
         * parse the header line, with peff fashion
         * returns an array [id, featMap]
         * check tests to see how it works...
         * if the value of a field is of '(...)' then an array is returned with the parenthesis content
         * @private
         * @param {String} line
         */
        FastaReader.prototype.peffHeader2map = function (line) {
            var self = this;

            line = line.trim();
            var re = new RegExp("(.*)\\s\\\\(\\w+)=(.*)")
            var reTokens = /\(([^\)]*)\)/g
            var feats = {}
            while (m = re.exec(line)) {
                var key = m[2]
                var val = m[3].trim()
                line = m[1]
                if (val[0] == '(' && val[val.length - 1] == ')') {
                    var a = []
                    while (m = reTokens.exec(val)) {
                        a.push(m[1])
                    }
                    feats[key] = a
                } else {
                    feats[key] = val
                }

            }
            return [line.trim(), feats]

        }

        return FastaReader;
    })
