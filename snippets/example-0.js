var pviz = require("pviz");

//define the model, a sequence entry with an explicit sequence
var seq = 'MELAALCRWGLLLALLPPGAASTQVCTGTDMKLRLPASPETHLDMLRHLYQGCQVVQGNLELTYLPTNASLSFLQDIQEVQGYVLIAHNQVRQVPLQRLRIVRGTQLFEDNYALAVLDNGDPLNNTTPVTGASPGGLRELQLRSLTEILKGGVLIQRNPQLCYQDTILWKDIFHKNNQLA';
var seqEntry = new pviz.SeqEntry({
  sequence : seq
});

/*
 * thefined the view, in a backbone.js fashion
 * model: that's the model, who would have guessed
 * el: a selector to the target where to insert the view (size and so will be inherited)
 *
 * .render(): call the rendering
 *
 * NB: even though the features are not yet added to the model, the view will be recomputed at the end of any feature addition.
 * This is to take into account asynchroncity, when data comes from several remote sources
 */
new pviz.SeqEntryAnnotInteractiveView({
  model : seqEntry,
  el : yourDiv
}).render();

/* we can add featureswith properties
 * group: features will be grouped together on this property. they might no be displayed on the same line, but feature with different grous cannot be on the same line
 * type: within group, property can have different types
 * text: to be displayed or use wherever you want
 * start: initial position, starting at 0
 * end: last position of the feature (including), starting at 0
 *
 * NB: the explicit loading of features could be replaced by a JSON call. But for the sake of a standalone example, ajax does not work with file queries
 d3.tsv('example-features.tsv', function(err, data) {
   seqEntry.addFeatures(data);
 });
 */
seqEntry.addFeatures([{
  category : 'ptms',
  type : 'mickey',
  start : 20,
  end : 20,
  count : 10
}, {
  category : 'ptms',
  type : 'mickey',
  start : 22,
  end : 22,
  count : 3
}, {
  category : 'ptms',
  type : 'mickey',
  start : 40,
  end : 40,
  count : 10,
  improbable : true //!! an option attribute
}, {
  category : 'ptms',
  type : 'mickey',
  start : 50,
  end : 50,
  count : 2
}, {
  category : 'regions',
  type : 'topological domain',
  text : 'extra cellular',
  start : 22,
  end : 650
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 24,
  end : 26
}, {
  category : 'secondary structure',
  type : 'helix',
  start : 38,
  end : 49
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 53,
  end : 57
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 59,
  end : 63
}, {
  category : 'secondary structure',
  type : 'helix',
  start : 71,
  end : 73
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 78,
  end : 81
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 83,
  end : 87
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 91,
  end : 94
}, {
  category : 'secondary structure',
  type : 'turn',
  start : 108,
  end : 110
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 111,
  end : 116
}, {
  category : 'secondary structure',
  type : 'turn',
  start : 129,
  end : 131
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 138,
  end : 140
}, {
  category : 'secondary structure',
  type : 'beta_strand',
  start : 150,
  end : 155
}]);


