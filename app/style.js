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

function vertexStyle(isCollaborator) {
	const STYLE_DONE = 'fillColor=#ffe600;strokeWidth=2';
	const STYLE_NONE = 'fillColor=#eeeeee;strokeWidth=1';
	return isCollaborator ? STYLE_DONE : STYLE_NONE;
}

function edgeStyle(areCollaborators) {
	const STYLE_DONE = 'strokeColor=#000000;strokeWidth=1.5';
	const STYLE_NONE = 'strokeColor=#dddddd;strokeWidth=1';
	return areCollaborators ? STYLE_DONE : STYLE_NONE;
}
