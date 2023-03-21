class MetaData {
  constructor() {
    // Initialize empty objects/arrays for fields that are objects/arrays
    this.source = "";
    this.booksReferredTo = [];
    this.casesReferredTo = [];
    this.caseId = { number: "", type: "" };
    this.court = { name: "", location: { city: "", country: "" } };
    this.counsel = { "Plaintiff/Appellant": [], "Defendant/Respondent": [] };
    this.editorialNote = "";
    this.headNotes = [];
    this.indices = [];
    this.judgement = { data: "", year: 0, month: "", day: 0 };
    this.judges = [];
    this.lawReportsCitations = [];
    this.natureOfProceedings = "";
    this.mediaNeutralCitation = "";
    this.presidingJudge = "";
    this.partiesOfSuit = { "Plaintiff/Appellant": [], "Defendant/Respondent": [] };
    this.statutesReferredTo = [];
    this.title = { long: "", short: "" };
  }

  setSource(source) {
    this.source = source;
  }

  setBooksReferredTo(books) {
    this.booksReferredTo = books;
  }

  setCasesReferredTo(cases) {
    this.casesReferredTo = cases;
  }

  setCaseId(id) {
    this.caseId = id;
  }

  setCourt(court) {
    this.court = court;
  }

  setCounsel(counsel) {
    this.counsel = counsel;
  }

  setEditorialNote(note) {
    this.editorialNote = note;
  }

  setHeadNotes(headNotes) {
    this.headNotes = headNotes;
  }

  setIndices(indices) {
    this.indices = indices;
  }

  setJudgement(judgementdata) {
    this.judgement = judgementdata;
  }

  setJudges(judges) {
    this.judges = judges;
  }

  setLawReportsCitations(citations) {
    this.lawReportsCitations = citations;
  }

  setNatureOfProceedings(nature) {
    this.natureOfProceedings = nature;
  }

  setMediaNeutralCitation(citation) {
    this.mediaNeutralCitation = citation;
  }

  setPresidingJudge(judge) {
    this.presidingJudge = judge;
  }

  setPartiesOfSuit(plaintiff, defendant) {
    this.partiesOfSuit["Plaintiff/Appellant"] = plaintiff;
    this.partiesOfSuit["Defendant/Respondent"] = defendant;
  }

  setStatutesReferredTo(statutes) {
    this.statutesReferredTo = statutes;
  }

  setTitle(longTitle, shortTitle) {
    this.title.long = longTitle;
    this.title.short = shortTitle;
  }
}


module.exports = MetaData;