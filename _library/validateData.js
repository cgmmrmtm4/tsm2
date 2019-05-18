import { insertErrorMsg } from "./errorHandler.js";

function strMatch(name, exp) {
    if (name.match(exp)) {
        return true;
    } else {
        return false;
    }
}

function checkRange(value, low, high) {
    if (value >= low && value <= high) {
        return true;
    } else {
        return false;
    }
}

function strToLong(str, length) {
    if (str.length > length) {
        return true;
    }
    return false;
}

function validLeague(ch) {
    if (ch.length === 0 || ch.trim().length === 0) {
        return true;
    }
    if (ch.length > 1) {
        return false;
    }
    if (ch === '*') {
        return true;
    }
    return false;
}

function validTitle(name) {
    let validNameExp = /^[0-9a-zA-Z-,.\s']*$/;

    if (name.length === 0) {
        return true;
    }
    if (strToLong(name, 40)) {
        return false;
    } else {
        return strMatch(name, validNameExp);
    }
}

function validDate(date) {
    var validDateExp = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(validDateExp)) {
        return false;
    }
    var d = new Date(date);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) {
        return false;
    }
    return d.toISOString().slice(0, 10) === date;
}

/*
 * validate studentName, className and teacherName
 */
function validName(type, name) {
    let validNameExp = /^[0-9a-zA-Z-,.\s']*$/;
    let validClassExp = /^[0-9a-zA-Z-,.&\s']*$/;
    let validResultExp = /^[WLT]*$/;
    let validTitleExp = /^[0-9a-zA-Z-.'()\s]*$/;
    let validScoreExp = /^[0-9-(),\sNA]*$/;

    if (typeof (name) !== 'string') {
        return false;
    };
    if (name.trim().length === 0) {
        return false;
    }
    switch (type) {
        case 'studentName':
            if (strToLong(name, 20)) {
                return false;
            };
            return strMatch(name, validNameExp);
        case 'teacherName':
        case 'sport':
        case 'activity':
            if (strToLong(name, 30)) {
                return false;
            }
            return strMatch(name, validNameExp);
        case 'className':
            if (strToLong(name, 30)) {
                return false;
            }
            return strMatch(name, validClassExp);
        case 'opponent':
        case 'catagory':
        case 'location':
            if (strToLong(name, 40)) {
                return false;
            }
            return strMatch(name, validNameExp);
        case 'result':
            if (strToLong(name, 1)) {
                return false;
            }
            return strMatch(name, validResultExp);
        case 'title':
            if (strToLong(name, 50)) {
                return false;
            }
            return strMatch(name, validTitleExp);
        case 'score':
            if (strToLong(name, 60)) {
                return false;
            }
            return strMatch(name, validScoreExp);
        default:
            insertErrorMsg(type + ": unkown type in validName()");
            return false;
    }
}

/*
 * validate the Season
 */
function validSeason(season) {
    let seasons = ['SUMMER', 'FALL', 'WINTER', 'SPRING'];
    if (seasons.includes(season)) {
        return true;
    } else {
        return false;
    }
}

/*
 * validate the year
 */
function validYear(year) {
    let yearInt = parseInt(year);
    if (isNaN(yearInt)) {
        return false;
    } else {
        return checkRange(yearInt, 2009, 2018);
    }
}

/*
 * validate the letter grade
 */
function validLetterGrade(grade) {
    let grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

    if (grades.includes(grade)) {
        return true;
    } else {
        return false;
    }
}

/*
 * validate id, seasonId, studentId and period
 */
function validInt(type, id) {
    let myId = parseInt(id);
    if (isNaN(myId)) {
        return false;
    }

    switch (type) {
        case 'studentId':
            return checkRange(myId, 1, 2);
        case 'seasonId':
            return checkRange(myId, 1, 32);
        case 'period':
            return checkRange(myId, 0, 7);
        default:
            return true;
    }
}

/*
 * validate honor and ap
 */
function validBool(bool) {
    let myBool = parseInt(bool);
    if (isNaN(myBool)) {
        return false;
    } else {
        return checkRange(myBool, 0, 1);
    }
}

function validURL(type, url) {
    let validURLExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    switch (type) {
        case 'thumbName':
            if (strToLong(url, 350)) {
                return false;
            }
            return strMatch(url, validURLExp);
        case 'fileName':
            if (strToLong(url, 250)) {
                return false;
            }
            return strMatch(url, validURLExp);
        default:
            insertErrorMsg(type + ": unknown type in validURL");
            return false;
    }

}

/*
 * validate gpa/wgpa
 */
function validFloat(type, value) {
    let myFloat = parseFloat(value).toFixed(3);
    if (isNaN(myFloat)) {
        return false;
    }

    switch (type) {
        case 'GP':
            return checkRange(myFloat, 0.000, 4.000);
        case 'WGP':
            return checkRange(myFloat, 0.000, 5.000);
        case 'pct':
            return checkRange(myFloat, 0.000, 100.000);
        default:
            insertErrorMsg(type + ': unknown type in validFloat()');
            return false;
    }
}

function validGPA(grade, gpa, wgpa, honors, ap) {
    let grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    let gradeGP = ['4.000', '4.000', '4.000', '3.000', '3.000', '3.000', '2.000', '2.000', '2.000', '1.000', '1.000', '1.000', '0.000'];
    let gradeWGP = ['5.000', '5.000', '5.000', '4.000', '4.000', '4.000', '3.000', '3.000', '3.000', '1.000', '1.000', '1.000', '0.000'];

    let idx = grades.indexOf(grade);
    if (honors === '1' || ap === '1') {
        if (gradeGP[idx] !== gpa || gradeWGP[idx] !== wgpa) {
            return false;
        }
    } else {
        if (gradeGP[idx] !== gpa || gradeGP[idx] !== wgpa) {
            return false;
        }
    }
    return true;
}

function validVideo(resp) {
    if (resp === "No" || resp === "Yes") {
        return true;
    }
    return false;
}

export function validateTranscripts(trans) {
    let transcriptProps = ['studentName', 'season', 'year', 'id', 'seasonId', 'studentId', 'period', 'honors', 'AP', 'className', 'teacherName', 'grade', 'GP', 'WGP'];
    if (Object.keys(trans).length !== 14) {
        insertErrorMsg("validateTranscripts: number of keys failed");
        return false;
    }
    for (let x of transcriptProps) {
        if (!(x in trans)) {
            insertErrorMsg("validateTranscripts: key " + x + " not in object");
            return false;
        }
    }
    for (let x of transcriptProps) {
        switch (x) {
            case 'studentName':
            case 'className':
            case 'teacherName':
                if (!(validName(x, trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a vaild " + x + " name");
                    return false;
                }
                break;
            case 'season':
                if (!(validSeason(trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a valid season");
                    return false;
                }
                break;
            case 'year':
                if (!(validYear(trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a valid year");
                    return false;
                }
                break;
            case 'id':
            case 'seasonId':
            case 'studentId':
            case 'period':
                if (!(validInt(x, trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a valid integer");
                    return false;
                }
                break;
            case 'honors':
            case 'AP':
                if (!(validBool(trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a valid boolean");
                    return false;
                }
                break;
            case 'grade':
                if (!(validLetterGrade(trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a valid letter grade");
                    return false;
                }
                break;
            case 'GP':
            case 'WGP':
                if (!(validFloat(x, trans[x]))) {
                    insertErrorMsg("validateTranscripts: " + trans[x] + " not a valid grade point average");
                    return false
                }
                break;
            default:
                return false;
        }
    }
    if (!(validGPA(trans.grade, trans.GP, trans.WGP, trans.honors, trans.AP))) {
        insertErrorMsg("validateTranscripts: " + trans.grade + " does not match averages " + trans.GP + " and " + trans.WGP);
        return false;
    }
    return true;
}

export function validateRankings(ranking) {
    let rankingProps = ['seasonId', 'rank', 'totalStudents', 'pct'];
    if (Object.keys(ranking).length !== 4) {
        insertErrorMsg("validateRankings: number of keys failed");
        return false;
    }
    for (let x of rankingProps) {
        if (!(x in ranking)) {
            insertErrorMsg("validateRankings: key " + x + " not in object");
            return false;
        }
    }
    for (let x of rankingProps) {
        switch (x) {
            case 'seasonId':
            case 'rank':
            case 'totalStudents':
                if (!(validInt(x, ranking[x]))) {
                    insertErrorMsg("validateRankings: " + ranking[x] + " not a valid integer");
                    return false;
                }
                break;
            case 'pct':
                if (!(validFloat(x, ranking[x]))) {
                    insertErrorMsg("validateRankings: " + ranking[x] + " not a valid percentage");
                    return false
                }
                break;
            default:
                return false;
        }
    }
    return true;
}

export function validateAwards(award) {
    let awardProps = ['studentName', 'catagory', 'year', 'title'];
    if (Object.keys(award).length !== 4) {
        insertErrorMsg("validateAwards: number of keys failed");
        return false;
    }
    for (let x of awardProps) {
        if (!(x in award)) {
            insertErrorMsg("validateAwards: key " + x + " not in object");
            return false;
        }
    }
    for (let x of awardProps) {
        switch (x) {
            case 'studentName':
            case 'catagory':
            case 'title':
                if (!(validName(x, award[x]))) {
                    insertErrorMsg("validateAwards: " + award[x] + " not a vaild " + x + " name");
                    return false;
                }
                break;
            case 'year':
                if (!(validYear(award[x]))) {
                    insertErrorMsg("validateAwards: " + award[x] + " not a valid year");
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    return true;
}

export function validateAthletics(athlete) {
    let athleticProps = ['studentName', 'season', 'year', 'id', 'seasonId', 'sport', 'varsity', 'sportId', 'date', 'location', 'league', 'opponent', 'score', 'result'];
    if (Object.keys(athlete).length !== 14) {
        insertErrorMsg("validateAthletics: number of keys failed");
        return false;
    }
    for (let x of athleticProps) {
        if (!(x in athlete)) {
            insertErrorMsg("validateAthletics: key " + x + " not in object");
            return false;
        }
    }
    for (let x of athleticProps) {
        switch (x) {
            case 'studentName':
            case 'sport':
            case 'location':
            case 'opponent':
            case 'score':
            case 'result':
                if (!(validName(x, athlete[x]))) {
                    insertErrorMsg("validateAthletics: " + athlete[x] + " not a vaild " + x + " name");
                    return false;
                }
                break;
            case 'id':
            case 'seasonId':
            case 'sportId':
                if (!(validInt(x, athlete[x]))) {
                    insertErrorMsg("validateAthletics: " + athlete[x] + " not a valid integer");
                    return false;
                }
                break;
            case 'season':
                if (!(validSeason(athlete[x]))) {
                    insertErrorMsg("validateAthletics: " + athlete[x] + " not a valid season");
                    return false;
                }
                break;
            case 'year':
                if (!(validYear(athlete[x]))) {
                    insertErrorMsg("validateAthletics: " + athlete[x] + " not a valid year");
                    return false;
                }
                break;
            case 'varsity':
                if (!(validBool(athlete[x]))) {
                    insertErrorMsg("validateAthletics: " + athlete[x] + " not a valid boolean");
                    return false;
                }
                break;
            case 'league':
                if (!(validLeague(athlete[x]))) {
                    insertErrorMsg("validateAthletics:" + athlete[x] + " not a valid league entry");
                    return false;
                }
                break;
            case 'date':
                if (!(validDate(athlete[x]))) {
                    insertErrorMsg("validateAthletics:" + athlete[x] + " not a valid date");
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    return true;
}

export function validateAvod(avod) {
    let avodProps = ['studentName', 'season', 'year', 'id', 'studentId', 'seasonId', 'video', 'activity', 'thumbName', 'fileName', 'title'];
    if (Object.keys(avod).length !== 11) {
        insertErrorMsg("validateAvod: number of keys failed");
        return false;
    }
    for (let x of avodProps) {
        if (!(x in avod)) {
            insertErrorMsg("validateAvod: key " + x + " not in object");
            return false;
        }
    }
    for (let x of avodProps) {
        switch (x) {
            case 'studentName':
            case 'activity':
                if (!(validName(x, avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a vaild " + x + " name");
                    return false;
                }
                break;
            case 'season':
                if (!(validSeason(avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a valid season");
                    return false;
                }
                break;
            case 'year':
                if (!(validYear(avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a valid year");
                    return false;
                }
                break;
            case 'id':
            case 'seasonId':
            case 'studentId':
                if (!(validInt(x, avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a valid integer");
                    return false;
                }
                break;
            case 'thumbName':
            case 'fileName':
                if (!(validURL(x, avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a valid URL");
                    return false;
                }
                break;
            case 'video':
                if (!(validVideo(avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a valid video value");
                    return false;
                }
                break;
            case 'title':
                if (!(validTitle(avod[x]))) {
                    insertErrorMsg("validateAvod: " + avod[x] + " not a vaild title");
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    return true;
}

export function validateStats(stat) {
    let statsProps = ['season', 'year', 'id', 'seasonId', 'opponent', 'assists', 'blocks', 'kills', 'digs', 'serves', 'aces', 'sideouts'];
    if (Object.keys(stat).length !== 12) {
        insertErrorMsg("validateStats: number of keys failed");
        return false;
    }
    for (let x of statsProps) {
        if (!(x in stat)) {
            insertErrorMsg("validateStats: key " + x + " not in object");
            return false;
        }
    }
    for (let x of statsProps) {
        switch (x) {
            case 'season':
                if (!(validSeason(stat[x]))) {
                    insertErrorMsg("validateStats: " + stat[x] + " not a valid season");
                    return false;
                }
                break;
            case 'year':
                if (!(validYear(stat[x]))) {
                    insertErrorMsg("validateStats: " + stat[x] + " not a valid year");
                    return false;
                }
                break;
            case 'id':
            case 'seasonId':
            case 'assists':
            case 'blocks':
            case 'kills':
            case 'digs':
            case 'serves':
            case 'aces':
            case 'sideouts':
                if (!(validInt(x, stat[x]))) {
                    insertErrorMsg("validateStats: " + stat[x] + " not a valid integer");
                    return false;
                }
                break;
            case 'opponent':
                if (!(validName(x, stat[x]))) {
                    insertErrorMsg("validateStats: " + stat[x] + " not a vaild " + x + " name");
                    return false;
                }
                break;
            default:
                return false;
        }
    }
    return true;
}
