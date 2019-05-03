import { databaseData } from "./dataBaseData.js";
import { error_not_implemented } from "./errorHandler.js";

/*
 * MHM 20190502
 * Comment:
 *  Refector large javascript file into smaller units
 *  for better maintainability.
 * 
 *  This file contains functions dealing with pictures and videos.
 */

/*
 * Return a random picture based on 
 * student name and activity to populate
 * the main section picture headers.
 */
export function randomPicture(student, activity) {
    let defRetVal = 'https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none';
    let pictureList = databaseData.getAvod();
    let filteredList = pictureList.filter(function (obj) {
        return (obj.studentName === student && obj.activity === activity && obj.video === "No");
    });
    if (filteredList.length !== 0) {
        return filteredList[Math.floor(Math.random() * filteredList.length)].thumbName;
    } else {
        return defRetVal;
    }
}

/*
 * Place pictures on page
 */
export function buildPictures(picList) {
    for (let x in picList) {
        $("#floatPics").append($('<div>')
            .addClass('aPic')
            .append($('<div>')
                .addClass('tooltip')
                .append($('<span>')
                    .addClass('tooltiptext')
                    .text('Download Picture')
                )
                .append($('<a>')
                    .attr('href', picList[x].fileName)
                    .attr('download', '')
                    .attr('target', '_blank')
                    .append($('<img>')
                        .addClass('thumbnail')
                        .attr('src', picList[x].thumbName)
                    )
                )
            )
            .append($('<div>')
                .addClass('button-container tooltip')
                .append($('<span>')
                    .addClass('tooltiptext')
                    .text('Delete Picture')
                )
                .append($('<button>')
                    .addClass('dBtn material-icons')
                    .text('delete')
                    .click(function () {
                        error_not_implemented()
                    })
                )
            )
        );
    }
    $("#floatPics").append($('<div>')
        .addClass('aPic')
        .append($('<div>')
            .append($('<img>')
                .attr('src', "https://icqq9q.dm.files.1drv.com/y4mcbbkojMCLPcCjaTjITnanqctCz_XnQAN98IWmybVq9ANDyOlnTu_YZRZ8AZo2ozbUBZVNlZvZLal6d0ynJdAtm3IMZIAWsvLoOgT9FqmULG2mUfNSr4iKmeRaZ89aKaFxfSbJepUxo9AWVsLm2zcZM27AaqhIslNJsXQQpEY5H4G5ie4-D6eV5vgyjAC4EDtbxkUKGVdp2uf7BnfSDuJrg?width=139&height=134&cropmode=none")
                .addClass('thumbnail')
            )
        )
        .append($('<div>')
            .addClass('button-container tooltip')
            .append($('<span>')
                .addClass('tooltiptext')
                .text('Add Picture')
            )
            .append($('<button>')
                .addClass('iBtn material-icons')
                .text('add')
                .click(function () {
                    error_not_implemented();
                })
            )
        )
    );
}