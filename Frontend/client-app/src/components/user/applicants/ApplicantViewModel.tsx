class Application {
  firstname: string;
  lastname: string;
  date: string;
  jobTitle: string;
  jobDescription: string;

  constructor(
    firstname: string,
    lastname: string,
    date: string,
    jobTitle: string,
    jobDescription: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.date = date;
    this.jobTitle = jobTitle;
    this.jobDescription = jobDescription;
  }
}

export default Application;
