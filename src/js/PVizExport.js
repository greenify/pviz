/*
 * Copyright (c) 2013, Genentech Inc.
 * Authors: Alexandre Masselot, Kiran Mukhyala, Bioinformatics & Computational Biology
 */
var classPaths = ['./models/SeqEntry', './services/DASReader', './services/FastaReader', './services/FeatureManager', './services/IconFactory', './views/SeqEntryAnnotInteractiveView', './views/SeqEntryFastaView', './views/FeatureDisplayer', './views/OneLiner']
define(['./models/SeqEntry', './services/DASReader', './services/FastaReader', './services/FeatureManager', './services/IconFactory', './views/SeqEntryAnnotInteractiveView', './views/SeqEntryFastaView', './views/FeatureDisplayer', './views/OneLiner'], function(SeqEntry, DASReader, FastaReader, FeatureManager, IconFactory, SeqEntryAnnotInteractiveView, SeqEntryFastaView, FeatureDisplayer, OneLiner) {
  var args = arguments;
  var exp = {}
  for (i in classPaths) {
    var simpleName = classPaths[i].replace(/.*\//, '');
    exp[simpleName] = args[i];
  }
  return exp;
})
