class Participant {
	static allParticipants = [];

	static computeStandardDeviationRater() {
		const collaborationTimes = Participant.collaborationTimesPerPair();
		return standardDeviationRater(collaborationTimes);
	}

	static collaborationTimesPerPair() {
		const num = Participant.allParticipants.length;
		var times = [];
		for (var i=0; i<num; i++) {
			for (var j=0; j<i; j++) {
				var pi = Participant.allParticipants[i];
				var pj = Participant.allParticipants[j];
				var time = pi.getCollaborationTimeWithParticipant(pj);
				times.push(time);
			}
		}
		return times.filter(x => x > 0);
	}

	constructor(name) {
		this.name = name;
		this.collaborationTime = 0;
		this.collaborators = new Map();
		Participant.allParticipants.push(this);
	}

	addCollaborationWith(duration, participants) {
		this.collaborationTime += duration;
		participants.filter(p => p !== this)
			.forEach(p => this.increaseCollaborationTime(p, duration));
	}

	increaseCollaborationTime(participant, duration) {
		if (!this.collaborators.has(participant)) {
			this.collaborators.set(participant, 0);
		}
		const oldDuration = this.collaborators.get(participant);
		const newDuration = oldDuration + duration;
		this.collaborators.set(participant, newDuration);
	}

	getCollaborationTime() {
		const fixed = this.collaborationTime.toFixed(1);
		return Number.parseFloat(fixed);
	}

	getCollaborationTimeWithParticipant(participant) {
		return this.collaborators.has(participant) //
			? this.collaborators.get(participant) //
			: 0;
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
