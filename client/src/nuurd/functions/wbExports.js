import XLSX from "xlsx";

export const outputWbMutualNetwork = (data) => {
    var ws_name = this.state.outputFileName;
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data, {
      skipHeader: false,
      origin: "A1",
      header: [
        "USER_ID",
        "USER_NAME",
        "SCREEN_NAME",
        "FOLLOWER_COUNT",
        "DESCRIPTION",
        "LOCATION",
        "VERIFIED",
        "DATE_JOINED",
        "YEAR_JOINED",
        "MUTUAL_COUNT",
        // "MUTUAL_PERCENT_COUNT"
      ],
    });

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, "twitter-data.xlsb");
  };

  export const outputWbNetwork = (data) => {
    var ws_name = this.state.outputFileName;
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data, {
      skipHeader: false,
      origin: "A1",
      header: [
        "USER_ID",
        "USER_NAME",
        "SCREEN_NAME",
        "FOLLOWER_COUNT",
        "DESCRIPTION",
        "LOCATION",
        "VERIFIED",
        "DATE_JOINED",
        "YEAR_JOINED",
        // ,
        // "MUTUAL_PERCENT_COUNT"
      ],
    });

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, "twitter-data.xlsb");
  };

  export const outputWbTweetHistory = (filename, data) => {
    var ws_name = filename;
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(data, {
      skipHeader: false,
      origin: "A1",
      header: [
        "CREATED_AT",
        "YEAR",
        "ID",
        "TEXT",
        "IS REPLY?",
        "IS RETWEET?",
        "IS QUOTE TWEET?",
        "QUOTE COUNT",
        "RETWEET COUNT",
        "FAVORITE COUNT",
        "TWEET URL",
        "QUOTE TWEET URL",
        "SOURCE",
      ],
    });

    XLSX.utils.book_append_sheet(wb, ws, ws_name);
    XLSX.writeFile(wb, "twitter-data.xlsb");
  };