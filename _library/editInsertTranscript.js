import { databaseData } from "./dataBaseData.js";
import { getEditDeleteButtons, getSaveCancelButtons, getInsertButton } from "./buttonsCRUD.js";
import { resetErrorMsgElement } from "./cleanElements.js";
import { error_not_implemented } from "./errorHandler.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains the logic to support editing
 *  and inserting a class into the transcript.
 */

/*
 * Build the pull down option menu
 */
function buildSelectionOptions(options, currentValue) {
    let element = '';
    let selectStr = '';
    for (element of options) {
        if (element == currentValue) {
            selectStr += "<option selected='selected' value='" + currentValue + "'>" + currentValue + "</option>";
        } else {
            selectStr += "<option value='" + element + "'>" + element + "</option>";
        }
    }
    return selectStr;
}

/*
 * Build the period pull down menu, used in edit and add a class
 */
function buildPeriodSelectionMenu(currentValue) {
    let selectStr = '';
    let periods = ['0', '1', '2', '3', '4', '5', '6', '7'];
    selectStr = buildSelectionOptions(periods, currentValue);
    return selectStr;
}

/*
 * Build the grade pull down menu, used in edit and add a class
 */
function buildGradeSelectionMenu(currentValue) {
    let selectStr = '';
    let grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
    selectStr = buildSelectionOptions(grades, currentValue);
    return selectStr;
}

/*
 * When editing a class, we may need to change the class
 * weighting.
 */
function buildEditRadioButtons(honors, ap) {
    let radioStr = '';
    /*
     * So these are pretty much constants that one will be
     * replaced depending on the type of weighing of the
     * class
     */
    let noneStr = "<input class='dbradio' type='radio' id='none' name='weighted' value='0'><label class='dbradio' for='none'>NONE</label>";
    let honorStr = "<input class='dbradio' type='radio' id='honors' name='weighted' value='1'><label class='dbradio' for='honors'>HONORS</label>";
    let apStr = "<input class='dbradio' type='radio' id='ap' name='weighted' value='1'><label class='dbradio' for='ap'>AP</label>";

    /*
     * Based on the weighing of the class, check the appropriate
     * radio button.
     */
    if (honors == 0 && ap == 0) {
        noneStr = "<input class='dbradio' type='radio' id='none' name='weighted' value='0' checked><label class='dbradio' for='none'>NONE</label>";
    } else if (honors == 1) {
        honorStr = "<input class='dbradio' type='radio' id='honors' name='weighted' value='1' checked><label class='dbradio' for='honors'>HONORS</label>";
    } else if (ap == 1) {
        apStr = "<input class='dbradio' type='radio' id='ap' name='weighted' value='1' checked><label class='dbradio' for='ap'>AP</label>";
    }
    radioStr = noneStr + honorStr + apStr;
    return radioStr;
}

/*
 * Builds the list of classes that are currently in the dataset
 * and put them into a datalist that can be used to fill the
 * classname field.
 */
function buildClassDataList() {
    let dataList = '<datalist id="studentClasses">';
    let dataListOptions = '';
    let classList = databaseData.getClasses();
    for (let name of classList) {
        dataListOptions += "<option value='" + name + "'>"
    }
    dataList += dataListOptions;
    dataList += '</datalist>';
    return dataList;
}

/*
 * Builds the list of teachers that are currently in the dataset
 * and put them into a datalist that can be used to fill the
 * teachername field.
 */
function buildTeacherDataList() {
    let dataList = '<datalist id="Teachers">';
    let dataListOptions = '';
    let teacherList = databaseData.getTeachers();
    for (let name of teacherList) {
        dataListOptions += "<option value='" + name + "'>";
    }
    dataList += dataListOptions;
    dataList += '</datalist>';
    return dataList;
}

/*
 * MHM 2019-02-12
 * Comment:
 *  Support the Academic Row Cancel Edit button. Now
 *  doing updates inline within the table. Need to handle
 *  reverting back to orginal data. I'm thinking a parameter
 *  will be added in the future.
 */
function cancelAcademicRowChange(event) {
    let parent = $(this).parent().parent().parent();
    let tdPeriod = parent.children("td:nth-child(2)");
    let tdClassName = parent.children("td:nth-child(3)");
    let tdHonors = parent.children("td:nth-child(4)");
    let tdAP = parent.children("td:nth-child(5)");
    let tdTeacherName = parent.children("td:nth-child(6)");
    let tdGrade = parent.children("td:nth-child(7)");
    let tdModify = parent.children("td:nth-child(8)");

    tdPeriod.html(event.data.period);
    tdClassName.html(event.data.className);
    tdHonors.html(event.data.honors);
    tdAP.html(event.data.ap);
    tdTeacherName.html(event.data.teacherName);
    tdGrade.html(event.data.grade);
    $('.sBtn').off();
    $('.cBtn').off();
    tdModify.html(getEditDeleteButtons());

    $('.eBtn').on("click", editAcademicRow);
    $('.dBtn').on("click", error_not_implemented);
}

