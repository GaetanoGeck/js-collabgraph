function drawCollaborationGraph(container) {
	var graph = new mxGraph(container);
	setDefaultStyle(graph);
	updateCollaborationGraphModel(graph);
	graph.center();
}

function updateCollaborationGraphModel(graph) {
	graph.getModel().beginUpdate();
	try {
		addCollaborators(graph);
		layoutGraph(graph);
		addEdges(graph);
	} finally {
		graph.getModel().endUpdate();
	}
}

function addCollaborators(graph) {
	var parent = graph.getDefaultParent();
	Participant.allParticipants.forEach(addVertex);

	function addVertex(c) {
		var label = `${c.name}\n(${c.getCollaborationTime()})`
		var style = vertexStyle(c.isCollaborator());

		c.vertex = graph.insertVertex( //
			parent, //
			null, //
			label, //
			40, 40, 80, 30, //
			`defaultVertex;${style}`);
	}
}

function addEdges(graph) {
	var parent = graph.getDefaultParent();
	var participants = Participant.allParticipants;

	for (var i=0; i<participants.length; i++) {
		for (var j=i+1; j<participants.length; j++) {
			var from = participants[i];
			var to = participants[j];
			addEdge(from, to);
		}
	}

	function addEdge(from, to) {
		var style = edgeStyle(isCollaboratorOf(from, to));
		graph.insertEdge( //
			parent, //
			null, //
			"", //
			from.vertex, //
			to.vertex, //
			`defaultEdge;${style}`);

		function isCollaboratorOf(from, to) {
			return from.collaborators.includes(to);
		}
	}
}

