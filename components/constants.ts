export const JWT_TOKEN = "jwtToken";
export const BASE_URL = "http://localhost:3000/api"

export const CONSTRAINTS: string[] = ["max", "min", "minLength", "maxLength", "regex", "format", "default", "optional", "integer"]
export const INPUT_NUMBER_CONSTRAINTS: string[] = ["max", "min", "minLength", "maxLength", "regex", "format", "default"]
export const TYPES: string[] = ["string", "number", "boolean"]

interface IDefCon {
    [key: string]: string[]
}
export const DEFAULT_CONSTRAINTS: IDefCon = {
    string: ["minLength", "maxLength", "format", "regex", "default", "optional"],
    number: ["min", "max", "integer", "default", "optional"],
    boolean: ["default"]
};

export const linkIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAf1JREFUaEPtmGtORDEIhZmVqStTV6auTEMyJEhoOdBSneT2z42xj/PxKHRu9ODj9uD66QL4aw9eHrg8sGiB0yH0TESvRMRfPd7vf7xleU4BjIR7ehkGBjkBwGLY6pkBQ3QDVMQLKATRCcBh8+GY/ZOIWBx/efA8CTE7PYToBBBxGuJFCbdiR3ky1dgNoCFm4gXG89p03QmATPLyXJs3HGoM4Y7/COB5YaizC4BFSJJmPcDzv82idgApPE+myjLE1x0mA3QMoKPCHguhSpGaJqTqh3TlntaCag5UxEtYzyC8fbcDjMRLddUVlkV71di720eVe2shm4mfdZAMIS20Z9GR+K2txEg8UmGlQOnvrPry/0LxPAnNgYx48QTS05ctL/QIwOgQz/IaNLLgsnjUAzp+BTwSrwupBVlqn21ZjzyQ7Q49WLSViDxWauasoEohQgBK4pEQsj1J5sZB3sH2dYbA/poThRDcVA1O5qT2Gjy5JjMNXimEVgHSFs0uyHoADaGsjvL8CMAWsHKylRUGC7MAvB3iBbl+kblLbBGA97yLbg7rtVYIBCDTPo9+oELOKXkC3XjlAdOaNyiAtMFIcZr1QSUrzxZlAHgf9BEf5ck2kCyAHKxjXV5a8hOKeGubyJ0eOCIqc0jVA5kzWudeAK3mBTa/PAAYqXXKw3vgB8uqeDGLK4etAAAAAElFTkSuQmCC"

export const closeIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAUdJREFUSEvt1bsuRUEUxvGfS6XTewaJNxAhhAiFQkiUWgoPpEAhIiI6jZBoCF7FJS7R2EvmJHISZvbZyTmKM93OXrP+832z1poBPVoDPeLqg7vmfN/qf2X1KE6whYfMyWawXcUt4/Ov2NwdD+Ie43jEFO5+SbhYxR1jGGeI719XDhwbN7DLd88/YRo3bRkXkisB/UjQ86bgdvhLUt6Ct0PncJErlhLFrRyrOEjKW/AxHCZ73zBfAo2EdcARv4b9dJKAjyDq4B2zlROXOaWt/3XBsS+U72EoJQmlce/XpdBOFPcMvJ7UxgF+Wv2KKKqrUtV1rM4VV7RRUUXXsfpnL3etnToZIFnlOaujVW4xgeeqRycLR+ZpNWqXmk6ueCSOqmLaSXP7r3wxxTax0vSRKC3S2nE5q2snLN3QB5c61Tiub3VjC0sTfAHboEIfytnLXAAAAABJRU5ErkJggg=="

export const addIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAhJJREFUaEPtmVFOAzEMRLcnA04GnAw4GTBoLQXj2OPYLQpifyq1u47feJwm2cux+XXZPP/jH+C3K9hZgfsT5nGAku9ez+/ezs+nLvAOACRzdxyHJMvmBigAlWAqABh4VJtN3LrveRVkBQBKv1SydZ5Ng2QBItVhCyQhl3hf7GX1ieZJQWQAvOQfPntAkmWL48WjIViA2WD0QA5VKTYDMBtgRfUZx6yvQoEiACt58XnWMoy1MDno6dgVKgJ4N0aNnmESzVZiOqaXjKV+xjYangW37DS1khdUJxD6Ucm6CoAwlnhmrjMAOoDjlwoAwlICzgB0M2XVtxJgLSSaaCth0oCFv12zoFX1OgCsGD960ALQ9llRvwtAO2E7gNBGVgVCanKi77DhVQGsPzmSzbzNEnMJgFXuFgBhL1nU2wOwPXCLCixZiAWI/M5W0ouzPUD4n7TU+ZH05+8dFWgBQD7ZdUw4e3SJwC7mMvsAya1aAa1+ajG3/XKaXo9faT9AC/int5RWFfDdSj+QPft1W+ogIZpdrA222UyZDCf3YiwcFutjFXc/EgFgrK0PtkSs0vFfUJ1SbKYCEQR+X9l2esf0dLwMgGcngZSjdTl21MfruM/y+VgkOvnVJUL0jqDSz+kZLluBMblOkJTqYxIVgLE3tnzJZ1lF3jgCCJd+zSoNj8+W4/mOClQ8X372H6AsYTHA9hX4ACYHnTHC3aoAAAAAAElFTkSuQmCC"

