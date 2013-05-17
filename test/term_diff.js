describe('TermDiff', function() {
	var TermBuffer = terminal.TermBuffer;
	var TermDiff = terminal.TermDiff;
	function newTermBuffer(w, h) {
		var t = new TermBuffer(w, h);
		t.setMode('crlf', true);
		return t;
	}

	it("creates TermDiff", function() {
		var t1 = newTermBuffer();
		var t2 = newTermBuffer();
		var d = new TermDiff(t1, t2);
		expect(d.toJSON().changes.length).to.be(0);
	});

	it("diffs two terminals", function() {
		// Not Correct, must investigate
		var t1 = newTermBuffer();
		var t2 = newTermBuffer();
		t1.inject("_FFFFFF".replace(/(.)/g,'$1\n'));
		t2.inject("_ADDE".replace(/(.)/g,'$1\n'));
		var d = new TermDiff(t1, t2);
		expect(d.toJSON().changes.length).to.be(4);
	});

	/*
	it("detects led changes", function() {
		var t1 = newTermBuffer();
		var t2 = newTermBuffer();
		var d = new TermDiff(t1, t2);
    console.log(d.toJSON());
		expect(d.toJSON().changes.length).to.be(1);
	});
	*/

	it("detects line changes in second buffer", function() {
		var t1 = newTermBuffer();
		var t2 = newTermBuffer();
		t1.inject('lalal');
		var d = new TermDiff(t1, t2);
		expect(d.toJSON().changes.length).to.be(1);
	});

	it("detects line changes in first buffer", function() {
		var t1 = newTermBuffer();
		var t2 = newTermBuffer();
		t2.inject('lalal');
		var d = new TermDiff(t1, t2);
		expect(d.toJSON().changes.length).to.be(1);
	});
});
