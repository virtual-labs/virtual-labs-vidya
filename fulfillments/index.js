// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Payload } = require("dialogflow-fulfillment");
const { google } = require("googleapis");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

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
  convert:function(d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
          d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0],d[1],d[2]) :
          d.constructor === Number ? new Date(d) :
          d.constructor === String ? new Date(d) :
          typeof d === "object" ? new Date(d.year,d.month,d.date) :
          NaN
      );
  },
  compare:function(a,b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
          isFinite(a=this.convert(a).valueOf()) &&
          isFinite(b=this.convert(b).valueOf()) ?
          (a>b)-(a<b) :
          NaN
      );
  },
  inRange:function(d,start,end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
     return (
          isFinite(d=this.convert(d).valueOf()) &&
          isFinite(start=this.convert(start).valueOf()) &&
          isFinite(end=this.convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
      );
  }
};

const getNumber = function(num) {
    
  return Math.abs(Number(num)) >= 1.0e+9 ? (Math.abs(Number(num)) / 1.0e+9).toFixed(2) + "B" : Math.abs(Number(num)) >= 1.0e+6 ? (Math.abs(Number(num)) / 1.0e+6).toFixed(2) + "M" : Math.abs(Number(num)) >= 1.0e+3 ? (Math.abs(Number(num)) / 1.0e+3).toFixed(2) + "K" : Math.abs(Number(num));
};

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    let result;
    function metrics(agent, key) {
      return new Promise((resolve, reject) => {
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Total!A1:C3`,
            })
            .then((res) => {
              if (err) {
                console.log("Spreadshet returned an error: " + err);
                result = "Could not retrieve results";
                resolve(result);
              } else {
                const rows = res.data.values;
                let row;
                let n = 1;
                for (row of rows) {
                  n++;
                  console.log(row);
                  if (row[0] == key) {
                    result = row[2];
                    resolve(result);
                  }
                }
                resolve(result);
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

    function getusers(agent) {
      return metrics(agent, "Users");
    }

    function getviews(agent) {
      return metrics(agent, "Views");
    }

    // Retrieve Top labs from spreadsheet based on parameter
    function gettoplabs(agent) {
      return new Promise((resolve, reject) => {
        console.log(agent.parameters);
        let limit = agent.parameters.labslimit;
        if (limit == ''){
          limit = 5;
        }
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Labs!A1:D${limit + 1}`,
            })
            .then((res) => {
              if (err) {
                resolve("Spreadshet returned an error: " + err);
              } else {
                let rows = res.data.values;
                rows.shift();
                let row;
                let n = 1;
                let result = '';
                if (rows.length < limit) {
                  result = `We have a total of ${rows.length} labs\n`;
                  limit = rows.length;
                }
                result = result + `Top ${limit} Labs according to views:\n`;
                for (row of rows) {
                  result = result + `${n}. ${row[3]} (${row[2]})\n`;
                  n++;
                }
                resolve(result);
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

    // Retrieve Top Disciplines from spreadsheet based on parameter
    function gettopdisciplines(agent) {
      return new Promise((resolve, reject) => {
        console.log(agent.parameters);
        let limit = agent.parameters.limit;
        if (limit == ''){
          limit = 5;
        }
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Disciplines!A1:C${limit + 1}`,
            })
            .then((res) => {
              if (err) {
                resolve("Spreadshet returned an error: " + err);
              } else {
                let rows = res.data.values;
                rows.shift();
                let row;
                let n = 1;
                let result = '';
                if (rows.length < limit) {
                  result = `We have a total of ${rows.length} disciplines\n`;
                  limit = rows.length;
                }
                result = result + `Top ${limit} Disciplines according to views:\n`;
                for (row of rows) {
                  result = result + `${n}. ${row[0]} (${row[1]})\n`;
                  n++;
                }
                resolve(result);
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

    function userstill(agent) {
      return new Promise((resolve, reject) => {
        console.log(agent.parameters);
        let date_param = agent.parameters.date;
        if (date_param == ''){
          date_param = new Date();
        }
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Cumulative_Users!A1:D`,
            })
            .then((res) => {
              if (err) {
                resolve("Spreadshet returned an error: " + err);
              } else {
                let rows = res.data.values;
                rows.shift();
                let row;
                let n = 0;
                for (row of rows) {
                  console.log(row);
                  let ddmmyy = row[0].split('/');
                  if (dates.compare(date_param,`${ddmmyy[1]}/${ddmmyy[0]}/${ddmmyy[2]}`) == -1){
                    let shortform = getNumber(parseInt(row[1]));
                    resolve(shortform+` (${row[1]})`);
                  }
                  n = n+1;
                }
                let shortform = getNumber(parseInt(row[1]));
                resolve(shortform+` (${row[1]})`);
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

    function userfrom(agent) {
      return new Promise((resolve, reject) => {
        console.log(agent.parameters);
        let date_param = agent.parameters.date;
        if (date_param == ''){
          date_param = new Date('1/1/2020');
        }
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Cumulative_Users!A1:D`,
            })
            .then((res) => {
              if (err) {
                resolve("Spreadshet returned an error: " + err);
              } else {
                let rows = res.data.values;
                rows.shift();
                let row;
                let n = 0;
                let totalusers = rows[rows.length-1][1];
                for (row of rows) {
                  console.log(row);
                  let ddmmyy = row[0].split('/');
                  if (dates.compare(date_param,`${ddmmyy[1]}/${ddmmyy[0]}/${ddmmyy[2]}`) == -1){
                    let shortform = getNumber(totalusers-parseInt(row[1]));
                    resolve(shortform+` (${totalusers-parseInt(row[1])})`);
                  }
                  n = n+1;
                }
                let shortform = getNumber(totalusers-parseInt(row[1]));
                resolve(shortform+` (${totalusers-parseInt(row[1])})`);
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

    function viewstill(agent) {
      return new Promise((resolve, reject) => {
        console.log(agent.parameters);
        let date_param = agent.parameters.date;
        let colleges_input = agent.parameters.college;
        if (date_param == ''){
          date_param = new Date();
        }
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Cumulative_Colleges!A1:L`,
            })
            .then((res) => {
              if (err) {
                console.log("Spreadshet returned an error: " + err);
              } else {
                let rows = res.data.values;
                let colleges = rows[0];
                let college_indices = {};
                colleges.shift();
                colleges.forEach((val, ind) => {
                  college_indices[val] = ind;
                });
                rows.shift();
                let row;
                let n = 0;
                let result = '';
                for (row of rows) {
                  //console.log(row);
                  let ddmmyy = row[0].split("/");
                  if (
                    ( dates.compare(date_param, `${ddmmyy[1]}/${ddmmyy[0]}/${ddmmyy[2]}`) == -1 ) || (n == rows.length-1)
                  ) {
                    let total = 0;
                    // console.log(row);
                    let allcolleges = false;
                    if ( colleges_input.length == 0 ){
                      allcolleges = true;
                      colleges_input = colleges;
                    }

                    colleges_input.forEach((val, i) => {
                      let shortform = getNumber(parseInt(row[college_indices[val]+1]));
                      result = result + `${val} : ` + shortform + ` (${row[college_indices[val]+1]})\n`;
                      total += parseInt(row[college_indices[val]+1]);
                    });
                    
                    if (allcolleges) {
                      let shortform = getNumber(parseInt(total));
                      result = result + `Total Views : ` + shortform + ` (${total})\n`;  
                    }

                    resolve(result);
                  }
                  n = n + 1;
                }
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

    function viewsfrom(agent) {
      return new Promise((resolve, reject) => {
        console.log('VIEWS FROm : '+agent.parameters);
        let date_param = agent.parameters.date;
        let colleges_input = agent.parameters.college;
        if (date_param == ''){
          date_param = new Date('1/1/2020');
        }
        client.authorize((err, tokens) => {
          sheets.spreadsheets.values
            .get({
              auth: client,
              spreadsheetId: "1tJI8OIV2F3BXFkniSODtyr3smj3SS2zQGc5Q-x5N8kI", //The ID of the googlesheet with the data
              range: `Cumulative_Colleges!A1:L`,
            })
            .then((res) => {
              if (err) {
                console.log("Spreadshet returned an error: " + err);
              } else {
                let rows = res.data.values;
                let colleges = rows[0];
                let college_indices = {};
                colleges.shift();
                colleges.forEach((val, ind) => {
                  college_indices[val] = ind;
                });
                rows.shift();
                let row;
                let n = 0;
                let result = '';
                for (row of rows) {
                  console.log(row);
                  let ddmmyy = row[0].split("/");
                  if (
                    ( dates.compare(date_param, `${ddmmyy[1]}/${ddmmyy[0]}/${ddmmyy[2]}`) == -1 ) || (n == rows.length-1)
                  ) {
                    let total = 0;
                    let allcolleges = false;
                    if ( colleges_input.length == 0 ){
                      allcolleges = true;
                      colleges_input = colleges;
                    }

                    colleges_input.forEach((val, i) => {
                      let last = parseInt(rows[rows.length-1][college_indices[val]+1]);
                      let curval = parseInt(row[college_indices[val]+1]);
                      console.log("last : "+last);
                      console.log("curval : "+curval);
                      if ( curval == 'NaN' || curval == '' || isNaN(curval)){
                        curval = 0;
                      }
                      let shortform = getNumber(last-curval);
                      result = result + `${val} : ` + shortform + ` (${last-curval})\n`;
                      total += last-curval;
                    });
                    
                    if (allcolleges) {
                      let shortform = getNumber(parseInt(total));
                      result = result + `Total Views : ` + shortform + ` (${total})\n`;  
                    }

                    resolve(result);
                  }
                  n = n + 1;
                }
              }
            });
        });
      }).then((result) => {
        agent.add(result);
      });
    }

     function labsearch(agent){
      return new Promise ((resolve, reject) =>{
        let labquery = agent.parameters.labquery;
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
                  if (lab_name.search(labquery) != -1 || college.search(labquery) != -1) {
                    result = result + `${count}. ${lab_name} (${college}) : ${host_name}\n`;
                    count = count+1;
                  }
                }
                if (result == "") {
                  result = "No results found for your query :(";
                }
                resolve(result);
              }
            });
        });
      }).then((result)=>{
        agent.add(result);
      });
    } 

    let intentMap = new Map();
    intentMap.set("total-users", getusers);
    intentMap.set("total-views", getviews);
    intentMap.set("top-labs", gettoplabs);
    intentMap.set("top-disciplines", gettopdisciplines);
    intentMap.set("users-till",userstill);
    intentMap.set("users-from",userfrom);
    intentMap.set("views-till",viewstill);
    intentMap.set("views-from",viewsfrom);
    intentMap.set('lab-search', labsearch);
    agent.handleRequest(intentMap);
  }
);