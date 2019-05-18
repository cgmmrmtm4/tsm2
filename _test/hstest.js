import { validateTranscripts } from "../_library/validateData.js";

let passed = 0;
let failed = 0;

function passedMsg(testId) {
    let resultMsg = '';
    resultMsg = testId + ': passed';
    $('#messages').append($("<li>")
        .addClass('passed')
        .text(resultMsg)
    );
}

function failedMsg(testId) {
    let resultMsg = '';
    resultMsg = testId + ': failed';
    $('#messages').append($("<li>")
        .addClass('failed')
        .text(resultMsg)
    );
}

function simpleValidationSuccess(testData, testId) {
    let passed = 0;
    let failed = 0;
    let filteredData = [];
    for (let i = 0; i < testData.length; i++) {
        filteredData = testData[i].filter(obj => validateTranscripts(obj));
        if (filteredData.length === testData[i].length) {
            passedMsg(testId[i]);
            passed++;
        } else {
            failedMsg(testId[i]);
            failed++;
        }
    }
    return { 'passTotal': passed, 'failTotal': failed };
}

function simpleDataErrorHandling(testData, testId) {
    let passed = 0;
    let failed = 0;
    let filteredData = [];
    for (let i = 0; i < testData.length; i++) {
        filteredData = testData[i].filter(obj => validateTranscripts(obj));
        if (filteredData.length === 0) {
            passedMsg(testId[i]);
            passed++;
        } else {
            failedMsg(testId[i]);
            failed++
        } 
    }
    return { 'passTotal': passed, 'failTotal': failed };
}

function transcriptTests() {
    let filteredData = [];
    let res = {};
    let retRes = { 'passTotal': 0, 'failTotal': 0 };
    let tD0101 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0102 = [{ "season": "SPRING", "year": "2016", "id": "1", "seasonId": "8", "opponent": "Paso Robles", "assists": "32", "blocks": "1", "kills": "0", "digs": "1", "serves": "23", "aces": "5", "sideouts": "6" }];
    let tD0103 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000", "extraKey": "extraKey" }];
    let tD0104 = [{ "student*Name": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0105 = [{ "studentName": "Rachel", "sea*son": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0106 = [{ "studentName": "Rachel", "season": "SUMMER", "ye*ar": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0107 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "i*d": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0108 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "season*Id": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0109 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "student*Id": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0110 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "per*iod": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0111 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "hon*ors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0112 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "A*P": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0113 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "class*Name": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0114 = [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacher*Name": "NA", "grade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0115 =  [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "gr*ade": "A", "GP": "4.000", "WGP": "4.000" }];
    let tD0116 =  [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "G*P": "4.000", "WGP": "4.000" }];
    let tD0117 =  [{ "studentName": "Rachel", "season": "SUMMER", "year": "2009", "id": "32", "seasonId": "17", "studentId": "1", "period": "1", "honors": "0", "AP": "0", "className": "Health", "teacherName": "NA", "grade": "A", "GP": "4.000", "W*GP": "4.000" }];
    let tD0118 = [{}];
    let tDAll = [];

    let tI0101 = "01-01: Test for valid transcript entries";
    let tI0102 = "01-02: Test objects has less keys";
    let tI0103 = "01-03: Test objects has more keys then expected";
    let tI0104 = "01-04: Test for key studentName is missing";
    let tI0105 = "01-05: Test for key season is missing";
    let tI0106 = "01-06: Test for key year is missing";
    let tI0107 = "01-07: Test for key id is missing";
    let tI0108 = "01-08: Test for key seasonId is missing";
    let tI0109 = "01-09: Test for key studentId is missing";
    let tI0110 = "01-10: Test for key period is missing";
    let tI0111 = "01-11: Test for key honors is missing";
    let tI0112 = "01-12: Test for key AP is missing";
    let tI0113 = "01-13: Test for key className is missing";
    let tI0114 = "01-14: Test for key teacherName is missing";
    let tI0115 = "01-15: Test for key grade is missing";
    let tI0116 = "01-16: Test for key GP is missing";
    let tI0117 = "01-17: Test for key WGP is missing";
    let tI0118 = "01-18: Test for passing an empty object";
    let tIAll = [];

    tDAll = [tD0101];
    tIAll = [tI0101];
    res = simpleValidationSuccess(tDAll, tIAll);
    retRes.passTotal += res.passTotal;
    retRes.failTotal += res.failTotal;

    tDAll = [tD0102,tD0103,tD0104,tD0105,tD0106,tD0107,tD0108,tD0109,tD0110,tD0111,tD0112,tD0113,tD0114,tD0115,tD0116,tD0117,tD0118];
    tIAll = [tI0102,tI0103,tI0104,tI0105,tI0106,tI0107,tI0108, tI0109,tI0110,tI0111,tI0112,tI0113,tI0114,tI0115,tI0116,tI0117,tI0118];
    res = simpleDataErrorHandling(tDAll, tIAll);
    retRes.passTotal += res.passTotal;
    retRes.failTotal += res.failTotal;

    return retRes;
}

$('#resultPanel').hide();
$("#clearPanelMsg").click(function () {
    $("#messages").empty();
    $("#resultPanel").hide();
});

$("#transcriptUT").click(function () {
    let res = {};
    $('#messages').empty();
    $('#resultPanel').hide();
    passed = 0;
    failed = 0;
    res = transcriptTests();
    $('#resultPanel').show();
    $('#messages').append($("<br>"));
    $('#messages').append($("<li>").text("Test Passed: " + res.passTotal + " Test Failed: " + res.failTotal));
})

