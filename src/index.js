/*
 * Copyright (c) 2013, Genentech Inc.
 * Authors: Alexandre Masselot, Kiran Mukhyala, Bioinformatics & Computational Biology
 */

_ = require("underscore");
$ = jQuery = require("jquery");

module.exports.SeqEntry = require('./js/models/SeqEntry')
module.exports.DASReader = require('./js/services/DASReader')
module.exports.FastaReader = require('./js/services/FastaReader')
module.exports.FeatureManager = require('./js/services/FeatureManager')
module.exports.IconFactory = require('./js/services/IconFactory')
module.exports.SeqEntryFastaView = require('./js/views/SeqEntryFastaView')
module.exports.FeatureDisplayer = require('./js/views/FeatureDisplayer')
module.exports.SeqEntryAnnotInteractiveView = require('./js/views/SeqEntryAnnotInteractiveView')
module.exports.OneLiner = require('./js/views/OneLiner')
