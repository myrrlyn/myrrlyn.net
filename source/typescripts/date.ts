import * as moment from "moment";

$(document).ready(function() {
    $("#today").html(moment().format("MMMM Do, YYYY"));
});
