function drawCollaborationGraph(container) {
	var graph = new mxGraph(container);
	graph.ordered = false;
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
		var participantStyle = participantVertexStyle(c.isCollaborator());

		c.vertex = graph.insertVertex( //
			parent, //
			null, //
			label, //
			40, 40, 80, 30, //
			`defaultVertex;${participantStyle}`);
		
		const coeff = c.collaborationCoefficient()
		if (coeff > 0) {
			var collabLabel = createCollaborationLabel(coeff);
			graph.addCell(collabLabel, c.vertex);
		}

		function createCollaborationLabel(coeff) {
			const geom = new mxGeometry(0.7, 0.6, 30, 20);
			geom.relative = true
			const coeffStyle = coefficientVertexStyle(coeff);
			const cl = new mxCell(coeff, geom, `defaultVertex;${coeffStyle}`);
			cl.setVertex(true);
			return cl;
		}
	}
}

function addEdges(graph) {
	var parent = graph.getDefaultParent();
	var participants = Participant.allParticipants;

	var edges = [];
	for (var i=0; i<participants.length; i++) {
		for (var j=i+1; j<participants.length; j++) {
			var from = participants[i];
			var to = participants[j];
			var edge = addEdge(from, to);
			edges.push(edge);
		}
	}
	graph.orderCells(true, edges);

	function addEdge(from, to) {
		var style = edgeStyle(isCollaboratorOf(from, to));
		return graph.insertEdge( //
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

