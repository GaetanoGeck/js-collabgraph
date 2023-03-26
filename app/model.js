class Participant {
	static allParticipants = [];

	constructor(name) {
		this.name = name;
		this.collaborationTime = 0;
		this.collaborators = new Set();
		Participant.allParticipants.push(this);
	}

	addCollaborationWith(duration, participants) {
		this.collaborationTime += duration;
		participants.filter(p => p !== this)
			.forEach(p => this.collaborators.add(p));
	}

	getCollaborationTime() {
		const fixed = this.collaborationTime.toFixed(1);
		return Number.parseFloat(fixed);
	}

	isCollaborator() {
		return this.collaborationTime > 0;
	}

	collaborationCoefficient() {
		return this.collaborators.size
	}
}

function session(date, duration, collabs) {
	collabs.forEach(c => c.addCollaborationWith(duration, collabs));
}
