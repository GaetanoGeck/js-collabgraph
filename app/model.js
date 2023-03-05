class Participant {
	static allParticipants = [];

	constructor(name) {
		this.name = name;
		this.collaborationTime = 0;
		this.collaborators = [];
		Participant.allParticipants.push(this);
	}

	addCollaborationWith(duration, participants) {
		this.collaborationTime += duration;
		participants.forEach(p => this.collaborators.push(p));
	}

	getCollaborationTime() {
		const fixed = this.collaborationTime.toFixed(1);
		return Number.parseFloat(fixed);
	}

	isCollaborator() {
		return this.collaborationTime > 0;
	}
}

function session(date, duration, collabs) {
	collabs.forEach(c => c.addCollaborationWith(duration, collabs));
}
