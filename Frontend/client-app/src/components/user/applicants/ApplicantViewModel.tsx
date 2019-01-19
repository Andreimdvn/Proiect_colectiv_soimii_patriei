class Application {
  firstname: string;
  lastname: string;
  date: string;
  jobTitle: string;
  jobDescription: string;
  idProvider: number;
  idJob: number;
  email: string;

  constructor(
    firstname: string,
    lastname: string,
    date: string,
    jobTitle: string,
    jobDescription: string,
    idProvider: number,
    idJob: number,
    email: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.date = date;
    this.jobTitle = jobTitle;
    this.jobDescription = jobDescription;
    this.idJob = idJob;
    this.idProvider = idProvider;
    this.email = email;
  }
}

export default Application;