/*
 *  Edit a table row inline. Covert fields to input type=text
 */
function editAcademicRow() {
    resetErrorMsgElement();
    let parent = $(this).parent().parent().parent();
    let tdDbId = parent.children("td:nth-child(1)");
    let currentDbId = tdDbId.html();
    let tdPeriod = parent.children("td:nth-child(2)");
    let currentPeriod = tdPeriod.html();
    let tdClassName = parent.children("td:nth-child(3)");
    let currentClassName = tdClassName.html();
    let tdHonors = parent.children("td:nth-child(4)");
    let currentHonors = tdHonors.html();
    let tdAP = parent.children("td:nth-child(5)");
    let currentAP = tdAP.html();
    let tdTeacherName = parent.children("td:nth-child(6)");
    let currentTeacherName = tdTeacherName.html();
    let tdGrade = parent.children("td:nth-child(7)");
    let currentGrade = tdGrade.html();
    let tdModify = parent.children("td:nth-child(8)");

    let selectOptions = '';
    selectOptions = buildPeriodSelectionMenu(currentPeriod);
    tdPeriod.html("<select>" + selectOptions + "</select>");

    let dataList = buildClassDataList();
    let buildRadio = '';
    buildRadio = buildEditRadioButtons(currentHonors, currentAP);
    tdClassName.html("<input class='dbtext' maxlength='30' type='text' list='studentClasses' value='" + currentClassName + "'/>" + dataList + buildRadio);

    dataList = buildTeacherDataList();
    tdTeacherName.html("<input class='dbtext' maxlength='30' type='text' list='Teachers' value='" + currentTeacherName + "'/>" + dataList);

    selectOptions = '';
    selectOptions = buildGradeSelectionMenu(currentGrade);
    tdGrade.html("<select>" + selectOptions + "</select>");

    $(".eBtn").off();
    $(".dBtn").off();
    tdModify.html(getSaveCancelButtons());

    let cancelCBParms = { 'dbId': currentDbId, 'period': currentPeriod, 'className': currentClassName, 'honors': currentHonors, 'ap': currentAP, 'teacherName': currentTeacherName, 'grade': currentGrade };
    $(".sBtn").on("click", error_not_implemented);
    $(".cBtn").on("click", cancelCBParms, cancelAcademicRowChange);
}

/*
 *  Add a row to the academic table.
 */
export function addAcademicRow(row, tableId) {
    $('#' + tableId).append($('<tr>')
        .append($('<td>')
            .addClass('dbId')
            .html(row.id)
            .hide()
        )
        .append($('<td>')
            .addClass('period')
            .html(row.period)
        )
        .append($('<td>')
            .addClass('className')
            .html(row.className)
        )
        .append($('<td>')
            .addClass('honors')
            .html(row.honors)
            .hide()
        )
        .append($('<td>')
            .addClass('ap')
            .html(row.AP)
            .hide()
        )
        .append($('<td>')
            .addClass('teacher')
            .html(row.teacherName)
        )
        .append($('<td>')
            .addClass('grade')
            .html(row.grade)
        )
        .append($('<td>')
            .addClass('modify')
            .html(getEditDeleteButtons())
        )
    );

    $('.eBtn').on("click", editAcademicRow);
    $('.dBtn').on("click", error_not_implemented);
}

export function addHiddenInsertRow(tableId) {
    $('#'+tableId).append($('<tr>')
      .append($('<td>')
        .addClass('dbId')
        .html("")
        .hide()
      )
      .append($('<td>')
        .addClass('period noborder')
        .html("")
      )
      .append($('<td>')
        .addClass('className noborder')
        .html("")
      )
      .append($('<td>')
        .addClass('honors')
        .html("")
        .hide()
      )
      .append($('<td>')
        .addClass('ap')
        .html("")
        .hide()
      )
      .append($('<td>')
        .addClass('teacher noborder')
        .html("")
      )
      .append($('<td>')
        .addClass('grade noborder')
        .html("")
      )
      .append($('<td>')
        .addClass('modify')
        .html(getInsertButton())
      )
    );
  
    $('.iBtn').on("click", error_not_implemented);
  }