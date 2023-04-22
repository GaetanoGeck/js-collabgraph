function layoutGraph(graph) {
	var layout = new mxCircleLayout(graph);
	layout.execute(graph.getDefaultParent());
}

function setDefaultStyle(graph) {
	var stylesheet = graph.getStylesheet();
	setDefaultVertexStyle();
	setDefaultEdgeStyle();

	function setDefaultVertexStyle() {
		var vertexStyle = stylesheet.getDefaultVertexStyle();
		vertexStyle[mxConstants.STYLE_ROUNDED] = true;
		vertexStyle[mxConstants.STYLE_STROKECOLOR] = 'black';
		vertexStyle[mxConstants.STYLE_FONTCOLOR] = 'black';
	}

	function setDefaultEdgeStyle() {
		var edgeStyle = stylesheet.getDefaultEdgeStyle();
		edgeStyle[mxConstants.STYLE_STARTARROW] = mxConstants.NONE;
		edgeStyle[mxConstants.STYLE_ENDARROW] = mxConstants.NONE;
	}
}

function participantVertexStyle(isCollaborator) {
	const STYLE_DONE = 'fillColor=#ffe600;strokeWidth=2';
	const STYLE_NONE = 'fillColor=#eeeeee;strokeWidth=1';
	return isCollaborator ? STYLE_DONE : STYLE_NONE;
}

function coefficientVertexStyle(coefficient) {
	const STYLE_MANY = 'fillColor=#9bd474;strokeWidth=1';
	const STYLE_FEW = 'fillColor=#749ad4;strokeWidth=1';
	return (coefficient > 1) ? STYLE_MANY : STYLE_FEW;
}

function edgeStyle(collaborationWeight) {
	const STYLE_STRONG = 'strokeColor=#000000;strokeWidth=3.5';
	const STYLE_NORMAL = 'strokeColor=#000000;strokeWidth=2.0';
	const STYLE_WEAK = 'strokeColor=#000000;strokeWidth=1.0';
	const STYLE_NONE = 'strokeColor=#dddddd;strokeWidth=1';
	
	switch(collaborationWeight) {
		case 0:
			return STYLE_NONE;
		case 1:
			return STYLE_WEAK;
		case 2:
			return STYLE_NORMAL;
		case 3:
		default:
			return STYLE_STRONG;
	}
}
