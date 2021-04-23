"use strict";

const { google } = require("googleapis");

const sheets = google.sheets("v4");

// sheetid can be found from sheet URL
const config = {
  client_email: "dialogflow-nwwuqs@vidya-snivlb.iam.gserviceaccount.com",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvWnMrsNS3RfPo\nOoSf6qJ45U2f7a9fA3rSH7Lf+YE8ZIe4uJnFv6AILy7mo3quo+sX4US8qucf/vCx\nawgr7+dNeDK+ximWnw9b6FBT+oYNbUFWQb33RuH4BjKT7Yt5ndit8OUC+jHEpoBs\neX3pRFZ86QBVXoHKrftaIZsbCOJ6YgpHy2YRJDrCvscBFn4hXHm7ipkJQQPrszKY\n/Rcua0Xmu9yqoUYEqC1UCYLrVStNrkg8sTK7iiqPDH/CeR7h0EGDEJ7I4aI9QYW/\nRpzAeDHslf1Hl3KeHFF5+ZQFQMN5lScH2OTEpb0X9A5MOgQgQH4SUBzxgxrokVuQ\nj4xDd/fLAgMBAAECggEADV6xolar8vXJjsU+pt/7SrywQ8eAVBfBVE0bbkb2JIMr\nv/9Y2Vvustqm6+nyD2fEvVmtMoKhxCEQyNsQalbMq+3EVlYCOY95Wp7mpQiLrD40\n0zbvA4m37mYwLAxA7Eeg2Ksh4vpUAIDx3ZN3ClA64fCoC41817wwcOMk3uJS1lU/\nLQQ3tkvB0IdUQxA/q/ZwnLRs43gUS/CktJkL6c7EtlaFf9odSgNKVionMzvUFs1L\nX7t5bgc7xwMmZQUILFHlXjVpIEXRdMOiqvR+j4fawLBDbYgkMCC0KjQTFF/JX6G9\nRhXjgYDnnHpoTCed8EkpeHYdB/wdSHRqvkbzypu0QQKBgQDe4pL6QRjXgN4plvqp\nI3HPc7S6kQW6lS5UD7KXoLSTtNt6BlRkHE55+N+0tqqbmTXOg1pWWwRw8yJT8ggQ\nMQj+t3HO+eDNLn24dceDB/relY3kjBbPZrDcQgVfHcbqZs/TVPYlmgQKWHpE8jRr\nJI0BhusKBrc9Wyi91OE4huVIQQKBgQDJaAH7FjPtSBRO6EWB2jUgbyN1ugJ7ghwu\nEk11eTd94GqQ0s7MiZaKebfsmNqHSojPNTsIoDNAeWySLUWwqDgYKPspDNE1+pR4\n7Jrgpa59B7laQMNUfs54AVVvZzv+TsCWdSXz+LSrKVHRFu7hu2+bTYiFgzFxvejm\njJQmNs6dCwKBgEC4/MNNGgCifGEJZbqt/0OlruqqaEZ5QZ3JfSwIz8dAsqcppWH4\n0lUbDyM0FDDg+b4BaL9A6PY/tE06MFs7Ughdjt/ysfQDNyDUmt4S+CeguDaQ86LA\niEU9qr+nLvcsaddNibj7k4bJkJ/q0Yv3bjbuTdx4fMeFbDxL0CcRDQ3BAoGBAJq7\nIhJxm1EnOBrrDUNWjcwuNhLi5bdXXSjz/LhMeRpmx9gdbKzs40/ddTT6taCM3ZA7\nN/BHizh0ULn4t/qhMf81tMdzxmLu8RP5yn7eKrB5t6ej66zFgv/lHmro58lXXVP6\nCj9mCf8ZTncRZFLduj+ZEFJqWRkmKoC87bByGMfDAoGBAJuhNJto8jNzeHUzt5r0\nvfg/exQ5/0IRNEro26rybIFvF6Ppb0CxpNlTLYD2PW2lfJs9JKbE/5MasMbdJfP8\nr2FaDISjajdF4wgu4vwKmAhSdzMJJtxP+oMO+hvYtcGlg5GaDOYser+pvkkkwNE+\npu9uqKg80By/Dq4+XWGmk7W4\n-----END PRIVATE KEY-----\n",
};

const client = new google.auth.JWT({
  email: config.client_email,
  key: config.private_key,
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

var dates = {
  convert: function (d) {
    // Converts the date in d to a date-object. The input can be:
    //   a date object: returned without modification
    //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
    //   a number     : Interpreted as number of milliseconds
    //                  since 1 Jan 1970 (a timestamp)
    //   a string     : Any format supported by the javascript engine, like
    //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
    //  an object     : Interpreted as an object with year, month and date
    //                  attributes.  **NOTE** month is 0-11.
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const getNumber = function (num) {
  return Math.abs(Number(num)) >= 1.0e9
    ? (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(num)) >= 1.0e6
    ? (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(num)) >= 1.0e3
    ? (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(num));
};

const date = "";
const college = "IITR";
// client.authorize((err, tokens) => {
//   sheets.spreadsheets.values
//     .get({
//       auth: client,
//       spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
//       range: `Cumulative_Colleges!A1:L`,
//     })
//     .then((res) => {
//       if (err) {
//         console.log("Spreadshet returned an error: " + err);
//       } else {
//         let rows = res.data.values;
//         let colleges = rows[0];
//         colleges.shift();
//         rows.shift();
//         let row;
//         let n = 0;
//         for (row of rows) {
//           //console.log(row);
//           let ddmmyy = row[0].split("/");
//           if (
//             ( dates.compare(date, `${ddmmyy[1]}/${ddmmyy[0]}/${ddmmyy[2]}`) == -1 ) || (n == rows.length-1)
//           ) {
//             let total = 0;
//             console.log(row);
//             colleges.forEach((val, ind) => {
//               total += parseInt(row[ind+1]);
//               if (val == college) {
//                 let shortform = getNumber(parseInt(row[ind+1]));
//                 console.log(shortform + ` (${row[ind+1]})`);
//                 return;
//               }
//             });
//             let shortform = getNumber(parseInt(total));
//             console.log(shortform + ` (${total})`);
//             return;
//           }
//           n = n + 1;
//         }
//       }
//     });
// });
const pat = "Movie";
client.authorize((err, tokens) => {
  sheets.spreadsheets.values
    .get({
      auth: client,
      spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
      range: `Labs!A2:F`,
    })
    .then((res) => {
      if (err) {
        console.log("Spreadshet returned an error: " + err);
      } else {
        let rows = res.data.values;
        let row;
        let result = "";
        let count = 1;
        for (row of rows) {
          //console.log(row);
          let lab_name = row[5];
          let host_name = row[1];
          let college = row[3];
          row[0].split(" ").forEach((word) => {
            if (word == "to" || word == "in" || word == "Of" || word == "lab" || word == "and" || word == "for" || word == "-" || word == "2" || word == "Lab" || word == "1" || word == "of" || word =="on" || word =="the" || word =="The") {
              return;
            }
            result = result + `"${word}","${word}"\n`;
          });
        }
        if (result == "") {
          result = "No results found for your query :(";
        }
        console.log(result);
      }
    });
});


function test(agent){
  const response = {
  "fulfillment_messages": [{
    "payload": {
      "richContent": [
        [{
          "type": "chips",
          "options": [{
            "text": "Empezar!"
          }]
        }]
      ]
    }
  }]
  };
  agent.add();
}