export const duplicateIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAS1JREFUaEPtmV0SwiAMhNOb6cnUk+nNlDilYyl/TUkY6vLkg4V8uyHppBMNvqbB4ycA9HawhQNvA4iHO+MeO2cUAB/7lYhevyCjAXDwDLEsABjkf3jHVqK3cECbAQDaCpf2FzlwIaLbvDP/1l7JOu/iEAFYNKeYKJs6LwHgjufV11Y+3H9T5yUAvdRnGBUA7VKbzfEWDgCgcJHgQChQSZGUoFrP7e4DWoFIwQFQW4W0nIMDp3Pg6KtGKEgp9ZqnEACCegoH0IlnBUqp8LedOPsyG6vxWkpKHQBA705s5oB0giFN2e95Le8AAGYFalP2vA483YDJYh6aSrnDDvQEyA15o8AxWlafIXqsXeqnqpAP3GrI6786svqrL5A1Cu4mrtnU8j8AsFQ7dtbwDnwALh1vMdkB5BwAAAAASUVORK5CYII="


export const delIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAPtJREFUSEvtlq8TAUEUxz8nif4CI0iqoqFKRjEU/jQSwYymcl0VzUiiJBv3zIVz7O5b5W7Gbtz9ft/3/drdF1HQigrSRSssuAHQBioGZx/AEdhpgtEKb4GhxiCwBiYurEa4BZxchnLnTeBs42iEe8A+NdIHDgaDWtyLXhrhBjDPRSR7s3RvmZxfDBG7cIssNx9xNl2eZXXC38pUGuGs29JEXSBOGkoy4bOcXFtzOckWT5zcIBxqHLpae5fDdfrIVHhA/vsBkWlxrL0/BtwKmH47szVXJx3yqj+K35O/XKYOmbW9ulrAdWAE1DzFb8AGuJp4minTU1MHL0z4CfGDXR8pdlN5AAAAAElFTkSuQmCC"

export const editIconSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAelJREFUSEvtlj1LHUEUhp+rYogoSjoxhY1YGRRNkRTRFIGAiKZQRExvGf0Zgoj/IYGkShHiBwaMRrAQwcIfoBDsLFIEFD+SfcPsZTzu3Lt7715uEafb2TPnmffMnDOnQJ1GoU5cag1+DuwDl1ZgCNwBPAEaUkZEzn8b2xfABvAjgo9aeBJ4HlgEmlJCV4B3xnYQ2In8tLj5TQu34C7gZ0qgzJaBBWPfCBwDj838GjAeK7dghWfbLZDywxKbuAJ2A/8HnJ8277/O+RlwoDkLHgG2nPFL4HsG9UNAL/DBrfHhN5GICeBL7C8v8FPgGyCFM8BHB+h3QuaAT76IPMAKn26vH9a3wHsHagd+lUunrKFWngraahz/McrvnFg1igVVeB8m3INrYNYLeW7gctBJ4HOpi1mJYh3HagmlSVCtuQD2Kr3VcrAOPEhQo7yeSlAar3ntp2cWxa9cHoagytOvZkM9wBHQHBWUW3UhC/g8oFQX6Y1fHDx4MEuygJUidqgMCmqVxnY1AQuq504vT2jkDtYNHSsD1WZyAWd4L4qm9+DiM1tNI5Am9HoW1aVoDLt26N+HBXcCp2k8VmDTDZyESqbm1bgtZegw0+xBTcC0bxhqbx8BfQkRSQPxbVR0VDLP7MJaN/TBjf5/4L/hyoAfBAuqgQAAAABJRU5ErkJggg=="

// export const movie = {
//     Title: "Guardians of the Galaxy Vol. 2",
//     Year: "2017",
//     Rated: "PG-13",
//     Released: "05 May 2017",
//     Runtime: "136 min",
//     Genre: "Action, Adventure, Comedy",
//     Director: "James Gunn",
//     Writer: "James Gunn, Dan Abnett, Andy Lanning",
//     Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
//     Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
//     Language: "English",
//     Country: "United States",
//     Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
//     Ratings: [
//         {
//             Source: "Internet Movie Database",
//             Value: "7.6/10",
//         },
//         {
//             Source: "Rotten Tomatoes",
//             Value: "85%",
//         },
//         {
//             Source: "Metacritic",
//             Value: "67/100",
//         },
//     ],
//     Metascore: "67",
//     imdbRating: "7.6",
//     imdbVotes: "764,992",
//     imdbID: "tt3896198",
//     Type: "movie",
//     DVD: "N/A",
//     BoxOffice: "$389,813,101",
//     Production: "N/A",
//     Website: "N/A",
//     Response: "True",
// };