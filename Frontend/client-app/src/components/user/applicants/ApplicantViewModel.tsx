class Application {
  firstname: string;
  lastname: string;
  date: string;
  jobTitle: string;
  jobDescription: string;
  idProvider: number;
  idJob: number;

  constructor(
    firstname: string,
    lastname: string,
    date: string,
    jobTitle: string,
    jobDescription: string,
    idProvider: number,
    idJob: number
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.date = date;
    this.jobTitle = jobTitle;
    this.jobDescription = jobDescription;
    this.idJob = idJob;
    this.idProvider = idProvider;
  }
}

export default Application;
